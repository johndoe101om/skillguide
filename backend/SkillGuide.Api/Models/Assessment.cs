using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Assessment
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Required]
    public AssessmentType Type { get; set; }

    [Required]
    public int DurationInMinutes { get; set; }

    [Required]
    public int MaxScore { get; set; }

    [Required]
    public int PassingScore { get; set; }

    [Required]
    public AssessmentStatus Status { get; set; } = AssessmentStatus.Draft;

    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    [Required]
    public Guid CreatedById { get; set; }

    public Guid? CourseId { get; set; }
    public Guid? TopicId { get; set; }
    public Guid? BatchId { get; set; }

    public bool IsRandomOrder { get; set; } = false;
    public int MaxAttempts { get; set; } = 1;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User CreatedBy { get; set; } = null!;
    public virtual Course? Course { get; set; }
    public virtual Topic? Topic { get; set; }
    public virtual Batch? Batch { get; set; }
    public virtual ICollection<Question> Questions { get; set; } = new List<Question>();
    public virtual ICollection<AssessmentResult> Results { get; set; } = new List<AssessmentResult>();
}

public enum AssessmentType
{
    Quiz,
    Exam,
    Project,
    Practical,
    Assignment
}

public enum AssessmentStatus
{
    Draft,
    Scheduled,
    Active,
    Completed,
    Archived
}
