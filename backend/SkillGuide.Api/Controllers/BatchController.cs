using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.Models;
using SkillGuide.Api.Services;

namespace SkillGuide.Api.Controllers;

public class BatchController : Controller
{
    private readonly SkillGuideDbContext _context;
    private readonly IBackgroundJobService _backgroundJobService;

    public BatchController(SkillGuideDbContext context, IBackgroundJobService backgroundJobService)
    {
        _context = context;
        _backgroundJobService = backgroundJobService;
    }

    // GET: Batch
    public async Task<IActionResult> Index()
    {
        var batches = await _context.Batches
            .Include(b => b.Trainer)
            .Include(b => b.Enrollments)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();

        return View(batches);
    }

    // GET: Batch/Create
    public async Task<IActionResult> Create()
    {
        ViewBag.Trainers = await _context.Users
            .Where(u => u.Role == UserRole.Trainer)
            .Select(u => new { u.Id, u.Name })
            .ToListAsync();

        ViewBag.Courses = await _context.Courses
            .Where(c => c.IsActive)
            .ToListAsync();

        return View();
    }

    // POST: Batch/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Batch batch, List<Guid> selectedCourses)
    {
        if (ModelState.IsValid)
        {
            batch.Id = Guid.NewGuid();
            batch.CreatedAt = DateTime.UtcNow;
            batch.UpdatedAt = DateTime.UtcNow;

            _context.Batches.Add(batch);

            // Add selected courses to batch
            if (selectedCourses?.Any() == true)
            {
                var courses = await _context.Courses
                    .Where(c => selectedCourses.Contains(c.Id))
                    .ToListAsync();

                foreach (var course in courses)
                {
                    batch.Courses.Add(course);
                }
            }

            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }

        ViewBag.Trainers = await _context.Users
            .Where(u => u.Role == UserRole.Trainer)
            .Select(u => new { u.Id, u.Name })
            .ToListAsync();

        ViewBag.Courses = await _context.Courses
            .Where(c => c.IsActive)
            .ToListAsync();

        return View(batch);
    }

    // GET: Batch/Details/5
    public async Task<IActionResult> Details(Guid id)
    {
        var batch = await _context.Batches
            .Include(b => b.Trainer)
            .Include(b => b.Courses)
            .Include(b => b.Enrollments)
                .ThenInclude(e => e.User)
            .Include(b => b.Assessments)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (batch == null)
        {
            return NotFound();
        }

        return View(batch);
    }

    // GET: Batch/Enroll/5
    public async Task<IActionResult> Enroll(Guid id)
    {
        var batch = await _context.Batches.FindAsync(id);
        if (batch == null)
        {
            return NotFound();
        }

        ViewBag.Batch = batch;
        ViewBag.AvailableUsers = await _context.Users
            .Where(u => u.Role == UserRole.User && 
                       !_context.Enrollments.Any(e => e.BatchId == id && e.UserId == u.Id))
            .Select(u => new { u.Id, u.Name, u.Email })
            .ToListAsync();

        return View();
    }

    // POST: Batch/Enroll
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> EnrollUser(Guid batchId, Guid userId, string notes)
    {
        var batch = await _context.Batches.FindAsync(batchId);
        if (batch == null)
        {
            return Json(new { success = false, message = "Batch not found" });
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return Json(new { success = false, message = "User not found" });
        }

        // Check if user is already enrolled
        var existingEnrollment = await _context.Enrollments
            .FirstOrDefaultAsync(e => e.UserId == userId && e.BatchId == batchId);

        if (existingEnrollment != null)
        {
            return Json(new { success = false, message = "User is already enrolled in this batch" });
        }

        // Check batch capacity
        if (batch.CurrentEnrollment >= batch.MaxCapacity)
        {
            return Json(new { success = false, message = "Batch is at full capacity" });
        }

        var enrollment = new Enrollment
        {
            UserId = userId,
            BatchId = batchId,
            Notes = notes
        };

        _context.Enrollments.Add(enrollment);
        
        // Update batch enrollment count
        batch.CurrentEnrollment++;
        batch.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Json(new { success = true, message = "User enrolled successfully" });
    }

    // GET: Batch/Analytics/5
    public async Task<IActionResult> Analytics(Guid id)
    {
        var batch = await _context.Batches
            .Include(b => b.Trainer)
            .Include(b => b.Enrollments)
                .ThenInclude(e => e.User)
            .Include(b => b.Assessments)
                .ThenInclude(a => a.Results)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (batch == null)
        {
            return NotFound();
        }

        // Trigger background job to update batch statistics
        await _backgroundJobService.UpdateBatchStatistics(id);

        return View(batch);
    }

    // AJAX endpoints
    [HttpGet]
    public async Task<JsonResult> GetBatchStatistics(Guid id)
    {
        var batch = await _context.Batches
            .Include(b => b.Enrollments)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (batch == null)
        {
            return Json(new { success = false });
        }

        var activeEnrollments = batch.Enrollments.Count(e => e.Status == EnrollmentStatus.Active);
        var completedEnrollments = batch.Enrollments.Count(e => e.Status == EnrollmentStatus.Completed);
        var droppedEnrollments = batch.Enrollments.Count(e => e.Status == EnrollmentStatus.Dropped);

        var statistics = new
        {
            totalEnrollments = batch.Enrollments.Count,
            activeEnrollments,
            completedEnrollments,
            droppedEnrollments,
            completionRate = batch.CompletionRate,
            averageScore = batch.AverageScore,
            satisfactionRating = batch.SatisfactionRating
        };

        return Json(statistics);
    }

    [HttpPost]
    public async Task<JsonResult> UpdateBatchStatus(Guid id, BatchStatus status)
    {
        var batch = await _context.Batches.FindAsync(id);
        if (batch == null)
        {
            return Json(new { success = false, message = "Batch not found" });
        }

        batch.Status = status;
        batch.UpdatedAt = DateTime.UtcNow;

        // If batch is completed, send completion notifications
        if (status == BatchStatus.Completed)
        {
            await _backgroundJobService.SendBatchCompletionNotifications(id);
        }

        await _context.SaveChangesAsync();

        return Json(new { success = true, message = "Batch status updated successfully" });
    }

    [HttpGet]
    public async Task<JsonResult> GetEnrollmentProgress(Guid batchId, Guid userId)
    {
        var enrollment = await _context.Enrollments
            .Include(e => e.TopicProgresses)
                .ThenInclude(tp => tp.Topic)
            .FirstOrDefaultAsync(e => e.BatchId == batchId && e.UserId == userId);

        if (enrollment == null)
        {
            return Json(new { success = false });
        }

        var progress = enrollment.TopicProgresses.Select(tp => new
        {
            topicName = tp.Topic.Name,
            progressPercentage = tp.ProgressPercentage,
            status = tp.Status.ToString(),
            timeSpentInMinutes = tp.TimeSpentInMinutes,
            score = tp.Score
        }).ToList();

        return Json(new
        {
            success = true,
            overallProgress = enrollment.OverallProgress,
            averageScore = enrollment.AverageScore,
            topicProgress = progress
        });
    }
}
