using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Question
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(1000)]
    public string Text { get; set; } = string.Empty;

    [Required]
    public QuestionType Type { get; set; }

    [Required]
    public int Points { get; set; }

    [Required]
    public Guid AssessmentId { get; set; }

    public List<string> Options { get; set; } = new();
    public List<string> CorrectAnswers { get; set; } = new();

    [StringLength(2000)]
    public string? Explanation { get; set; }

    public int OrderIndex { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Assessment Assessment { get; set; } = null!;
    public virtual ICollection<Answer> Answers { get; set; } = new List<Answer>();
}

public enum QuestionType
{
    MultipleChoice,
    MultipleSelect,
    TrueFalse,
    ShortAnswer,
    Essay,
    Code,
    Practical
}
