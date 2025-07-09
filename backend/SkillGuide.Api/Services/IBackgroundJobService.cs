namespace SkillGuide.Api.Services;

public interface IBackgroundJobService
{
    // Assessment related jobs
    Task ScheduleAssessmentReminder(Guid assessmentId, DateTime reminderTime);
    Task ProcessAssessmentResults(Guid assessmentResultId);
    Task SendAssessmentCompletionNotification(Guid userId, Guid assessmentId);
    
    // Batch management jobs
    Task UpdateBatchStatistics(Guid batchId);
    Task SendBatchCompletionNotifications(Guid batchId);
    Task ArchiveOldBatches();
    
    // User analytics jobs
    Task CalculateUserProgress(Guid userId);
    Task UpdateUserRankings();
    Task GenerateUserRecommendations(Guid userId);
    
    // System maintenance jobs
    Task CleanupOldLogs();
    Task BackupDatabase();
    Task SendDailyReports();
    Task UpdateSkillDemandData();
    
    // Achievement processing
    Task CheckUserAchievements(Guid userId);
    Task AwardAchievement(Guid userId, Guid achievementId);
    
    // Email notifications
    Task SendEmailNotification(string emailAddress, string subject, string body);
    Task SendBulkEmailNotifications(List<string> emailAddresses, string subject, string body);
}
