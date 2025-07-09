using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.DTOs;
using SkillGuide.Api.Models;

namespace SkillGuide.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BatchesController : ControllerBase
{
    private readonly SkillGuideDbContext _context;

    public BatchesController(SkillGuideDbContext context)
    {
        _context = context;
    }

    // GET: api/batches
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BatchDto>>> GetBatches()
    {
        var batches = await _context.Batches
            .Include(b => b.Trainer)
            .Include(b => b.Courses)
            .Include(b => b.Enrollments)
                .ThenInclude(e => e.User)
            .Select(b => new BatchDto
            {
                Id = b.Id,
                Name = b.Name,
                Description = b.Description,
                StartDate = b.StartDate,
                EndDate = b.EndDate,
                MaxCapacity = b.MaxCapacity,
                CurrentEnrollment = b.CurrentEnrollment,
                Status = b.Status,
                TrainerId = b.TrainerId,
                TrainerName = b.Trainer.Name,
                CompletionRate = b.CompletionRate,
                AverageScore = b.AverageScore,
                SatisfactionRating = b.SatisfactionRating,
                CreatedAt = b.CreatedAt,
                Courses = b.Courses.Select(c => new CourseDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    DurationInWeeks = c.DurationInWeeks,
                    Level = c.Level,
                    Prerequisites = c.Prerequisites,
                    LearningObjectives = c.LearningObjectives,
                    TechnicalSkills = c.TechnicalSkills,
                    IsActive = c.IsActive,
                    CreatedAt = c.CreatedAt
                }).ToList(),
                Enrollments = b.Enrollments.Select(e => new EnrollmentDto
                {
                    Id = e.Id,
                    UserId = e.UserId,
                    UserName = e.User.Name,
                    UserEmail = e.User.Email,
                    BatchId = e.BatchId,
                    BatchName = b.Name,
                    EnrollmentDate = e.EnrollmentDate,
                    Status = e.Status,
                    OverallProgress = e.OverallProgress,
                    AverageScore = e.AverageScore,
                    CompletionDate = e.CompletionDate,
                    Notes = e.Notes
                }).ToList()
            })
            .ToListAsync();

        return Ok(batches);
    }

    // GET: api/batches/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<BatchDto>> GetBatch(Guid id)
    {
        var batch = await _context.Batches
            .Include(b => b.Trainer)
            .Include(b => b.Courses)
            .Include(b => b.Enrollments)
                .ThenInclude(e => e.User)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (batch == null)
        {
            return NotFound();
        }

        var batchDto = new BatchDto
        {
            Id = batch.Id,
            Name = batch.Name,
            Description = batch.Description,
            StartDate = batch.StartDate,
            EndDate = batch.EndDate,
            MaxCapacity = batch.MaxCapacity,
            CurrentEnrollment = batch.CurrentEnrollment,
            Status = batch.Status,
            TrainerId = batch.TrainerId,
            TrainerName = batch.Trainer.Name,
            CompletionRate = batch.CompletionRate,
            AverageScore = batch.AverageScore,
            SatisfactionRating = batch.SatisfactionRating,
            CreatedAt = batch.CreatedAt,
            Courses = batch.Courses.Select(c => new CourseDto
            {
                Id = c.Id,
                Title = c.Title,
                Description = c.Description,
                DurationInWeeks = c.DurationInWeeks,
                Level = c.Level,
                Prerequisites = c.Prerequisites,
                LearningObjectives = c.LearningObjectives,
                TechnicalSkills = c.TechnicalSkills,
                IsActive = c.IsActive,
                CreatedAt = c.CreatedAt
            }).ToList(),
            Enrollments = batch.Enrollments.Select(e => new EnrollmentDto
            {
                Id = e.Id,
                UserId = e.UserId,
                UserName = e.User.Name,
                UserEmail = e.User.Email,
                BatchId = e.BatchId,
                BatchName = batch.Name,
                EnrollmentDate = e.EnrollmentDate,
                Status = e.Status,
                OverallProgress = e.OverallProgress,
                AverageScore = e.AverageScore,
                CompletionDate = e.CompletionDate,
                Notes = e.Notes
            }).ToList()
        };

        return Ok(batchDto);
    }

    // POST: api/batches
    [HttpPost]
    public async Task<ActionResult<BatchDto>> CreateBatch(CreateBatchDto createBatchDto)
    {
        var batch = new Batch
        {
            Name = createBatchDto.Name,
            Description = createBatchDto.Description,
            StartDate = createBatchDto.StartDate,
            EndDate = createBatchDto.EndDate,
            MaxCapacity = createBatchDto.MaxCapacity,
            TrainerId = createBatchDto.TrainerId
        };

        _context.Batches.Add(batch);

        // Add courses to batch
        if (createBatchDto.CourseIds.Any())
        {
            var courses = await _context.Courses
                .Where(c => createBatchDto.CourseIds.Contains(c.Id))
                .ToListAsync();
            
            foreach (var course in courses)
            {
                batch.Courses.Add(course);
            }
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBatch), new { id = batch.Id }, batch.Id);
    }

    // PUT: api/batches/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateBatch(Guid id, UpdateBatchDto updateBatchDto)
    {
        var batch = await _context.Batches.FindAsync(id);
        if (batch == null)
        {
            return NotFound();
        }

        if (!string.IsNullOrWhiteSpace(updateBatchDto.Name))
            batch.Name = updateBatchDto.Name;
        
        if (updateBatchDto.Description != null)
            batch.Description = updateBatchDto.Description;
        
        if (updateBatchDto.StartDate.HasValue)
            batch.StartDate = updateBatchDto.StartDate.Value;
        
        if (updateBatchDto.EndDate.HasValue)
            batch.EndDate = updateBatchDto.EndDate.Value;
        
        if (updateBatchDto.MaxCapacity.HasValue)
            batch.MaxCapacity = updateBatchDto.MaxCapacity.Value;
        
        if (updateBatchDto.Status.HasValue)
            batch.Status = updateBatchDto.Status.Value;
        
        if (updateBatchDto.TrainerId.HasValue)
            batch.TrainerId = updateBatchDto.TrainerId.Value;

        batch.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BatchExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // POST: api/batches/{id}/enroll
    [HttpPost("{id}/enroll")]
    public async Task<ActionResult<EnrollmentDto>> EnrollUser(Guid id, CreateEnrollmentDto enrollmentDto)
    {
        var batch = await _context.Batches.FindAsync(id);
        if (batch == null)
        {
            return NotFound("Batch not found");
        }

        var user = await _context.Users.FindAsync(enrollmentDto.UserId);
        if (user == null)
        {
            return NotFound("User not found");
        }

        // Check if user is already enrolled
        var existingEnrollment = await _context.Enrollments
            .FirstOrDefaultAsync(e => e.UserId == enrollmentDto.UserId && e.BatchId == id);
        
        if (existingEnrollment != null)
        {
            return Conflict("User is already enrolled in this batch");
        }

        // Check batch capacity
        if (batch.CurrentEnrollment >= batch.MaxCapacity)
        {
            return BadRequest("Batch is at full capacity");
        }

        var enrollment = new Enrollment
        {
            UserId = enrollmentDto.UserId,
            BatchId = id,
            Notes = enrollmentDto.Notes
        };

        _context.Enrollments.Add(enrollment);
        
        // Update batch enrollment count
        batch.CurrentEnrollment++;
        batch.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        var enrollmentResponse = new EnrollmentDto
        {
            Id = enrollment.Id,
            UserId = enrollment.UserId,
            UserName = user.Name,
            UserEmail = user.Email,
            BatchId = enrollment.BatchId,
            BatchName = batch.Name,
            EnrollmentDate = enrollment.EnrollmentDate,
            Status = enrollment.Status,
            OverallProgress = enrollment.OverallProgress,
            AverageScore = enrollment.AverageScore,
            CompletionDate = enrollment.CompletionDate,
            Notes = enrollment.Notes
        };

        return CreatedAtAction(nameof(GetEnrollment), new { batchId = id, enrollmentId = enrollment.Id }, enrollmentResponse);
    }

    // GET: api/batches/{id}/enrollments/{enrollmentId}
    [HttpGet("{id}/enrollments/{enrollmentId}")]
    public async Task<ActionResult<EnrollmentDto>> GetEnrollment(Guid id, Guid enrollmentId)
    {
        var enrollment = await _context.Enrollments
            .Include(e => e.User)
            .Include(e => e.Batch)
            .Include(e => e.TopicProgresses)
                .ThenInclude(tp => tp.Topic)
            .FirstOrDefaultAsync(e => e.Id == enrollmentId && e.BatchId == id);

        if (enrollment == null)
        {
            return NotFound();
        }

        var enrollmentDto = new EnrollmentDto
        {
            Id = enrollment.Id,
            UserId = enrollment.UserId,
            UserName = enrollment.User.Name,
            UserEmail = enrollment.User.Email,
            BatchId = enrollment.BatchId,
            BatchName = enrollment.Batch.Name,
            EnrollmentDate = enrollment.EnrollmentDate,
            Status = enrollment.Status,
            OverallProgress = enrollment.OverallProgress,
            AverageScore = enrollment.AverageScore,
            CompletionDate = enrollment.CompletionDate,
            Notes = enrollment.Notes,
            TopicProgresses = enrollment.TopicProgresses.Select(tp => new TopicProgressDto
            {
                Id = tp.Id,
                TopicId = tp.TopicId,
                TopicName = tp.Topic.Name,
                ProgressPercentage = tp.ProgressPercentage,
                Status = tp.Status,
                Score = tp.Score,
                TimeSpentInMinutes = tp.TimeSpentInMinutes,
                StartedAt = tp.StartedAt,
                CompletedAt = tp.CompletedAt
            }).ToList()
        };

        return Ok(enrollmentDto);
    }

    // DELETE: api/batches/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBatch(Guid id)
    {
        var batch = await _context.Batches.FindAsync(id);
        if (batch == null)
        {
            return NotFound();
        }

        _context.Batches.Remove(batch);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BatchExists(Guid id)
    {
        return _context.Batches.Any(e => e.Id == id);
    }
}
