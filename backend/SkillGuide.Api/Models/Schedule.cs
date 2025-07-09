using System.ComponentModel.DataAnnotations;

namespace SkillGuide.Api.Models;

public class Schedule
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [StringLength(1000)]
    public string? Description { get; set; }

    [Required]
    public ScheduleType Type { get; set; }

    [Required]
    public DateTime StartDateTime { get; set; }

    [Required]
    public DateTime EndDateTime { get; set; }

    public Guid? BatchId { get; set; }
    public Guid? AssessmentId { get; set; }
    public Guid? CreatedById { get; set; }

    [Required]
    public ScheduleStatus Status { get; set; } = ScheduleStatus.Scheduled;

    [StringLength(200)]
    public string? Location { get; set; }

    [StringLength(500)]
    public string? MeetingLink { get; set; }

    public List<string> RequiredMaterials { get; set; } = new();

    public int? MaxParticipants { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public virtual Batch? Batch { get; set; }
    public virtual Assessment? Assessment { get; set; }
    public virtual User? CreatedBy { get; set; }
    public virtual ICollection<ScheduleParticipant> Participants { get; set; } = new List<ScheduleParticipant>();
}

public class ScheduleParticipant
{
    [Key]
    public Guid Id { get; set; } = Guid.NewGuid();

    [Required]
    public Guid ScheduleId { get; set; }

    [Required]
    public Guid UserId { get; set; }

    [Required]
    public ParticipantStatus Status { get; set; } = ParticipantStatus.Registered;

    public DateTime RegisteredAt { get; set; } = DateTime.UtcNow;

    [StringLength(500)]
    public string? Notes { get; set; }

    // Navigation properties
    public virtual Schedule Schedule { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}

public enum ScheduleType
{
    Lecture,
    Workshop,
    Assessment,
    Project,
    Review,
    Interview,
    Meeting,
    Practice
}

public enum ScheduleStatus
{
    Scheduled,
    InProgress,
    Completed,
    Cancelled,
    Postponed
}

public enum ParticipantStatus
{
    Registered,
    Confirmed,
    Attended,
    Absent,
    Cancelled
}
