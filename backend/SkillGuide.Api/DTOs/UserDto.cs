using SkillGuide.Api.Models;

namespace SkillGuide.Api.DTOs;

public class UserDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string? Avatar { get; set; }
    public string? Department { get; set; }
    public List<string> Permissions { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class CreateUserDto
{
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string? Avatar { get; set; }
    public string? Department { get; set; }
    public List<string> Permissions { get; set; } = new();
}

public class UpdateUserDto
{
    public string? Name { get; set; }
    public string? Avatar { get; set; }
    public string? Department { get; set; }
    public List<string>? Permissions { get; set; }
}

public class UserProfileDto
{
    public Guid Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public UserRole Role { get; set; }
    public string? Avatar { get; set; }
    public string? Department { get; set; }
    public CandidateProfileDto? CandidateProfile { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CandidateProfileDto
{
    public Guid Id { get; set; }
    public string? Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Address { get; set; }
    public string? GitHubProfile { get; set; }
    public string? LinkedInProfile { get; set; }
    public string? Portfolio { get; set; }
    public List<string> Skills { get; set; } = new();
    public List<string> Certifications { get; set; } = new();
    public List<string> Projects { get; set; } = new();
    public string? Biography { get; set; }
    public int ProfileCompletionPercentage { get; set; }
    public string? CurrentLevel { get; set; }
    public string? NextMilestone { get; set; }
    public int StudyStreak { get; set; }
    public int SkillPoints { get; set; }
    public int Rank { get; set; }
    public decimal ConfidenceLevel { get; set; }
    public string? LearningVelocity { get; set; }
    public string? PreferredLearningTime { get; set; }
    public List<string> StrongSubjects { get; set; } = new();
    public List<string> ImprovementAreas { get; set; } = new();
}

public class UpdateCandidateProfileDto
{
    public string? Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string? Address { get; set; }
    public string? GitHubProfile { get; set; }
    public string? LinkedInProfile { get; set; }
    public string? Portfolio { get; set; }
    public List<string>? Skills { get; set; }
    public List<string>? Certifications { get; set; }
    public List<string>? Projects { get; set; }
    public string? Biography { get; set; }
}
