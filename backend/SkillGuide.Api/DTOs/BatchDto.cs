using SkillGuide.Api.Models;

namespace SkillGuide.Api.DTOs;

public class BatchDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int MaxCapacity { get; set; }
    public int CurrentEnrollment { get; set; }
    public BatchStatus Status { get; set; }
    public Guid TrainerId { get; set; }
    public string TrainerName { get; set; } = string.Empty;
    public decimal CompletionRate { get; set; }
    public decimal AverageScore { get; set; }
    public decimal SatisfactionRating { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<CourseDto> Courses { get; set; } = new();
    public List<EnrollmentDto> Enrollments { get; set; } = new();
}

public class CreateBatchDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int MaxCapacity { get; set; }
    public Guid TrainerId { get; set; }
    public List<Guid> CourseIds { get; set; } = new();
}

public class UpdateBatchDto
{
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int? MaxCapacity { get; set; }
    public BatchStatus? Status { get; set; }
    public Guid? TrainerId { get; set; }
}

public class CourseDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DurationInWeeks { get; set; }
    public CourseLevel Level { get; set; }
    public List<string> Prerequisites { get; set; } = new();
    public List<string> LearningObjectives { get; set; } = new();
    public List<string> TechnicalSkills { get; set; } = new();
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<TopicDto> Topics { get; set; } = new();
}

public class CreateCourseDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int DurationInWeeks { get; set; }
    public CourseLevel Level { get; set; }
    public List<string> Prerequisites { get; set; } = new();
    public List<string> LearningObjectives { get; set; } = new();
    public List<string> TechnicalSkills { get; set; } = new();
}

public class UpdateCourseDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? DurationInWeeks { get; set; }
    public CourseLevel? Level { get; set; }
    public List<string>? Prerequisites { get; set; }
    public List<string>? LearningObjectives { get; set; }
    public List<string>? TechnicalSkills { get; set; }
    public bool? IsActive { get; set; }
}

public class TopicDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int OrderIndex { get; set; }
    public int EstimatedHours { get; set; }
    public Guid CourseId { get; set; }
    public List<string> Resources { get; set; } = new();
    public List<string> KeyConcepts { get; set; } = new();
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateTopicDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int OrderIndex { get; set; }
    public int EstimatedHours { get; set; }
    public Guid CourseId { get; set; }
    public List<string> Resources { get; set; } = new();
    public List<string> KeyConcepts { get; set; } = new();
}

public class EnrollmentDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public Guid BatchId { get; set; }
    public string BatchName { get; set; } = string.Empty;
    public DateTime EnrollmentDate { get; set; }
    public EnrollmentStatus Status { get; set; }
    public decimal OverallProgress { get; set; }
    public decimal AverageScore { get; set; }
    public DateTime? CompletionDate { get; set; }
    public string? Notes { get; set; }
    public List<TopicProgressDto> TopicProgresses { get; set; } = new();
}

public class CreateEnrollmentDto
{
    public Guid UserId { get; set; }
    public Guid BatchId { get; set; }
    public string? Notes { get; set; }
}

public class TopicProgressDto
{
    public Guid Id { get; set; }
    public Guid TopicId { get; set; }
    public string TopicName { get; set; } = string.Empty;
    public decimal ProgressPercentage { get; set; }
    public TopicStatus Status { get; set; }
    public decimal? Score { get; set; }
    public int TimeSpentInMinutes { get; set; }
    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
}
