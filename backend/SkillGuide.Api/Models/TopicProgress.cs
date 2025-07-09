using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class TopicProgress
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid EnrollmentId { get; set; }

    [Required]
    public Guid TopicId { get; set; }

    [Required]
    public decimal ProgressPercentage { get; set; } = 0;

    [Required]
    public TopicStatus Status { get; set; } = TopicStatus.NotStarted;

    public decimal? Score { get; set; }

    public int TimeSpentInMinutes { get; set; } = 0;

    public DateTime? StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Enrollment Enrollment { get; set; } = null!;
    public virtual Topic Topic { get; set; } = null!;
}

public enum TopicStatus
{
    NotStarted,
    InProgress,
    Completed,
    Skipped
}
