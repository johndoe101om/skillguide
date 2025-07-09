using SkillGuide.Api.Models;

namespace SkillGuide.Api.DTOs;

public class AssessmentDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public AssessmentType Type { get; set; }
    public int DurationInMinutes { get; set; }
    public int MaxScore { get; set; }
    public int PassingScore { get; set; }
    public AssessmentStatus Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public Guid CreatedById { get; set; }
    public string CreatedByName { get; set; } = string.Empty;
    public Guid? CourseId { get; set; }
    public string? CourseName { get; set; }
    public Guid? TopicId { get; set; }
    public string? TopicName { get; set; }
    public Guid? BatchId { get; set; }
    public string? BatchName { get; set; }
    public bool IsRandomOrder { get; set; }
    public int MaxAttempts { get; set; }
    public int QuestionCount { get; set; }
    public int SubmissionCount { get; set; }
    public decimal AverageScore { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateAssessmentDto
{
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public AssessmentType Type { get; set; }
    public int DurationInMinutes { get; set; }
    public int MaxScore { get; set; }
    public int PassingScore { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public Guid? CourseId { get; set; }
    public Guid? TopicId { get; set; }
    public Guid? BatchId { get; set; }
    public bool IsRandomOrder { get; set; } = false;
    public int MaxAttempts { get; set; } = 1;
    public List<CreateQuestionDto> Questions { get; set; } = new();
}

public class UpdateAssessmentDto
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int? DurationInMinutes { get; set; }
    public int? MaxScore { get; set; }
    public int? PassingScore { get; set; }
    public AssessmentStatus? Status { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool? IsRandomOrder { get; set; }
    public int? MaxAttempts { get; set; }
}

public class QuestionDto
{
    public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public int Points { get; set; }
    public List<string> Options { get; set; } = new();
    public List<string> CorrectAnswers { get; set; } = new();
    public string? Explanation { get; set; }
    public int OrderIndex { get; set; }
}

public class CreateQuestionDto
{
    public string Text { get; set; } = string.Empty;
    public QuestionType Type { get; set; }
    public int Points { get; set; }
    public List<string> Options { get; set; } = new();
    public List<string> CorrectAnswers { get; set; } = new();
    public string? Explanation { get; set; }
    public int OrderIndex { get; set; }
}

public class AssessmentResultDto
{
    public Guid Id { get; set; }
    public Guid AssessmentId { get; set; }
    public string AssessmentTitle { get; set; } = string.Empty;
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public int Score { get; set; }
    public int MaxPossibleScore { get; set; }
    public decimal Percentage { get; set; }
    public bool IsPassed { get; set; }
    public ResultStatus Status { get; set; }
    public DateTime StartedAt { get; set; }
    public DateTime? CompletedAt { get; set; }
    public int TimeSpentInMinutes { get; set; }
    public int AttemptNumber { get; set; }
    public string? Feedback { get; set; }
    public Guid? GradedById { get; set; }
    public string? GradedByName { get; set; }
    public List<AnswerDto> Answers { get; set; } = new();
}

public class AnswerDto
{
    public Guid Id { get; set; }
    public Guid QuestionId { get; set; }
    public string QuestionText { get; set; } = string.Empty;
    public List<string> SelectedOptions { get; set; } = new();
    public string? TextAnswer { get; set; }
    public bool IsCorrect { get; set; }
    public int PointsAwarded { get; set; }
    public string? GraderFeedback { get; set; }
}

public class SubmitAssessmentDto
{
    public Guid AssessmentId { get; set; }
    public List<SubmitAnswerDto> Answers { get; set; } = new();
}

public class SubmitAnswerDto
{
    public Guid QuestionId { get; set; }
    public List<string> SelectedOptions { get; set; } = new();
    public string? TextAnswer { get; set; }
}
