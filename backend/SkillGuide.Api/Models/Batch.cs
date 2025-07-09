using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Batch
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [StringLength(500)]
    public string? Description { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }

    [Required]
    public int MaxCapacity { get; set; }

    public int CurrentEnrollment { get; set; } = 0;

    [Required]
    public BatchStatus Status { get; set; } = BatchStatus.Planned;

    [Required]
    public Guid TrainerId { get; set; }

    public decimal CompletionRate { get; set; } = 0;
    public decimal AverageScore { get; set; } = 0;
    public decimal SatisfactionRating { get; set; } = 0;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User Trainer { get; set; } = null!;
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public virtual ICollection<Assessment> Assessments { get; set; } = new List<Assessment>();
    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}

public enum BatchStatus
{
    Planned,
    Active,
    Completed,
    Cancelled
}
