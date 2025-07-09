using SkillGuide.Api.Models;

namespace SkillGuide.Api.DTOs;

public class DashboardDto
{
    public DashboardOverviewDto Overview { get; set; } = new();
    public List<PersonalizedMetricDto> PersonalizedMetrics { get; set; } = new();
    public List<AiRecommendationDto> AiRecommendations { get; set; } = new();
    public List<UpcomingEventDto> UpcomingEvents { get; set; } = new();
    public List<RecentActivityDto> RecentActivities { get; set; } = new();
    public List<AchievementDto> RecentAchievements { get; set; } = new();
    public List<LearningInsightDto> LearningInsights { get; set; } = new();
}

public class DashboardOverviewDto
{
    public int TotalCandidates { get; set; }
    public int ActiveBatches { get; set; }
    public decimal CompletionRate { get; set; }
    public decimal AverageScore { get; set; }
    public TrendDataDto Trends { get; set; } = new();
}

public class TrendDataDto
{
    public TrendDto Candidates { get; set; } = new();
    public TrendDto Batches { get; set; } = new();
    public TrendDto Completion { get; set; } = new();
    public TrendDto Score { get; set; } = new();
}

public class TrendDto
{
    public decimal Value { get; set; }
    public string Direction { get; set; } = string.Empty; // "up", "down", "stable"
}

public class PersonalizedMetricDto
{
    public string Title { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Change { get; set; } = string.Empty;
    public string Trend { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Target { get; set; }
    public decimal Current { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
}

public class AiRecommendationDto
{
    public string Type { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
    public string Impact { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string TimeEstimate { get; set; } = string.Empty;
}

public class UpcomingEventDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime DateTime { get; set; }
    public ScheduleType Type { get; set; }
    public ParticipantStatus Status { get; set; }
    public decimal? Preparedness { get; set; }
    public string? PersonalRecommendation { get; set; }
    public string? Location { get; set; }
    public string? MeetingLink { get; set; }
}

public class RecentActivityDto
{
    public Guid Id { get; set; }
    public ActivityType Type { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public decimal? Score { get; set; }
    public string? Status { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class AchievementDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public AchievementType Type { get; set; }
    public AchievementRarity Rarity { get; set; }
    public string? Icon { get; set; }
    public int PointsAwarded { get; set; }
    public DateTime EarnedAt { get; set; }
}

public class LearningInsightDto
{
    public string Insight { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public bool Actionable { get; set; }
    public string? Action { get; set; }
    public string Category { get; set; } = string.Empty;
}

public class AnalyticsDto
{
    public List<PerformanceMetricDto> PerformanceMetrics { get; set; } = new();
    public List<BatchAnalyticsDto> BatchAnalytics { get; set; } = new();
    public List<SkillAnalyticsDto> SkillAnalytics { get; set; } = new();
    public List<LearningPatternDto> LearningPatterns { get; set; } = new();
    public List<PredictionDto> Predictions { get; set; } = new();
}

public class PerformanceMetricDto
{
    public string Title { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Change { get; set; } = string.Empty;
    public string Trend { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class BatchAnalyticsDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Candidates { get; set; }
    public decimal AvgScore { get; set; }
    public decimal Completion { get; set; }
    public decimal Satisfaction { get; set; }
    public string Trend { get; set; } = string.Empty;
}

public class SkillAnalyticsDto
{
    public string Skill { get; set; } = string.Empty;
    public int Proficiency { get; set; }
    public int Demand { get; set; }
    public string Growth { get; set; } = string.Empty;
}

public class LearningPatternDto
{
    public string Pattern { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Insight { get; set; } = string.Empty;
}

public class PredictionDto
{
    public string Type { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Priority { get; set; } = string.Empty;
    public decimal Confidence { get; set; }
}
