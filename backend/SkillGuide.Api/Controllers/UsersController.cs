using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.DTOs;
using SkillGuide.Api.Models;

namespace SkillGuide.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly SkillGuideDbContext _context;

    public UsersController(SkillGuideDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _context.Users
            .Select(u => new UserDto
            {
                Id = u.Id,
                Email = u.Email,
                Name = u.Name,
                Role = u.Role,
                Avatar = u.Avatar,
                Department = u.Department,
                Permissions = u.Permissions,
                CreatedAt = u.CreatedAt
            })
            .ToListAsync();

        return Ok(users);
    }

    // GET: api/users/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<UserProfileDto>> GetUser(Guid id)
    {
        var user = await _context.Users
            .Include(u => u.CandidateProfiles)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        var candidateProfile = user.CandidateProfiles.FirstOrDefault();
        
        var userProfile = new UserProfileDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Avatar = user.Avatar,
            Department = user.Department,
            CreatedAt = user.CreatedAt,
            CandidateProfile = candidateProfile != null ? new CandidateProfileDto
            {
                Id = candidateProfile.Id,
                Phone = candidateProfile.Phone,
                DateOfBirth = candidateProfile.DateOfBirth,
                Address = candidateProfile.Address,
                GitHubProfile = candidateProfile.GitHubProfile,
                LinkedInProfile = candidateProfile.LinkedInProfile,
                Portfolio = candidateProfile.Portfolio,
                Skills = candidateProfile.Skills,
                Certifications = candidateProfile.Certifications,
                Projects = candidateProfile.Projects,
                Biography = candidateProfile.Biography,
                ProfileCompletionPercentage = candidateProfile.ProfileCompletionPercentage,
                CurrentLevel = candidateProfile.CurrentLevel,
                NextMilestone = candidateProfile.NextMilestone,
                StudyStreak = candidateProfile.StudyStreak,
                SkillPoints = candidateProfile.SkillPoints,
                Rank = candidateProfile.Rank,
                ConfidenceLevel = candidateProfile.ConfidenceLevel,
                LearningVelocity = candidateProfile.LearningVelocity,
                PreferredLearningTime = candidateProfile.PreferredLearningTime,
                StrongSubjects = candidateProfile.StrongSubjects,
                ImprovementAreas = candidateProfile.ImprovementAreas
            } : null
        };

        return Ok(userProfile);
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto createUserDto)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == createUserDto.Email);
        if (existingUser != null)
        {
            return Conflict("User with this email already exists");
        }

        var user = new User
        {
            Email = createUserDto.Email,
            Name = createUserDto.Name,
            Role = createUserDto.Role,
            Avatar = createUserDto.Avatar,
            Department = createUserDto.Department,
            Permissions = createUserDto.Permissions
        };

        _context.Users.Add(user);

        // Create candidate profile for user role
        if (user.Role == UserRole.User)
        {
            var candidateProfile = new CandidateProfile
            {
                UserId = user.Id
            };
            _context.CandidateProfiles.Add(candidateProfile);
        }

        await _context.SaveChangesAsync();

        var userDto = new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Avatar = user.Avatar,
            Department = user.Department,
            Permissions = user.Permissions,
            CreatedAt = user.CreatedAt
        };

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, userDto);
    }

    // PUT: api/users/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, UpdateUserDto updateUserDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrWhiteSpace(updateUserDto.Name))
            user.Name = updateUserDto.Name;
        
        if (updateUserDto.Avatar != null)
            user.Avatar = updateUserDto.Avatar;
        
        if (updateUserDto.Department != null)
            user.Department = updateUserDto.Department;
        
        if (updateUserDto.Permissions != null)
            user.Permissions = updateUserDto.Permissions;

        user.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // PUT: api/users/{id}/profile
    [HttpPut("{id}/profile")]
    public async Task<IActionResult> UpdateCandidateProfile(Guid id, UpdateCandidateProfileDto updateProfileDto)
    {
        var user = await _context.Users
            .Include(u => u.CandidateProfiles)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user == null)
        {
            return NotFound();
        }

        var candidateProfile = user.CandidateProfiles.FirstOrDefault();
        if (candidateProfile == null)
        {
            candidateProfile = new CandidateProfile { UserId = id };
            _context.CandidateProfiles.Add(candidateProfile);
        }

        if (updateProfileDto.Phone != null)
            candidateProfile.Phone = updateProfileDto.Phone;
        
        if (updateProfileDto.DateOfBirth.HasValue)
            candidateProfile.DateOfBirth = updateProfileDto.DateOfBirth;
        
        if (updateProfileDto.Address != null)
            candidateProfile.Address = updateProfileDto.Address;
        
        if (updateProfileDto.GitHubProfile != null)
            candidateProfile.GitHubProfile = updateProfileDto.GitHubProfile;
        
        if (updateProfileDto.LinkedInProfile != null)
            candidateProfile.LinkedInProfile = updateProfileDto.LinkedInProfile;
        
        if (updateProfileDto.Portfolio != null)
            candidateProfile.Portfolio = updateProfileDto.Portfolio;
        
        if (updateProfileDto.Skills != null)
            candidateProfile.Skills = updateProfileDto.Skills;
        
        if (updateProfileDto.Certifications != null)
            candidateProfile.Certifications = updateProfileDto.Certifications;
        
        if (updateProfileDto.Projects != null)
            candidateProfile.Projects = updateProfileDto.Projects;
        
        if (updateProfileDto.Biography != null)
            candidateProfile.Biography = updateProfileDto.Biography;

        // Calculate profile completion percentage
        candidateProfile.ProfileCompletionPercentage = CalculateProfileCompletion(candidateProfile);
        candidateProfile.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    // DELETE: api/users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET: api/users/{id}/activities
    [HttpGet("{id}/activities")]
    public async Task<ActionResult<IEnumerable<RecentActivityDto>>> GetUserActivities(Guid id)
    {
        var activities = await _context.UserActivities
            .Where(a => a.UserId == id)
            .OrderByDescending(a => a.CreatedAt)
            .Take(20)
            .Select(a => new RecentActivityDto
            {
                Id = a.Id,
                Type = a.Type,
                Title = a.Title,
                Description = a.Description,
                Score = a.Score,
                Status = a.Status,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();

        return Ok(activities);
    }

    // GET: api/users/{id}/achievements
    [HttpGet("{id}/achievements")]
    public async Task<ActionResult<IEnumerable<AchievementDto>>> GetUserAchievements(Guid id)
    {
        var achievements = await _context.UserAchievements
            .Where(ua => ua.UserId == id)
            .Include(ua => ua.Achievement)
            .OrderByDescending(ua => ua.EarnedAt)
            .Select(ua => new AchievementDto
            {
                Id = ua.Achievement.Id,
                Title = ua.Achievement.Title,
                Description = ua.Achievement.Description,
                Type = ua.Achievement.Type,
                Rarity = ua.Achievement.Rarity,
                Icon = ua.Achievement.Icon,
                PointsAwarded = ua.Achievement.PointsAwarded,
                EarnedAt = ua.EarnedAt
            })
            .ToListAsync();

        return Ok(achievements);
    }

    private bool UserExists(Guid id)
    {
        return _context.Users.Any(e => e.Id == id);
    }

    private static int CalculateProfileCompletion(CandidateProfile profile)
    {
        int totalFields = 13;
        int completedFields = 0;

        if (!string.IsNullOrWhiteSpace(profile.Phone)) completedFields++;
        if (profile.DateOfBirth.HasValue) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.Address)) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.GitHubProfile)) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.LinkedInProfile)) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.Portfolio)) completedFields++;
        if (profile.Skills.Any()) completedFields++;
        if (profile.Certifications.Any()) completedFields++;
        if (profile.Projects.Any()) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.Biography)) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.CurrentLevel)) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.LearningVelocity)) completedFields++;
        if (!string.IsNullOrWhiteSpace(profile.PreferredLearningTime)) completedFields++;

        return (int)Math.Round((double)completedFields / totalFields * 100);
    }
}
