using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class UserActivity
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [Required]
    [StringLength(50)]
    public ActivityType Type { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    public Guid? RelatedEntityId { get; set; }

    [StringLength(50)]
    public string? RelatedEntityType { get; set; }

    public decimal? Score { get; set; }

    [StringLength(50)]
    public string? Status { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User User { get; set; } = null!;
}

public enum ActivityType
{
    Assessment,
    Submission,
    Completion,
    Registration,
    Achievement,
    Login,
    CourseStart,
    TopicComplete
}
