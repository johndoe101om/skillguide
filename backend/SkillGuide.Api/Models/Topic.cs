using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Topic
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(200)]
    public string Name { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Required]
    public int OrderIndex { get; set; }

    [Required]
    public int EstimatedHours { get; set; }

    [Required]
    public Guid CourseId { get; set; }

    public List<string> Resources { get; set; } = new();
    public List<string> KeyConcepts { get; set; } = new();

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Course Course { get; set; } = null!;
    public virtual ICollection<TopicProgress> TopicProgresses { get; set; } = new List<TopicProgress>();
    public virtual ICollection<Assessment> Assessments { get; set; } = new List<Assessment>();
}
