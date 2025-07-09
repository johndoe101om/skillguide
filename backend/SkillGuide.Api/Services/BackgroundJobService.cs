using Hangfire;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.Models;

namespace SkillGuide.Api.Services;

public class BackgroundJobService : IBackgroundJobService
{
    private readonly SkillGuideDbContext _context;
    private readonly ILogger<BackgroundJobService> _logger;

    public BackgroundJobService(SkillGuideDbContext context, ILogger<BackgroundJobService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task ScheduleAssessmentReminder(Guid assessmentId, DateTime reminderTime)
    {
        BackgroundJob.Schedule(() => SendAssessmentReminder(assessmentId), reminderTime);
        _logger.LogInformation("Scheduled assessment reminder for {AssessmentId} at {ReminderTime}", assessmentId, reminderTime);
    }

    public async Task ProcessAssessmentResults(Guid assessmentResultId)
    {
        try
        {
            var result = await _context.AssessmentResults
                .Include(r => r.Assessment)
                .Include(r => r.User)
                .Include(r => r.Answers)
                .FirstOrDefaultAsync(r => r.Id == assessmentResultId);

            if (result == null)
            {
                _logger.LogWarning("Assessment result {AssessmentResultId} not found", assessmentResultId);
                return;
            }

            // Auto-grade assessments that need grading
            if (result.Status == ResultStatus.Submitted)
            {
                await AutoGradeAssessment(result);
            }

            // Check for achievements
            await CheckUserAchievements(result.UserId);

            // Update user analytics
            await CalculateUserProgress(result.UserId);

            _logger.LogInformation("Processed assessment results for {AssessmentResultId}", assessmentResultId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing assessment results for {AssessmentResultId}", assessmentResultId);
            throw;
        }
    }

    public async Task SendAssessmentCompletionNotification(Guid userId, Guid assessmentId)
    {
        var user = await _context.Users.FindAsync(userId);
        var assessment = await _context.Assessments.FindAsync(assessmentId);

        if (user != null && assessment != null)
        {
            var subject = $"Assessment Completed: {assessment.Title}";
            var body = $"Dear {user.Name},\n\nYou have successfully completed the assessment: {assessment.Title}.\n\nBest regards,\nSkillGuide Team";
            
            await SendEmailNotification(user.Email, subject, body);
        }
    }

    public async Task UpdateBatchStatistics(Guid batchId)
    {
        try
        {
            var batch = await _context.Batches
                .Include(b => b.Enrollments)
                    .ThenInclude(e => e.User)
                .FirstOrDefaultAsync(b => b.Id == batchId);

            if (batch == null) return;

            var enrollments = batch.Enrollments.Where(e => e.Status != EnrollmentStatus.Dropped).ToList();
            var completedEnrollments = enrollments.Where(e => e.Status == EnrollmentStatus.Completed).ToList();

            // Update completion rate
            batch.CompletionRate = enrollments.Any() ? 
                (decimal)completedEnrollments.Count / enrollments.Count * 100 : 0;

            // Update average score
            var assessmentResults = await _context.AssessmentResults
                .Where(r => enrollments.Select(e => e.UserId).Contains(r.UserId) && 
                           r.Assessment.BatchId == batchId)
                .ToListAsync();

            batch.AverageScore = assessmentResults.Any() ? 
                (decimal)assessmentResults.Average(r => r.Percentage) : 0;

            // Update current enrollment
            batch.CurrentEnrollment = enrollments.Count;

            await _context.SaveChangesAsync();

            _logger.LogInformation("Updated statistics for batch {BatchId}", batchId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating batch statistics for {BatchId}", batchId);
            throw;
        }
    }

    public async Task SendBatchCompletionNotifications(Guid batchId)
    {
        var batch = await _context.Batches
            .Include(b => b.Enrollments)
                .ThenInclude(e => e.User)
            .FirstOrDefaultAsync(b => b.Id == batchId);

        if (batch == null) return;

        var completedUsers = batch.Enrollments
            .Where(e => e.Status == EnrollmentStatus.Completed)
            .Select(e => e.User)
            .ToList();

        foreach (var user in completedUsers)
        {
            var subject = $"Congratulations! Batch {batch.Name} Completed";
            var body = $"Dear {user.Name},\n\nCongratulations on successfully completing {batch.Name}!\n\nBest regards,\nSkillGuide Team";
            
            BackgroundJob.Enqueue(() => SendEmailNotification(user.Email, subject, body));
        }

        _logger.LogInformation("Sent completion notifications for batch {BatchId} to {UserCount} users", batchId, completedUsers.Count);
    }

    public async Task ArchiveOldBatches()
    {
        var cutoffDate = DateTime.UtcNow.AddMonths(-6);
        var oldBatches = await _context.Batches
            .Where(b => b.EndDate < cutoffDate && b.Status == BatchStatus.Completed)
            .ToListAsync();

        foreach (var batch in oldBatches)
        {
            // Archive logic here (could move to different storage)
            _logger.LogInformation("Archiving old batch: {BatchName}", batch.Name);
        }
    }

    public async Task CalculateUserProgress(Guid userId)
    {
        try
        {
            var user = await _context.Users
                .Include(u => u.CandidateProfiles)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null) return;

            var candidateProfile = user.CandidateProfiles.FirstOrDefault();
            if (candidateProfile == null) return;

            // Calculate overall progress based on enrollments
            var enrollments = await _context.Enrollments
                .Include(e => e.TopicProgresses)
                .Where(e => e.UserId == userId)
                .ToListAsync();

            if (enrollments.Any())
            {
                var overallProgress = enrollments.Average(e => e.OverallProgress);
                // Update user level based on progress
                candidateProfile.CurrentLevel = overallProgress switch
                {
                    >= 90 => "Expert",
                    >= 70 => "Advanced",
                    >= 50 => "Intermediate",
                    _ => "Beginner"
                };
            }

            // Calculate average assessment scores
            var assessmentResults = await _context.AssessmentResults
                .Where(r => r.UserId == userId && r.Status == ResultStatus.Graded)
                .ToListAsync();

            if (assessmentResults.Any())
            {
                var averageScore = assessmentResults.Average(r => r.Percentage);
                
                // Update confidence level based on recent performance
                var recentResults = assessmentResults
                    .OrderByDescending(r => r.CompletedAt)
                    .Take(5)
                    .ToList();

                if (recentResults.Any())
                {
                    var recentAverage = recentResults.Average(r => r.Percentage);
                    candidateProfile.ConfidenceLevel = (decimal)(recentAverage / 100.0);
                }
            }

            // Update study streak
            var recentActivities = await _context.UserActivities
                .Where(a => a.UserId == userId && a.CreatedAt >= DateTime.UtcNow.AddDays(-30))
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();

            candidateProfile.StudyStreak = CalculateStudyStreak(recentActivities);

            await _context.SaveChangesAsync();

            _logger.LogInformation("Updated progress for user {UserId}", userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calculating user progress for {UserId}", userId);
            throw;
        }
    }

    public async Task UpdateUserRankings()
    {
        try
        {
            var candidateProfiles = await _context.CandidateProfiles
                .Include(cp => cp.User)
                .OrderByDescending(cp => cp.SkillPoints)
                .ToListAsync();

            for (int i = 0; i < candidateProfiles.Count; i++)
            {
                candidateProfiles[i].Rank = i + 1;
            }

            await _context.SaveChangesAsync();

            _logger.LogInformation("Updated rankings for {Count} users", candidateProfiles.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user rankings");
            throw;
        }
    }

    public async Task GenerateUserRecommendations(Guid userId)
    {
        // This would typically use ML models or business rules
        // For now, implementing basic recommendation logic
        
        var userProfile = await _context.CandidateProfiles
            .FirstOrDefaultAsync(cp => cp.UserId == userId);

        if (userProfile == null) return;

        var assessmentResults = await _context.AssessmentResults
            .Include(r => r.Assessment)
                .ThenInclude(a => a.Topic)
            .Where(r => r.UserId == userId)
            .ToListAsync();

        // Analyze weak areas and generate recommendations
        var weakTopics = assessmentResults
            .Where(r => r.Percentage < 70)
            .Select(r => r.Assessment.Topic?.Name)
            .Where(name => !string.IsNullOrEmpty(name))
            .Distinct()
            .ToList();

        userProfile.ImprovementAreas = weakTopics!;

        // Analyze strong areas
        var strongTopics = assessmentResults
            .Where(r => r.Percentage >= 85)
            .Select(r => r.Assessment.Topic?.Name)
            .Where(name => !string.IsNullOrEmpty(name))
            .Distinct()
            .ToList();

        userProfile.StrongSubjects = strongTopics!;

        await _context.SaveChangesAsync();

        _logger.LogInformation("Generated recommendations for user {UserId}", userId);
    }

    public async Task CleanupOldLogs()
    {
        var cutoffDate = DateTime.UtcNow.AddDays(-90);
        
        // Cleanup old user activities
        var oldActivities = await _context.UserActivities
            .Where(a => a.CreatedAt < cutoffDate)
            .ToListAsync();

        _context.UserActivities.RemoveRange(oldActivities);
        await _context.SaveChangesAsync();

        _logger.LogInformation("Cleaned up {Count} old activity records", oldActivities.Count);
    }

    public async Task BackupDatabase()
    {
        // Database backup logic would go here
        _logger.LogInformation("Database backup completed at {DateTime}", DateTime.UtcNow);
    }

    public async Task SendDailyReports()
    {
        // Generate and send daily reports to administrators
        var adminUsers = await _context.Users
            .Where(u => u.Role == UserRole.Admin)
            .ToListAsync();

        foreach (var admin in adminUsers)
        {
            var subject = $"Daily SkillGuide Report - {DateTime.UtcNow:yyyy-MM-dd}";
            var body = await GenerateDailyReportContent();
            
            BackgroundJob.Enqueue(() => SendEmailNotification(admin.Email, subject, body));
        }

        _logger.LogInformation("Sent daily reports to {Count} administrators", adminUsers.Count);
    }

    public async Task UpdateSkillDemandData()
    {
        // This would typically fetch data from job market APIs
        _logger.LogInformation("Updated skill demand data");
    }

    public async Task CheckUserAchievements(Guid userId)
    {
        try
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return;

            var userAchievements = await _context.UserAchievements
                .Where(ua => ua.UserId == userId)
                .Select(ua => ua.AchievementId)
                .ToListAsync();

            var availableAchievements = await _context.Achievements
                .Where(a => a.IsActive && !userAchievements.Contains(a.Id))
                .ToListAsync();

            foreach (var achievement in availableAchievements)
            {
                if (await CheckAchievementCriteria(userId, achievement))
                {
                    await AwardAchievement(userId, achievement.Id);
                }
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking achievements for user {UserId}", userId);
            throw;
        }
    }

    public async Task AwardAchievement(Guid userId, Guid achievementId)
    {
        try
        {
            var userAchievement = new UserAchievement
            {
                UserId = userId,
                AchievementId = achievementId,
                EarnedAt = DateTime.UtcNow
            };

            _context.UserAchievements.Add(userAchievement);

            // Award skill points
            var achievement = await _context.Achievements.FindAsync(achievementId);
            if (achievement != null)
            {
                var candidateProfile = await _context.CandidateProfiles
                    .FirstOrDefaultAsync(cp => cp.UserId == userId);

                if (candidateProfile != null)
                {
                    candidateProfile.SkillPoints += achievement.PointsAwarded;
                }
            }

            await _context.SaveChangesAsync();

            // Send notification
            var user = await _context.Users.FindAsync(userId);
            if (user != null && achievement != null)
            {
                var subject = $"Achievement Unlocked: {achievement.Title}";
                var body = $"Congratulations {user.Name}!\n\nYou've earned the achievement: {achievement.Title}\n{achievement.Description}\n\nPoints awarded: {achievement.PointsAwarded}";
                
                BackgroundJob.Enqueue(() => SendEmailNotification(user.Email, subject, body));
            }

            _logger.LogInformation("Awarded achievement {AchievementId} to user {UserId}", achievementId, userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error awarding achievement {AchievementId} to user {UserId}", achievementId, userId);
            throw;
        }
    }

    public async Task SendEmailNotification(string emailAddress, string subject, string body)
    {
        try
        {
            // Email sending logic would go here
            // For now, just logging
            _logger.LogInformation("Email sent to {Email} with subject: {Subject}", emailAddress, subject);
            
            // In production, you would use a service like SendGrid, AWS SES, etc.
            await Task.Delay(100); // Simulate email sending delay
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {Email}", emailAddress);
            throw;
        }
    }

    public async Task SendBulkEmailNotifications(List<string> emailAddresses, string subject, string body)
    {
        foreach (var email in emailAddresses)
        {
            BackgroundJob.Enqueue(() => SendEmailNotification(email, subject, body));
        }

        _logger.LogInformation("Queued {Count} bulk email notifications", emailAddresses.Count);
    }

    // Private helper methods
    private async Task SendAssessmentReminder(Guid assessmentId)
    {
        var assessment = await _context.Assessments
            .Include(a => a.Batch)
                .ThenInclude(b => b.Enrollments)
                    .ThenInclude(e => e.User)
            .FirstOrDefaultAsync(a => a.Id == assessmentId);

        if (assessment?.Batch?.Enrollments != null)
        {
            foreach (var enrollment in assessment.Batch.Enrollments)
            {
                var subject = $"Reminder: {assessment.Title} Assessment";
                var body = $"Dear {enrollment.User.Name},\n\nThis is a reminder that the assessment '{assessment.Title}' is scheduled.\n\nBest regards,\nSkillGuide Team";
                
                BackgroundJob.Enqueue(() => SendEmailNotification(enrollment.User.Email, subject, body));
            }
        }
    }

    private async Task AutoGradeAssessment(AssessmentResult result)
    {
        // Auto-grading logic for objective questions
        foreach (var answer in result.Answers)
        {
            var question = await _context.Questions.FindAsync(answer.QuestionId);
            if (question == null) continue;

            if (question.Type == QuestionType.MultipleChoice || question.Type == QuestionType.TrueFalse)
            {
                answer.IsCorrect = question.CorrectAnswers.SequenceEqual(answer.SelectedOptions);
                answer.PointsAwarded = answer.IsCorrect ? question.Points : 0;
            }
        }

        result.Score = result.Answers.Sum(a => a.PointsAwarded);
        result.IsPassed = result.Score >= result.Assessment.PassingScore;
        result.Status = ResultStatus.Graded;

        await _context.SaveChangesAsync();
    }

    private async Task<bool> CheckAchievementCriteria(Guid userId, Achievement achievement)
    {
        switch (achievement.Type)
        {
            case AchievementType.Score:
                var highScores = await _context.AssessmentResults
                    .Where(r => r.UserId == userId && r.Percentage >= 95)
                    .CountAsync();
                return highScores > 0;

            case AchievementType.Streak:
                var candidateProfile = await _context.CandidateProfiles
                    .FirstOrDefaultAsync(cp => cp.UserId == userId);
                return candidateProfile?.StudyStreak >= 7;

            case AchievementType.Completion:
                var completedAssessments = await _context.AssessmentResults
                    .Where(r => r.UserId == userId && r.Status == ResultStatus.Graded)
                    .CountAsync();
                return completedAssessments > 0;

            default:
                return false;
        }
    }

    private int CalculateStudyStreak(List<UserActivity> activities)
    {
        if (!activities.Any()) return 0;

        var dates = activities
            .Select(a => a.CreatedAt.Date)
            .Distinct()
            .OrderByDescending(d => d)
            .ToList();

        int streak = 0;
        var currentDate = DateTime.UtcNow.Date;

        foreach (var date in dates)
        {
            if (date == currentDate.AddDays(-streak))
            {
                streak++;
            }
            else
            {
                break;
            }
        }

        return streak;
    }

    private async Task<string> GenerateDailyReportContent()
    {
        var totalUsers = await _context.Users.CountAsync(u => u.Role == UserRole.User);
        var activeBatches = await _context.Batches.CountAsync(b => b.Status == BatchStatus.Active);
        var todayAssessments = await _context.AssessmentResults
            .CountAsync(r => r.CreatedAt.Date == DateTime.UtcNow.Date);

        return $@"
Daily SkillGuide Report - {DateTime.UtcNow:yyyy-MM-dd}

Summary:
- Total Users: {totalUsers}
- Active Batches: {activeBatches}
- Assessments Completed Today: {todayAssessments}

Best regards,
SkillGuide System
";
    }
}
