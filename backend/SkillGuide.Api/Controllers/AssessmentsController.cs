using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.DTOs;
using SkillGuide.Api.Models;

namespace SkillGuide.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssessmentsController : ControllerBase
{
    private readonly SkillGuideDbContext _context;

    public AssessmentsController(SkillGuideDbContext context)
    {
        _context = context;
    }

    // GET: api/assessments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AssessmentDto>>> GetAssessments()
    {
        var assessments = await _context.Assessments
            .Include(a => a.CreatedBy)
            .Include(a => a.Course)
            .Include(a => a.Topic)
            .Include(a => a.Batch)
            .Include(a => a.Questions)
            .Include(a => a.Results)
            .Select(a => new AssessmentDto
            {
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                Type = a.Type,
                DurationInMinutes = a.DurationInMinutes,
                MaxScore = a.MaxScore,
                PassingScore = a.PassingScore,
                Status = a.Status,
                StartDate = a.StartDate,
                EndDate = a.EndDate,
                CreatedById = a.CreatedById,
                CreatedByName = a.CreatedBy.Name,
                CourseId = a.CourseId,
                CourseName = a.Course != null ? a.Course.Title : null,
                TopicId = a.TopicId,
                TopicName = a.Topic != null ? a.Topic.Name : null,
                BatchId = a.BatchId,
                BatchName = a.Batch != null ? a.Batch.Name : null,
                IsRandomOrder = a.IsRandomOrder,
                MaxAttempts = a.MaxAttempts,
                QuestionCount = a.Questions.Count,
                SubmissionCount = a.Results.Count,
                AverageScore = a.Results.Any() ? a.Results.Average(r => r.Score) : 0,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();

        return Ok(assessments);
    }

    // GET: api/assessments/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AssessmentDto>> GetAssessment(Guid id)
    {
        var assessment = await _context.Assessments
            .Include(a => a.CreatedBy)
            .Include(a => a.Course)
            .Include(a => a.Topic)
            .Include(a => a.Batch)
            .Include(a => a.Questions)
            .Include(a => a.Results)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (assessment == null)
        {
            return NotFound();
        }

        var assessmentDto = new AssessmentDto
        {
            Id = assessment.Id,
            Title = assessment.Title,
            Description = assessment.Description,
            Type = assessment.Type,
            DurationInMinutes = assessment.DurationInMinutes,
            MaxScore = assessment.MaxScore,
            PassingScore = assessment.PassingScore,
            Status = assessment.Status,
            StartDate = assessment.StartDate,
            EndDate = assessment.EndDate,
            CreatedById = assessment.CreatedById,
            CreatedByName = assessment.CreatedBy.Name,
            CourseId = assessment.CourseId,
            CourseName = assessment.Course?.Title,
            TopicId = assessment.TopicId,
            TopicName = assessment.Topic?.Name,
            BatchId = assessment.BatchId,
            BatchName = assessment.Batch?.Name,
            IsRandomOrder = assessment.IsRandomOrder,
            MaxAttempts = assessment.MaxAttempts,
            QuestionCount = assessment.Questions.Count,
            SubmissionCount = assessment.Results.Count,
            AverageScore = assessment.Results.Any() ? assessment.Results.Average(r => r.Score) : 0,
            CreatedAt = assessment.CreatedAt
        };

        return Ok(assessmentDto);
    }

    // GET: api/assessments/{id}/questions
    [HttpGet("{id}/questions")]
    public async Task<ActionResult<IEnumerable<QuestionDto>>> GetAssessmentQuestions(Guid id)
    {
        var questions = await _context.Questions
            .Where(q => q.AssessmentId == id)
            .OrderBy(q => q.OrderIndex)
            .Select(q => new QuestionDto
            {
                Id = q.Id,
                Text = q.Text,
                Type = q.Type,
                Points = q.Points,
                Options = q.Options,
                CorrectAnswers = q.CorrectAnswers,
                Explanation = q.Explanation,
                OrderIndex = q.OrderIndex
            })
            .ToListAsync();

        return Ok(questions);
    }

    // POST: api/assessments
    [HttpPost]
    public async Task<ActionResult<AssessmentDto>> CreateAssessment(CreateAssessmentDto createAssessmentDto)
    {
        var assessment = new Assessment
        {
            Title = createAssessmentDto.Title,
            Description = createAssessmentDto.Description,
            Type = createAssessmentDto.Type,
            DurationInMinutes = createAssessmentDto.DurationInMinutes,
            MaxScore = createAssessmentDto.MaxScore,
            PassingScore = createAssessmentDto.PassingScore,
            StartDate = createAssessmentDto.StartDate,
            EndDate = createAssessmentDto.EndDate,
            CreatedById = Guid.NewGuid(), // Should come from authenticated user
            CourseId = createAssessmentDto.CourseId,
            TopicId = createAssessmentDto.TopicId,
            BatchId = createAssessmentDto.BatchId,
            IsRandomOrder = createAssessmentDto.IsRandomOrder,
            MaxAttempts = createAssessmentDto.MaxAttempts
        };

        _context.Assessments.Add(assessment);

        // Add questions
        foreach (var questionDto in createAssessmentDto.Questions)
        {
            var question = new Question
            {
                Text = questionDto.Text,
                Type = questionDto.Type,
                Points = questionDto.Points,
                AssessmentId = assessment.Id,
                Options = questionDto.Options,
                CorrectAnswers = questionDto.CorrectAnswers,
                Explanation = questionDto.Explanation,
                OrderIndex = questionDto.OrderIndex
            };
            _context.Questions.Add(question);
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAssessment), new { id = assessment.Id }, assessment.Id);
    }

    // PUT: api/assessments/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAssessment(Guid id, UpdateAssessmentDto updateAssessmentDto)
    {
        var assessment = await _context.Assessments.FindAsync(id);
        if (assessment == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrWhiteSpace(updateAssessmentDto.Title))
            assessment.Title = updateAssessmentDto.Title;
        
        if (updateAssessmentDto.Description != null)
            assessment.Description = updateAssessmentDto.Description;
        
        if (updateAssessmentDto.DurationInMinutes.HasValue)
            assessment.DurationInMinutes = updateAssessmentDto.DurationInMinutes.Value;
        
        if (updateAssessmentDto.MaxScore.HasValue)
            assessment.MaxScore = updateAssessmentDto.MaxScore.Value;
        
        if (updateAssessmentDto.PassingScore.HasValue)
            assessment.PassingScore = updateAssessmentDto.PassingScore.Value;
        
        if (updateAssessmentDto.Status.HasValue)
            assessment.Status = updateAssessmentDto.Status.Value;
        
        if (updateAssessmentDto.StartDate.HasValue)
            assessment.StartDate = updateAssessmentDto.StartDate;
        
        if (updateAssessmentDto.EndDate.HasValue)
            assessment.EndDate = updateAssessmentDto.EndDate;
        
        if (updateAssessmentDto.IsRandomOrder.HasValue)
            assessment.IsRandomOrder = updateAssessmentDto.IsRandomOrder.Value;
        
        if (updateAssessmentDto.MaxAttempts.HasValue)
            assessment.MaxAttempts = updateAssessmentDto.MaxAttempts.Value;

        assessment.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AssessmentExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // POST: api/assessments/{id}/submit
    [HttpPost("{id}/submit")]
    public async Task<ActionResult<AssessmentResultDto>> SubmitAssessment(Guid id, SubmitAssessmentDto submitDto)
    {
        var assessment = await _context.Assessments
            .Include(a => a.Questions)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (assessment == null)
        {
            return NotFound();
        }

        var userId = Guid.NewGuid(); // Should come from authenticated user

        // Check if user has already exceeded max attempts
        var existingAttempts = await _context.AssessmentResults
            .CountAsync(r => r.AssessmentId == id && r.UserId == userId);

        if (existingAttempts >= assessment.MaxAttempts)
        {
            return BadRequest("Maximum attempts exceeded");
        }

        var assessmentResult = new AssessmentResult
        {
            AssessmentId = id,
            UserId = userId,
            MaxPossibleScore = assessment.MaxScore,
            Status = ResultStatus.Submitted,
            CompletedAt = DateTime.UtcNow,
            AttemptNumber = existingAttempts + 1
        };

        _context.AssessmentResults.Add(assessmentResult);

        int totalScore = 0;

        // Process answers
        foreach (var answerDto in submitDto.Answers)
        {
            var question = assessment.Questions.FirstOrDefault(q => q.Id == answerDto.QuestionId);
            if (question == null) continue;

            var answer = new Answer
            {
                QuestionId = answerDto.QuestionId,
                AssessmentResultId = assessmentResult.Id,
                SelectedOptions = answerDto.SelectedOptions,
                TextAnswer = answerDto.TextAnswer
            };

            // Auto-grade multiple choice questions
            if (question.Type == QuestionType.MultipleChoice || question.Type == QuestionType.TrueFalse)
            {
                answer.IsCorrect = question.CorrectAnswers.SequenceEqual(answerDto.SelectedOptions);
                answer.PointsAwarded = answer.IsCorrect ? question.Points : 0;
            }
            else if (question.Type == QuestionType.MultipleSelect)
            {
                var correctCount = answerDto.SelectedOptions.Intersect(question.CorrectAnswers).Count();
                var incorrectCount = answerDto.SelectedOptions.Except(question.CorrectAnswers).Count();
                var totalCorrect = question.CorrectAnswers.Count;
                
                if (incorrectCount == 0 && correctCount == totalCorrect)
                {
                    answer.IsCorrect = true;
                    answer.PointsAwarded = question.Points;
                }
                else
                {
                    answer.IsCorrect = false;
                    answer.PointsAwarded = Math.Max(0, (correctCount - incorrectCount) * question.Points / totalCorrect);
                }
            }

            totalScore += answer.PointsAwarded;
            _context.Answers.Add(answer);
        }

        assessmentResult.Score = totalScore;
        assessmentResult.IsPassed = totalScore >= assessment.PassingScore;

        await _context.SaveChangesAsync();

        // Create activity record
        var activity = new UserActivity
        {
            UserId = userId,
            Type = ActivityType.Assessment,
            Title = $"Completed {assessment.Title}",
            Description = $"Scored {totalScore}/{assessment.MaxScore} ({assessmentResult.Percentage:F1}%)",
            Score = totalScore,
            Status = assessmentResult.IsPassed ? "Passed" : "Failed",
            RelatedEntityId = assessment.Id,
            RelatedEntityType = "Assessment"
        };
        _context.UserActivities.Add(activity);
        await _context.SaveChangesAsync();

        var resultDto = new AssessmentResultDto
        {
            Id = assessmentResult.Id,
            AssessmentId = assessment.Id,
            AssessmentTitle = assessment.Title,
            UserId = userId,
            UserName = "Current User", // Should come from authenticated user
            Score = totalScore,
            MaxPossibleScore = assessment.MaxScore,
            Percentage = assessmentResult.Percentage,
            IsPassed = assessmentResult.IsPassed,
            Status = assessmentResult.Status,
            StartedAt = assessmentResult.StartedAt,
            CompletedAt = assessmentResult.CompletedAt,
            AttemptNumber = assessmentResult.AttemptNumber
        };

        return Ok(resultDto);
    }

    // GET: api/assessments/{id}/results
    [HttpGet("{id}/results")]
    public async Task<ActionResult<IEnumerable<AssessmentResultDto>>> GetAssessmentResults(Guid id)
    {
        var results = await _context.AssessmentResults
            .Where(r => r.AssessmentId == id)
            .Include(r => r.User)
            .Include(r => r.Assessment)
            .Include(r => r.GradedBy)
            .OrderByDescending(r => r.CompletedAt)
            .Select(r => new AssessmentResultDto
            {
                Id = r.Id,
                AssessmentId = r.AssessmentId,
                AssessmentTitle = r.Assessment.Title,
                UserId = r.UserId,
                UserName = r.User.Name,
                Score = r.Score,
                MaxPossibleScore = r.MaxPossibleScore,
                Percentage = r.Percentage,
                IsPassed = r.IsPassed,
                Status = r.Status,
                StartedAt = r.StartedAt,
                CompletedAt = r.CompletedAt,
                TimeSpentInMinutes = r.TimeSpentInMinutes,
                AttemptNumber = r.AttemptNumber,
                Feedback = r.Feedback,
                GradedById = r.GradedById,
                GradedByName = r.GradedBy != null ? r.GradedBy.Name : null
            })
            .ToListAsync();

        return Ok(results);
    }

    // DELETE: api/assessments/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAssessment(Guid id)
    {
        var assessment = await _context.Assessments.FindAsync(id);
        if (assessment == null)
        {
            return NotFound();
        }

        _context.Assessments.Remove(assessment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AssessmentExists(Guid id)
    {
        return _context.Assessments.Any(e => e.Id == id);
    }
}
