using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.DTOs;
using SkillGuide.Api.Models;

namespace SkillGuide.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly SkillGuideDbContext _context;

    public DashboardController(SkillGuideDbContext context)
    {
        _context = context;
    }

    // GET: api/dashboard
    [HttpGet]
    public async Task<ActionResult<DashboardDto>> GetDashboard([FromQuery] Guid? userId = null)
    {
        var dashboard = new DashboardDto();

        // Get overview metrics
        dashboard.Overview = await GetOverviewMetrics();

        // Get personalized metrics if user is specified
        if (userId.HasValue)
        {
            dashboard.PersonalizedMetrics = await GetPersonalizedMetrics(userId.Value);
            dashboard.AiRecommendations = await GetAiRecommendations(userId.Value);
            dashboard.RecentActivities = await GetRecentActivities(userId.Value);
            dashboard.RecentAchievements = await GetRecentAchievements(userId.Value);
            dashboard.LearningInsights = await GetLearningInsights(userId.Value);
        }

        dashboard.UpcomingEvents = await GetUpcomingEvents(userId);

        return Ok(dashboard);
    }

    // GET: api/dashboard/analytics
    [HttpGet("analytics")]
    public async Task<ActionResult<AnalyticsDto>> GetAnalytics()
    {
        var analytics = new AnalyticsDto
        {
            PerformanceMetrics = await GetPerformanceMetrics(),
            BatchAnalytics = await GetBatchAnalytics(),
            SkillAnalytics = GetSkillAnalytics(),
            LearningPatterns = GetLearningPatterns(),
            Predictions = GetPredictions()
        };

        return Ok(analytics);
    }

    private async Task<DashboardOverviewDto> GetOverviewMetrics()
    {
        var totalCandidates = await _context.Users.CountAsync(u => u.Role == UserRole.User);
        var activeBatches = await _context.Batches.CountAsync(b => b.Status == BatchStatus.Active);
        
        var completedEnrollments = await _context.Enrollments.CountAsync(e => e.Status == EnrollmentStatus.Completed);
        var totalEnrollments = await _context.Enrollments.CountAsync();
        var completionRate = totalEnrollments > 0 ? (decimal)completedEnrollments / totalEnrollments * 100 : 0;

        var averageScore = await _context.AssessmentResults
            .Where(r => r.Status == ResultStatus.Graded)
            .AverageAsync(r => (decimal?)r.Percentage) ?? 0;

        return new DashboardOverviewDto
        {
            TotalCandidates = totalCandidates,
            ActiveBatches = activeBatches,
            CompletionRate = Math.Round(completionRate, 1),
            AverageScore = Math.Round(averageScore, 1),
            Trends = new TrendDataDto
            {
                Candidates = new TrendDto { Value = 12, Direction = "up" },
                Batches = new TrendDto { Value = 2, Direction = "up" },
                Completion = new TrendDto { Value = 5.2m, Direction = "up" },
                Score = new TrendDto { Value = 3.1m, Direction = "up" }
            }
        };
    }

    private async Task<List<PersonalizedMetricDto>> GetPersonalizedMetrics(Guid userId)
    {
        var userProfile = await _context.CandidateProfiles
            .FirstOrDefaultAsync(cp => cp.UserId == userId);

        var userResults = await _context.AssessmentResults
            .Where(r => r.UserId == userId && r.Status == ResultStatus.Graded)
            .ToListAsync();

        var averageScore = userResults.Any() ? userResults.Average(r => r.Percentage) : 0;

        var metrics = new List<PersonalizedMetricDto>
        {
            new PersonalizedMetricDto
            {
                Title = "Personal Progress",
                Value = $"{averageScore:F1}%",
                Change = "+8.5%",
                Trend = "up",
                Description = "Your average score this month",
                Target = 90,
                Current = (decimal)averageScore,
                Icon = "TrendingUp",
                Color = "blue"
            },
            new PersonalizedMetricDto
            {
                Title = "Learning Streak",
                Value = $"{userProfile?.StudyStreak ?? 0} days",
                Change = "+3 days",
                Trend = "up",
                Description = "Current consecutive learning days",
                Target = 15,
                Current = userProfile?.StudyStreak ?? 0,
                Icon = "Flame",
                Color = "orange"
            },
            new PersonalizedMetricDto
            {
                Title = "Confidence Level",
                Value = $"{Math.Round((userProfile?.ConfidenceLevel ?? 0) * 100)}%",
                Change = "+12%",
                Trend = "up",
                Description = "AI-calculated confidence score",
                Target = 85,
                Current = (userProfile?.ConfidenceLevel ?? 0) * 100,
                Icon = "Heart",
                Color = "red"
            },
            new PersonalizedMetricDto
            {
                Title = "Skill Points",
                Value = $"{userProfile?.SkillPoints ?? 0}",
                Change = "+125",
                Trend = "up",
                Description = "Total points earned",
                Target = 2000,
                Current = userProfile?.SkillPoints ?? 0,
                Icon = "Star",
                Color = "purple"
            }
        };

        return metrics;
    }

    private async Task<List<AiRecommendationDto>> GetAiRecommendations(Guid userId)
    {
        // This would typically use ML models or business rules
        // For now, returning mock recommendations based on user data
        
        var userProfile = await _context.CandidateProfiles
            .FirstOrDefaultAsync(cp => cp.UserId == userId);

        var recommendations = new List<AiRecommendationDto>
        {
            new AiRecommendationDto
            {
                Type = "practice",
                Priority = "high",
                Title = "Morning Practice Session",
                Description = "You perform 23% better in morning sessions",
                Action = "Schedule 9 AM practice",
                Impact = "High",
                Icon = "Clock",
                TimeEstimate = "30 min"
            },
            new AiRecommendationDto
            {
                Type = "subject",
                Priority = "medium",
                Title = "Focus on Weak Areas",
                Description = "Improve weak subjects to boost overall score",
                Action = "Take practice tests",
                Impact = "Medium",
                Icon = "BookOpen",
                TimeEstimate = "1 hour"
            }
        };

        // Add specific recommendations based on improvement areas
        if (userProfile?.ImprovementAreas.Any() == true)
        {
            recommendations.Add(new AiRecommendationDto
            {
                Type = "study",
                Priority = "high",
                Title = $"Study {userProfile.ImprovementAreas.First()}",
                Description = $"Focus on {userProfile.ImprovementAreas.First()} to improve your profile",
                Action = $"Review {userProfile.ImprovementAreas.First()} materials",
                Impact = "High",
                Icon = "Brain",
                TimeEstimate = "45 min"
            });
        }

        return recommendations;
    }

    private async Task<List<UpcomingEventDto>> GetUpcomingEvents(Guid? userId)
    {
        var query = _context.Schedules
            .Include(s => s.Assessment)
            .Where(s => s.StartDateTime > DateTime.UtcNow && s.Status == ScheduleStatus.Scheduled);

        if (userId.HasValue)
        {
            query = query.Where(s => s.Participants.Any(p => p.UserId == userId.Value));
        }

        var schedules = await query
            .OrderBy(s => s.StartDateTime)
            .Take(10)
            .ToListAsync();

        var events = schedules.Select(s => new UpcomingEventDto
        {
            Id = s.Id,
            Title = s.Title,
            DateTime = s.StartDateTime,
            Type = s.Type,
            Status = userId.HasValue ? ParticipantStatus.Registered : ParticipantStatus.Registered, // Would come from actual participant data
            Location = s.Location,
            MeetingLink = s.MeetingLink
        }).ToList();

        return events;
    }

    private async Task<List<RecentActivityDto>> GetRecentActivities(Guid userId)
    {
        var activities = await _context.UserActivities
            .Where(a => a.UserId == userId)
            .OrderByDescending(a => a.CreatedAt)
            .Take(10)
            .Select(a => new RecentActivityDto
            {
                Id = a.Id,
                Type = a.Type,
                Title = a.Title,
                Description = a.Description,
                Score = a.Score,
                Status = a.Status,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();

        return activities;
    }

    private async Task<List<AchievementDto>> GetRecentAchievements(Guid userId)
    {
        var achievements = await _context.UserAchievements
            .Where(ua => ua.UserId == userId)
            .Include(ua => ua.Achievement)
            .OrderByDescending(ua => ua.EarnedAt)
            .Take(5)
            .Select(ua => new AchievementDto
            {
                Id = ua.Achievement.Id,
                Title = ua.Achievement.Title,
                Description = ua.Achievement.Description,
                Type = ua.Achievement.Type,
                Rarity = ua.Achievement.Rarity,
                Icon = ua.Achievement.Icon,
                PointsAwarded = ua.Achievement.PointsAwarded,
                EarnedAt = ua.EarnedAt
            })
            .ToListAsync();

        return achievements;
    }

    private async Task<List<LearningInsightDto>> GetLearningInsights(Guid userId)
    {
        // These would typically be generated by ML models
        var insights = new List<LearningInsightDto>
        {
            new LearningInsightDto
            {
                Insight = "Peak Performance Time",
                Description = "You score 23% higher during 9-11 AM sessions",
                Actionable = true,
                Action = "Schedule important tests for morning",
                Category = "timing"
            },
            new LearningInsightDto
            {
                Insight = "Learning Style Match",
                Description = "Interactive content increases retention by 18%",
                Actionable = true,
                Action = "Prefer hands-on exercises and labs",
                Category = "style"
            }
        };

        return insights;
    }

    private async Task<List<PerformanceMetricDto>> GetPerformanceMetrics()
    {
        var totalResults = await _context.AssessmentResults.CountAsync();
        var passedResults = await _context.AssessmentResults.CountAsync(r => r.IsPassed);
        var successRate = totalResults > 0 ? (decimal)passedResults / totalResults * 100 : 0;

        var averageScore = await _context.AssessmentResults
            .AverageAsync(r => (decimal?)r.Percentage) ?? 0;

        var averageCompletionTime = await _context.Enrollments
            .Where(e => e.CompletionDate.HasValue)
            .AverageAsync(e => (double?)EF.Functions.DateDiffDay(e.EnrollmentDate, e.CompletionDate!.Value)) ?? 0;

        var retentionRate = await CalculateRetentionRate();

        return new List<PerformanceMetricDto>
        {
            new PerformanceMetricDto
            {
                Title = "Overall Success Rate",
                Value = $"{successRate:F1}%",
                Change = "+5.2%",
                Trend = "up",
                Description = "Candidates completing training successfully"
            },
            new PerformanceMetricDto
            {
                Title = "Average Score",
                Value = $"{averageScore:F1}",
                Change = "+2.1",
                Trend = "up",
                Description = "Mean score across all assessments"
            },
            new PerformanceMetricDto
            {
                Title = "Completion Time",
                Value = $"{averageCompletionTime:F1} days",
                Change = "-8 days",
                Trend = "down",
                Description = "Average time to complete training"
            },
            new PerformanceMetricDto
            {
                Title = "Retention Rate",
                Value = $"{retentionRate:F1}%",
                Change = "+3.8%",
                Trend = "up",
                Description = "Candidates staying until completion"
            }
        };
    }

    private async Task<List<BatchAnalyticsDto>> GetBatchAnalytics()
    {
        var batches = await _context.Batches
            .Include(b => b.Enrollments)
                .ThenInclude(e => e.User)
            .Where(b => b.Status == BatchStatus.Active)
            .ToListAsync();

        var batchAnalytics = batches.Select(b => new BatchAnalyticsDto
        {
            Id = b.Id,
            Name = b.Name,
            Candidates = b.CurrentEnrollment,
            AvgScore = b.AverageScore,
            Completion = b.CompletionRate,
            Satisfaction = b.SatisfactionRating,
            Trend = b.AverageScore >= 85 ? "excellent" : b.AverageScore >= 70 ? "good" : "needs-improvement"
        }).ToList();

        return batchAnalytics;
    }

    private List<SkillAnalyticsDto> GetSkillAnalytics()
    {
        // This would typically come from job market APIs or internal skill tracking
        return new List<SkillAnalyticsDto>
        {
            new SkillAnalyticsDto { Skill = "Java Programming", Proficiency = 85, Demand = 92, Growth = "+12%" },
            new SkillAnalyticsDto { Skill = "Python Development", Proficiency = 89, Demand = 96, Growth = "+18%" },
            new SkillAnalyticsDto { Skill = "Cloud Technologies", Proficiency = 78, Demand = 94, Growth = "+25%" },
            new SkillAnalyticsDto { Skill = "Data Science", Proficiency = 82, Demand = 88, Growth = "+15%" },
            new SkillAnalyticsDto { Skill = ".NET Framework", Proficiency = 80, Demand = 85, Growth = "+8%" },
            new SkillAnalyticsDto { Skill = "Machine Learning", Proficiency = 74, Demand = 90, Growth = "+22%" }
        };
    }

    private List<LearningPatternDto> GetLearningPatterns()
    {
        // These would typically be derived from analyzing user behavior data
        return new List<LearningPatternDto>
        {
            new LearningPatternDto
            {
                Pattern = "Peak Learning Hours",
                Value = "10 AM - 12 PM",
                Insight = "Higher engagement and completion rates"
            },
            new LearningPatternDto
            {
                Pattern = "Preferred Content Type",
                Value = "Interactive Labs",
                Insight = "75% better retention than video-only"
            },
            new LearningPatternDto
            {
                Pattern = "Optimal Batch Size",
                Value = "25-28 candidates",
                Insight = "Best balance of collaboration and attention"
            },
            new LearningPatternDto
            {
                Pattern = "Success Predictor",
                Value = "Prior Certification",
                Insight = "85% completion rate vs 72% without"
            }
        };
    }

    private List<PredictionDto> GetPredictions()
    {
        // These would typically be generated by ML models
        return new List<PredictionDto>
        {
            new PredictionDto
            {
                Type = "enrollment",
                Title = "Next Quarter Forecast",
                Description = "127 new candidates expected based on historical patterns",
                Priority = "medium",
                Confidence = 0.82m
            },
            new PredictionDto
            {
                Type = "resource",
                Title = "Resource Planning",
                Description = "2 additional trainers needed to maintain quality",
                Priority = "high",
                Confidence = 0.91m
            },
            new PredictionDto
            {
                Type = "performance",
                Title = "Success Rate Prediction",
                Description = "91% completion rate with current strategies",
                Priority = "low",
                Confidence = 0.76m
            }
        };
    }

    private async Task<decimal> CalculateRetentionRate()
    {
        var totalEnrollments = await _context.Enrollments.CountAsync();
        var completedOrActive = await _context.Enrollments
            .CountAsync(e => e.Status == EnrollmentStatus.Completed || e.Status == EnrollmentStatus.Active);
        
        return totalEnrollments > 0 ? (decimal)completedOrActive / totalEnrollments * 100 : 0;
    }
}
