using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Course
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Required]
    public int DurationInWeeks { get; set; }

    [Required]
    public CourseLevel Level { get; set; }

    public List<string> Prerequisites { get; set; } = new();
    public List<string> LearningObjectives { get; set; } = new();
    public List<string> TechnicalSkills { get; set; } = new();

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual ICollection<Batch> Batches { get; set; } = new List<Batch>();
    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();
    public virtual ICollection<Assessment> Assessments { get; set; } = new List<Assessment>();
}

public enum CourseLevel
{
    Beginner,
    Intermediate,
    Advanced,
    Expert
}
