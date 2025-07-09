using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Enrollment
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public Guid BatchId { get; set; }

    [Required]
    public DateTime EnrollmentDate { get; set; } = DateTime.UtcNow;

    [Required]
    public EnrollmentStatus Status { get; set; } = EnrollmentStatus.Active;

    public decimal OverallProgress { get; set; } = 0;
    public decimal AverageScore { get; set; } = 0;

    public DateTime? CompletionDate { get; set; }

    [StringLength(1000)]
    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Batch Batch { get; set; } = null!;
    public virtual ICollection<TopicProgress> TopicProgresses { get; set; } = new List<TopicProgress>();
}

public enum EnrollmentStatus
{
    Active,
    Completed,
    Dropped,
    Suspended,
    OnHold
}
