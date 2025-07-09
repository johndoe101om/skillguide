using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Answer
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid QuestionId { get; set; }

    [Required]
    public Guid AssessmentResultId { get; set; }

    public List<string> SelectedOptions { get; set; } = new();

    [StringLength(5000)]
    public string? TextAnswer { get; set; }

    public bool IsCorrect { get; set; }

    public int PointsAwarded { get; set; }

    [StringLength(1000)]
    public string? GraderFeedback { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Question Question { get; set; } = null!;
    public virtual AssessmentResult AssessmentResult { get; set; } = null!;
}
