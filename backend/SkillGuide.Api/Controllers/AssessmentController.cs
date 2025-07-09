using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.DTOs;
using SkillGuide.Api.Models;
using SkillGuide.Api.Services;

namespace SkillGuide.Api.Controllers;

public class AssessmentController : Controller
{
    private readonly SkillGuideDbContext _context;
    private readonly IBackgroundJobService _backgroundJobService;

    public AssessmentController(SkillGuideDbContext context, IBackgroundJobService backgroundJobService)
    {
        _context = context;
        _backgroundJobService = backgroundJobService;
    }

    // GET: Assessment
    public async Task<IActionResult> Index()
    {
        var assessments = await _context.Assessments
            .Include(a => a.CreatedBy)
            .Include(a => a.Course)
            .Include(a => a.Batch)
            .OrderByDescending(a => a.CreatedAt)
            .ToListAsync();

        return View(assessments);
    }

    // GET: Assessment/Create
    public async Task<IActionResult> Create()
    {
        ViewBag.Courses = await _context.Courses.Where(c => c.IsActive).ToListAsync();
        ViewBag.Batches = await _context.Batches.Where(b => b.Status == BatchStatus.Active).ToListAsync();
        ViewBag.Topics = await _context.Topics.Where(t => t.IsActive).ToListAsync();
        
        return View();
    }

    // POST: Assessment/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Assessment assessment)
    {
        if (ModelState.IsValid)
        {
            assessment.Id = Guid.NewGuid();
            assessment.CreatedById = Guid.NewGuid(); // Should come from authenticated user
            assessment.CreatedAt = DateTime.UtcNow;
            assessment.UpdatedAt = DateTime.UtcNow;

            _context.Assessments.Add(assessment);
            await _context.SaveChangesAsync();

            // Schedule reminder if assessment has start date
            if (assessment.StartDate.HasValue)
            {
                var reminderTime = assessment.StartDate.Value.AddHours(-24);
                if (reminderTime > DateTime.UtcNow)
                {
                    await _backgroundJobService.ScheduleAssessmentReminder(assessment.Id, reminderTime);
                }
            }

            return RedirectToAction(nameof(Index));
        }

        ViewBag.Courses = await _context.Courses.Where(c => c.IsActive).ToListAsync();
        ViewBag.Batches = await _context.Batches.Where(b => b.Status == BatchStatus.Active).ToListAsync();
        ViewBag.Topics = await _context.Topics.Where(t => t.IsActive).ToListAsync();
        
        return View(assessment);
    }

    // GET: Assessment/Details/5
    public async Task<IActionResult> Details(Guid id)
    {
        var assessment = await _context.Assessments
            .Include(a => a.CreatedBy)
            .Include(a => a.Course)
            .Include(a => a.Topic)
            .Include(a => a.Batch)
            .Include(a => a.Questions)
            .Include(a => a.Results)
                .ThenInclude(r => r.User)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (assessment == null)
        {
            return NotFound();
        }

        return View(assessment);
    }

    // GET: Assessment/Take/5
    public async Task<IActionResult> Take(Guid id)
    {
        var assessment = await _context.Assessments
            .Include(a => a.Questions)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (assessment == null)
        {
            return NotFound();
        }

        // Check if assessment is active and available
        if (assessment.Status != AssessmentStatus.Active)
        {
            TempData["Error"] = "This assessment is not currently available.";
            return RedirectToAction(nameof(Index));
        }

        // Check if user has attempts left
        var userId = Guid.NewGuid(); // Should come from authenticated user
        var attemptCount = await _context.AssessmentResults
            .CountAsync(r => r.AssessmentId == id && r.UserId == userId);

        if (attemptCount >= assessment.MaxAttempts)
        {
            TempData["Error"] = "You have exceeded the maximum number of attempts for this assessment.";
            return RedirectToAction(nameof(Index));
        }

        return View(assessment);
    }

    // POST: Assessment/Submit
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Submit(Guid assessmentId, Dictionary<Guid, string[]> answers)
    {
        var assessment = await _context.Assessments
            .Include(a => a.Questions)
            .FirstOrDefaultAsync(a => a.Id == assessmentId);

        if (assessment == null)
        {
            return NotFound();
        }

        var userId = Guid.NewGuid(); // Should come from authenticated user

        // Create assessment result
        var assessmentResult = new AssessmentResult
        {
            AssessmentId = assessmentId,
            UserId = userId,
            MaxPossibleScore = assessment.MaxScore,
            Status = ResultStatus.Submitted,
            CompletedAt = DateTime.UtcNow,
            AttemptNumber = await _context.AssessmentResults.CountAsync(r => r.AssessmentId == assessmentId && r.UserId == userId) + 1
        };

        _context.AssessmentResults.Add(assessmentResult);

        // Process answers
        foreach (var answerPair in answers)
        {
            var questionId = answerPair.Key;
            var selectedOptions = answerPair.Value?.ToList() ?? new List<string>();

            var answer = new Answer
            {
                QuestionId = questionId,
                AssessmentResultId = assessmentResult.Id,
                SelectedOptions = selectedOptions
            };

            _context.Answers.Add(answer);
        }

        await _context.SaveChangesAsync();

        // Queue background job to process results
        await _backgroundJobService.ProcessAssessmentResults(assessmentResult.Id);

        TempData["Success"] = "Assessment submitted successfully! Your results will be available shortly.";
        return RedirectToAction("Results", new { id = assessmentResult.Id });
    }

    // GET: Assessment/Results/5
    public async Task<IActionResult> Results(Guid id)
    {
        var result = await _context.AssessmentResults
            .Include(r => r.Assessment)
            .Include(r => r.User)
            .Include(r => r.Answers)
                .ThenInclude(a => a.Question)
            .FirstOrDefaultAsync(r => r.Id == id);

        if (result == null)
        {
            return NotFound();
        }

        return View(result);
    }

    // AJAX endpoints for dynamic data
    [HttpGet]
    public async Task<JsonResult> GetAssessmentsByBatch(Guid batchId)
    {
        var assessments = await _context.Assessments
            .Where(a => a.BatchId == batchId)
            .Select(a => new { a.Id, a.Title, a.Status })
            .ToListAsync();

        return Json(assessments);
    }

    [HttpGet]
    public async Task<JsonResult> GetTopicsByCourse(Guid courseId)
    {
        var topics = await _context.Topics
            .Where(t => t.CourseId == courseId && t.IsActive)
            .Select(t => new { t.Id, t.Name })
            .ToListAsync();

        return Json(topics);
    }

    [HttpPost]
    public async Task<JsonResult> UpdateAssessmentStatus(Guid id, AssessmentStatus status)
    {
        var assessment = await _context.Assessments.FindAsync(id);
        if (assessment == null)
        {
            return Json(new { success = false, message = "Assessment not found" });
        }

        assessment.Status = status;
        assessment.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Json(new { success = true, message = "Status updated successfully" });
    }
}
