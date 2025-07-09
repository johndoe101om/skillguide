using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Achievement
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public AchievementType Type { get; set; }

    [Required]
    public AchievementRarity Rarity { get; set; }

    [StringLength(100)]
    public string? Icon { get; set; }

    public int PointsAwarded { get; set; } = 0;

    public List<string> Criteria { get; set; } = new();

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
}

public class UserAchievement
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public Guid AchievementId { get; set; }

    [Required]
    public DateTime EarnedAt { get; set; } = DateTime.UtcNow;

    [StringLength(500)]
    public string? Notes { get; set; }

    // Navigation properties
    public virtual User User { get; set; } = null!;
    public virtual Achievement Achievement { get; set; } = null!;
}

public enum AchievementType
{
    Score,
    Streak,
    Speed,
    Completion,
    Participation,
    Special
}

public enum AchievementRarity
{
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary
}
