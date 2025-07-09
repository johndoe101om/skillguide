using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SkillGuide.Api.Models;

public class User
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(255)]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public UserRole Role { get; set; }

    public string? Avatar { get; set; }

    [StringLength(100)]
    public string? Department { get; set; }

    public List<string> Permissions { get; set; } = new();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual ICollection<CandidateProfile> CandidateProfiles { get; set; } = new List<CandidateProfile>();
    public virtual ICollection<Assessment> CreatedAssessments { get; set; } = new List<Assessment>();
    public virtual ICollection<AssessmentResult> AssessmentResults { get; set; } = new List<AssessmentResult>();
    public virtual ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
}

public enum UserRole
{
    User,
    Trainer,
    Admin
}
