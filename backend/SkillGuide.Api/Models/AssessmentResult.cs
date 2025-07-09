using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class AssessmentResult
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid AssessmentId { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public int Score { get; set; }

    [Required]
    public int MaxPossibleScore { get; set; }

    public decimal Percentage => MaxPossibleScore > 0 ? (decimal)Score / MaxPossibleScore * 100 : 0;

    [Required]
    public bool IsPassed { get; set; }

    [Required]
    public ResultStatus Status { get; set; } = ResultStatus.InProgress;

    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedAt { get; set; }
    public int TimeSpentInMinutes { get; set; }

    public int AttemptNumber { get; set; } = 1;

    [StringLength(2000)]
    public string? Feedback { get; set; }

    public Guid? GradedById { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Assessment Assessment { get; set; } = null!;
    public virtual User User { get; set; } = null!;
    public virtual User? GradedBy { get; set; }
    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
}

public enum ResultStatus
{
    InProgress,
    Submitted,
    Graded,
    Reviewed
}
