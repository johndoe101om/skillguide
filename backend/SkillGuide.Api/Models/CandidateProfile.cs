using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class CandidateProfile
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [StringLength(20)]
    public string? Phone { get; set; }

    public DateTime? DateOfBirth { get; set; }

    [StringLength(500)]
    public string? Address { get; set; }

    [StringLength(100)]
    public string? GitHubProfile { get; set; }

    [StringLength(100)]
    public string? LinkedInProfile { get; set; }

    [StringLength(100)]
    public string? Portfolio { get; set; }

    public List<string> Skills { get; set; } = new();
    public List<string> Certifications { get; set; } = new();
    public List<string> Projects { get; set; } = new();

    [StringLength(500)]
    public string? Biography { get; set; }

    public int ProfileCompletionPercentage { get; set; } = 0;

    public string? CurrentLevel { get; set; }
    public string? NextMilestone { get; set; }

    public int StudyStreak { get; set; } = 0;
    public int SkillPoints { get; set; } = 0;
    public int Rank { get; set; } = 0;

    public decimal ConfidenceLevel { get; set; } = 0;
    public string? LearningVelocity { get; set; }
    public string? PreferredLearningTime { get; set; }

    public List<string> StrongSubjects { get; set; } = new();
    public List<string> ImprovementAreas { get; set; } = new();

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();
}
