using Microsoft.EntityFrameworkCore;
using SkillGuide.Api.Data;
using SkillGuide.Api.Services;
using Serilog;
using System.Text.Json.Serialization;
using Hangfire;
using Hangfire.SqlServer;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("logs/skillguide-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Add services to the container
builder.Services.AddControllersWithViews()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Add Razor runtime compilation for development
if (builder.Environment.IsDevelopment())
{
    builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
}

// Add Entity Framework
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<SkillGuideDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add Hangfire
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_180)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(connectionString, new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));

builder.Services.AddHangfireServer(options =>
{
    options.WorkerCount = Environment.ProcessorCount * 2;
});

// Register background job service
builder.Services.AddScoped<IBackgroundJobService, BackgroundJobService>();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:8080", "http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// Add API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() 
    { 
        Title = "SkillGuide API", 
        Version = "v1",
        Description = "A comprehensive learning management system API for skill development and training",
        Contact = new()
        {
            Name = "SkillGuide Support",
            Email = "support@skillguide.com"
        }
    });
    
    // Include XML comments if available
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
});

// Add Health Checks
builder.Services.AddHealthChecks()
    .AddDbContextCheck<SkillGuideDbContext>()
    .AddHangfire(options =>
    {
        options.MinimumAvailableServers = 1;
    });

// Add session and data protection for MVC
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddAntiforgery(options =>
{
    options.HeaderName = "RequestVerificationToken";
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkillGuide API V1");
        c.RoutePrefix = "swagger"; // Makes Swagger UI available at /swagger
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseCors("AllowFrontend");

app.UseSerilogRequestLogging();

app.UseRouting();

app.UseSession();

app.UseAuthorization();

// Add Hangfire Dashboard
app.UseHangfireDashboard("/hangfire", new DashboardOptions
{
    Authorization = new[] { new HangfireAuthorizationFilter() }
});

// Map MVC routes
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// Map API routes
app.MapControllers();

app.MapHealthChecks("/health");

// Seed database and schedule recurring jobs
if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<SkillGuideDbContext>();
    var backgroundJobService = scope.ServiceProvider.GetRequiredService<IBackgroundJobService>();
    
    try
    {
        // Ensure database is created
        await context.Database.EnsureCreatedAsync();
        
        // Add seed data if database is empty
        if (!await context.Users.AnyAsync())
        {
            await SeedDatabase(context);
        }

        // Schedule recurring background jobs
        ScheduleRecurringJobs();
    }
    catch (Exception ex)
    {
        Log.Error(ex, "An error occurred while seeding the database");
    }
}

app.Run();

// Custom Hangfire authorization filter
public class HangfireAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        // In production, add proper authentication/authorization
        return true;
    }
}

static void ScheduleRecurringJobs()
{
    // Schedule recurring jobs
    RecurringJob.AddOrUpdate<IBackgroundJobService>(
        "update-user-rankings",
        service => service.UpdateUserRankings(),
        Cron.Hourly);

    RecurringJob.AddOrUpdate<IBackgroundJobService>(
        "cleanup-old-logs",
        service => service.CleanupOldLogs(),
        Cron.Daily);

    RecurringJob.AddOrUpdate<IBackgroundJobService>(
        "send-daily-reports",
        service => service.SendDailyReports(),
        Cron.Daily(8)); // 8 AM daily

    RecurringJob.AddOrUpdate<IBackgroundJobService>(
        "update-skill-demand",
        service => service.UpdateSkillDemandData(),
        Cron.Weekly);

    RecurringJob.AddOrUpdate<IBackgroundJobService>(
        "archive-old-batches",
        service => service.ArchiveOldBatches(),
        Cron.Monthly);

    Log.Information("Recurring background jobs scheduled successfully");
}

static async Task SeedDatabase(SkillGuideDbContext context)
{
    // Seed Users
    var adminUser = new SkillGuide.Api.Models.User
    {
        Email = "admin@skillguide.com",
        Name = "System Administrator",
        Role = SkillGuide.Api.Models.UserRole.Admin,
        Department = "IT Administration",
        Permissions = new List<string> { "full_access", "manage_users", "system_settings" }
    };

    var trainerUser = new SkillGuide.Api.Models.User
    {
        Email = "trainer@skillguide.com",
        Name = "John Trainer",
        Role = SkillGuide.Api.Models.UserRole.Trainer,
        Department = "Training Department",
        Permissions = new List<string> { "view_students", "create_assessments", "grade_tests" }
    };

    var studentUser = new SkillGuide.Api.Models.User
    {
        Email = "student@skillguide.com",
        Name = "Jane Student",
        Role = SkillGuide.Api.Models.UserRole.User,
        Department = "Computer Science"
    };

    context.Users.AddRange(adminUser, trainerUser, studentUser);

    // Seed Courses
    var javaCourse = new SkillGuide.Api.Models.Course
    {
        Title = "Java Full Stack Development",
        Description = "Comprehensive Java development course covering backend and frontend technologies",
        DurationInWeeks = 16,
        Level = SkillGuide.Api.Models.CourseLevel.Intermediate,
        Prerequisites = new List<string> { "Basic Programming", "OOP Concepts" },
        LearningObjectives = new List<string> 
        { 
            "Master Java fundamentals",
            "Build REST APIs with Spring Boot",
            "Develop full-stack applications",
            "Implement microservices architecture"
        },
        TechnicalSkills = new List<string> { "Java", "Spring Boot", "React", "MySQL", "Docker" }
    };

    var dataScienceCourse = new SkillGuide.Api.Models.Course
    {
        Title = "Data Science & Analytics",
        Description = "Learn data science with Python, machine learning, and statistical analysis",
        DurationInWeeks = 12,
        Level = SkillGuide.Api.Models.CourseLevel.Advanced,
        Prerequisites = new List<string> { "Python Programming", "Statistics Basics" },
        LearningObjectives = new List<string>
        {
            "Master data analysis with Python",
            "Implement machine learning algorithms",
            "Create data visualizations",
            "Build predictive models"
        },
        TechnicalSkills = new List<string> { "Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib" }
    };

    context.Courses.AddRange(javaCourse, dataScienceCourse);

    // Seed Topics for Java Course
    var javaTopics = new[]
    {
        new SkillGuide.Api.Models.Topic
        {
            Name = "Java Fundamentals",
            Description = "Core Java concepts including syntax, OOP, and basic libraries",
            OrderIndex = 1,
            EstimatedHours = 40,
            CourseId = javaCourse.Id,
            KeyConcepts = new List<string> { "Variables", "Control Structures", "Classes", "Objects" },
            Resources = new List<string> { "Oracle Java Documentation", "Java Tutorial Videos" }
        },
        new SkillGuide.Api.Models.Topic
        {
            Name = "Spring Framework",
            Description = "Enterprise Java development with Spring ecosystem",
            OrderIndex = 2,
            EstimatedHours = 60,
            CourseId = javaCourse.Id,
            KeyConcepts = new List<string> { "Dependency Injection", "Spring Boot", "REST APIs" },
            Resources = new List<string> { "Spring Official Docs", "Spring Boot Tutorial" }
        },
        new SkillGuide.Api.Models.Topic
        {
            Name = "Microservices",
            Description = "Building distributed systems with microservices architecture",
            OrderIndex = 3,
            EstimatedHours = 50,
            CourseId = javaCourse.Id,
            KeyConcepts = new List<string> { "Service Discovery", "API Gateway", "Circuit Breaker" },
            Resources = new List<string> { "Microservices Patterns", "Spring Cloud Documentation" }
        }
    };

    context.Topics.AddRange(javaTopics);

    // Seed Batches
    var javaBatch = new SkillGuide.Api.Models.Batch
    {
        Name = "Java Batch 001",
        Description = "First cohort of Java Full Stack Development program",
        StartDate = DateTime.UtcNow.AddDays(-30),
        EndDate = DateTime.UtcNow.AddDays(90),
        MaxCapacity = 30,
        CurrentEnrollment = 1,
        Status = SkillGuide.Api.Models.BatchStatus.Active,
        TrainerId = trainerUser.Id,
        CompletionRate = 75.5m,
        AverageScore = 84.2m,
        SatisfactionRating = 4.6m
    };

    context.Batches.Add(javaBatch);

    // Create candidate profile for student
    var candidateProfile = new SkillGuide.Api.Models.CandidateProfile
    {
        UserId = studentUser.Id,
        Phone = "+1-555-0123",
        GitHubProfile = "https://github.com/janestudent",
        LinkedInProfile = "https://linkedin.com/in/janestudent",
        Skills = new List<string> { "Java", "JavaScript", "HTML", "CSS" },
        Certifications = new List<string> { "Oracle Java SE 8 Programmer" },
        Biography = "Passionate software developer interested in full-stack development",
        ProfileCompletionPercentage = 75,
        CurrentLevel = "Intermediate",
        NextMilestone = "Complete Spring Framework module",
        StudyStreak = 12,
        SkillPoints = 1250,
        Rank = 3,
        ConfidenceLevel = 0.82m,
        LearningVelocity = "Fast",
        PreferredLearningTime = "Morning",
        StrongSubjects = new List<string> { "Java", "Problem Solving" },
        ImprovementAreas = new List<string> { "Spring Framework", "Database Design" }
    };

    context.CandidateProfiles.Add(candidateProfile);

    // Seed Enrollment
    var enrollment = new SkillGuide.Api.Models.Enrollment
    {
        UserId = studentUser.Id,
        BatchId = javaBatch.Id,
        EnrollmentDate = DateTime.UtcNow.AddDays(-25),
        Status = SkillGuide.Api.Models.EnrollmentStatus.Active,
        OverallProgress = 65.5m,
        AverageScore = 87.3m
    };

    context.Enrollments.Add(enrollment);

    // Seed Achievements
    var achievements = new[]
    {
        new SkillGuide.Api.Models.Achievement
        {
            Title = "First Steps",
            Description = "Complete your first lesson",
            Type = SkillGuide.Api.Models.AchievementType.Completion,
            Rarity = SkillGuide.Api.Models.AchievementRarity.Common,
            PointsAwarded = 50,
            Icon = "👶",
            Criteria = new List<string> { "Complete any lesson" }
        },
        new SkillGuide.Api.Models.Achievement
        {
            Title = "Java Master",
            Description = "Score 95%+ on Java assessment",
            Type = SkillGuide.Api.Models.AchievementType.Score,
            Rarity = SkillGuide.Api.Models.AchievementRarity.Rare,
            PointsAwarded = 200,
            Icon = "🏆",
            Criteria = new List<string> { "Score >= 95% on Java assessment" }
        },
        new SkillGuide.Api.Models.Achievement
        {
            Title = "Week Warrior",
            Description = "Maintain 7-day learning streak",
            Type = SkillGuide.Api.Models.AchievementType.Streak,
            Rarity = SkillGuide.Api.Models.AchievementRarity.Uncommon,
            PointsAwarded = 100,
            Icon = "🔥",
            Criteria = new List<string> { "Study for 7 consecutive days" }
        }
    };

    context.Achievements.AddRange(achievements);

    await context.SaveChangesAsync();
    
    Log.Information("Database seeded successfully with sample data");
}
