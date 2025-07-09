-- SkillGuide Database Creation Script
-- This script creates the complete database schema for the SkillGuide Learning Management System

USE [master]
GO

-- Create database if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'SkillGuideDB')
BEGIN
    CREATE DATABASE [SkillGuideDB]
END
GO

USE [SkillGuideDB]
GO

-- Enable snapshot isolation for better concurrency
ALTER DATABASE [SkillGuideDB] SET ALLOW_SNAPSHOT_ISOLATION ON
GO
ALTER DATABASE [SkillGuideDB] SET READ_COMMITTED_SNAPSHOT ON
GO

-- Create schema for application tables
IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'skillguide')
BEGIN
    EXEC('CREATE SCHEMA [skillguide]')
END
GO

-- =============================================
-- Core User Management Tables
-- =============================================

-- Users table
CREATE TABLE [dbo].[Users] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Email] NVARCHAR(255) NOT NULL,
    [Name] NVARCHAR(100) NOT NULL,
    [Role] NVARCHAR(50) NOT NULL,
    [Avatar] NVARCHAR(MAX) NULL,
    [Department] NVARCHAR(100) NULL,
    [Permissions] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Users] PRIMARY KEY ([Id]),
    CONSTRAINT [UK_Users_Email] UNIQUE ([Email]),
    CONSTRAINT [CK_Users_Role] CHECK ([Role] IN ('User', 'Trainer', 'Admin'))
)
GO

-- CandidateProfiles table
CREATE TABLE [dbo].[CandidateProfiles] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Phone] NVARCHAR(20) NULL,
    [DateOfBirth] DATETIME2 NULL,
    [Address] NVARCHAR(500) NULL,
    [GitHubProfile] NVARCHAR(100) NULL,
    [LinkedInProfile] NVARCHAR(100) NULL,
    [Portfolio] NVARCHAR(100) NULL,
    [Skills] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [Certifications] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [Projects] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [Biography] NVARCHAR(500) NULL,
    [ProfileCompletionPercentage] INT NOT NULL DEFAULT 0,
    [CurrentLevel] NVARCHAR(MAX) NULL,
    [NextMilestone] NVARCHAR(MAX) NULL,
    [StudyStreak] INT NOT NULL DEFAULT 0,
    [SkillPoints] INT NOT NULL DEFAULT 0,
    [Rank] INT NOT NULL DEFAULT 0,
    [ConfidenceLevel] DECIMAL(3,2) NOT NULL DEFAULT 0,
    [LearningVelocity] NVARCHAR(MAX) NULL,
    [PreferredLearningTime] NVARCHAR(MAX) NULL,
    [StrongSubjects] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [ImprovementAreas] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_CandidateProfiles] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_CandidateProfiles_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_CandidateProfiles_ProfileCompletion] CHECK ([ProfileCompletionPercentage] >= 0 AND [ProfileCompletionPercentage] <= 100),
    CONSTRAINT [CK_CandidateProfiles_ConfidenceLevel] CHECK ([ConfidenceLevel] >= 0 AND [ConfidenceLevel] <= 1)
)
GO

-- =============================================
-- Course and Training Management Tables
-- =============================================

-- Courses table
CREATE TABLE [dbo].[Courses] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Title] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NULL,
    [DurationInWeeks] INT NOT NULL,
    [Level] NVARCHAR(50) NOT NULL,
    [Prerequisites] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [LearningObjectives] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [TechnicalSkills] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [IsActive] BIT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Courses] PRIMARY KEY ([Id]),
    CONSTRAINT [CK_Courses_Level] CHECK ([Level] IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    CONSTRAINT [CK_Courses_Duration] CHECK ([DurationInWeeks] > 0)
)
GO

-- Topics table
CREATE TABLE [dbo].[Topics] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Name] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NULL,
    [OrderIndex] INT NOT NULL,
    [EstimatedHours] INT NOT NULL,
    [CourseId] UNIQUEIDENTIFIER NOT NULL,
    [Resources] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [KeyConcepts] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [IsActive] BIT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Topics] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Topics_Courses] FOREIGN KEY ([CourseId]) REFERENCES [Courses]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_Topics_EstimatedHours] CHECK ([EstimatedHours] > 0)
)
GO

-- Batches table
CREATE TABLE [dbo].[Batches] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Name] NVARCHAR(100) NOT NULL,
    [Description] NVARCHAR(500) NULL,
    [StartDate] DATETIME2 NOT NULL,
    [EndDate] DATETIME2 NOT NULL,
    [MaxCapacity] INT NOT NULL,
    [CurrentEnrollment] INT NOT NULL DEFAULT 0,
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'Planned',
    [TrainerId] UNIQUEIDENTIFIER NOT NULL,
    [CompletionRate] DECIMAL(5,2) NOT NULL DEFAULT 0,
    [AverageScore] DECIMAL(5,2) NOT NULL DEFAULT 0,
    [SatisfactionRating] DECIMAL(3,2) NOT NULL DEFAULT 0,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Batches] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Batches_Trainers] FOREIGN KEY ([TrainerId]) REFERENCES [Users]([Id]),
    CONSTRAINT [CK_Batches_Status] CHECK ([Status] IN ('Planned', 'Active', 'Completed', 'Cancelled')),
    CONSTRAINT [CK_Batches_Capacity] CHECK ([MaxCapacity] > 0),
    CONSTRAINT [CK_Batches_Enrollment] CHECK ([CurrentEnrollment] >= 0 AND [CurrentEnrollment] <= [MaxCapacity]),
    CONSTRAINT [CK_Batches_Dates] CHECK ([EndDate] > [StartDate])
)
GO

-- BatchCourses junction table
CREATE TABLE [dbo].[BatchCourses] (
    [BatchId] UNIQUEIDENTIFIER NOT NULL,
    [CourseId] UNIQUEIDENTIFIER NOT NULL,
    
    CONSTRAINT [PK_BatchCourses] PRIMARY KEY ([BatchId], [CourseId]),
    CONSTRAINT [FK_BatchCourses_Batches] FOREIGN KEY ([BatchId]) REFERENCES [Batches]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_BatchCourses_Courses] FOREIGN KEY ([CourseId]) REFERENCES [Courses]([Id]) ON DELETE CASCADE
)
GO

-- Enrollments table
CREATE TABLE [dbo].[Enrollments] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [BatchId] UNIQUEIDENTIFIER NOT NULL,
    [EnrollmentDate] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'Active',
    [OverallProgress] DECIMAL(5,2) NOT NULL DEFAULT 0,
    [AverageScore] DECIMAL(5,2) NOT NULL DEFAULT 0,
    [CompletionDate] DATETIME2 NULL,
    [Notes] NVARCHAR(1000) NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Enrollments] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Enrollments_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Enrollments_Batches] FOREIGN KEY ([BatchId]) REFERENCES [Batches]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UK_Enrollments_UserBatch] UNIQUE ([UserId], [BatchId]),
    CONSTRAINT [CK_Enrollments_Status] CHECK ([Status] IN ('Active', 'Completed', 'Dropped', 'Suspended', 'OnHold')),
    CONSTRAINT [CK_Enrollments_Progress] CHECK ([OverallProgress] >= 0 AND [OverallProgress] <= 100)
)
GO

-- TopicProgress table
CREATE TABLE [dbo].[TopicProgress] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [EnrollmentId] UNIQUEIDENTIFIER NOT NULL,
    [TopicId] UNIQUEIDENTIFIER NOT NULL,
    [ProgressPercentage] DECIMAL(5,2) NOT NULL DEFAULT 0,
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'NotStarted',
    [Score] DECIMAL(5,2) NULL,
    [TimeSpentInMinutes] INT NOT NULL DEFAULT 0,
    [StartedAt] DATETIME2 NULL,
    [CompletedAt] DATETIME2 NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_TopicProgress] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_TopicProgress_Enrollments] FOREIGN KEY ([EnrollmentId]) REFERENCES [Enrollments]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_TopicProgress_Topics] FOREIGN KEY ([TopicId]) REFERENCES [Topics]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UK_TopicProgress_EnrollmentTopic] UNIQUE ([EnrollmentId], [TopicId]),
    CONSTRAINT [CK_TopicProgress_Status] CHECK ([Status] IN ('NotStarted', 'InProgress', 'Completed', 'Skipped')),
    CONSTRAINT [CK_TopicProgress_Percentage] CHECK ([ProgressPercentage] >= 0 AND [ProgressPercentage] <= 100)
)
GO

-- =============================================
-- Assessment System Tables
-- =============================================

-- Assessments table
CREATE TABLE [dbo].[Assessments] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Title] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NULL,
    [Type] NVARCHAR(50) NOT NULL,
    [DurationInMinutes] INT NOT NULL,
    [MaxScore] INT NOT NULL,
    [PassingScore] INT NOT NULL,
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'Draft',
    [StartDate] DATETIME2 NULL,
    [EndDate] DATETIME2 NULL,
    [CreatedById] UNIQUEIDENTIFIER NOT NULL,
    [CourseId] UNIQUEIDENTIFIER NULL,
    [TopicId] UNIQUEIDENTIFIER NULL,
    [BatchId] UNIQUEIDENTIFIER NULL,
    [IsRandomOrder] BIT NOT NULL DEFAULT 0,
    [MaxAttempts] INT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Assessments] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Assessments_CreatedBy] FOREIGN KEY ([CreatedById]) REFERENCES [Users]([Id]),
    CONSTRAINT [FK_Assessments_Courses] FOREIGN KEY ([CourseId]) REFERENCES [Courses]([Id]),
    CONSTRAINT [FK_Assessments_Topics] FOREIGN KEY ([TopicId]) REFERENCES [Topics]([Id]),
    CONSTRAINT [FK_Assessments_Batches] FOREIGN KEY ([BatchId]) REFERENCES [Batches]([Id]),
    CONSTRAINT [CK_Assessments_Type] CHECK ([Type] IN ('Quiz', 'Exam', 'Project', 'Practical', 'Assignment')),
    CONSTRAINT [CK_Assessments_Status] CHECK ([Status] IN ('Draft', 'Scheduled', 'Active', 'Completed', 'Archived')),
    CONSTRAINT [CK_Assessments_Duration] CHECK ([DurationInMinutes] > 0),
    CONSTRAINT [CK_Assessments_Score] CHECK ([MaxScore] > 0 AND [PassingScore] >= 0 AND [PassingScore] <= [MaxScore]),
    CONSTRAINT [CK_Assessments_Attempts] CHECK ([MaxAttempts] > 0),
    CONSTRAINT [CK_Assessments_Dates] CHECK ([StartDate] IS NULL OR [EndDate] IS NULL OR [EndDate] > [StartDate])
)
GO

-- Questions table
CREATE TABLE [dbo].[Questions] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Text] NVARCHAR(1000) NOT NULL,
    [Type] NVARCHAR(50) NOT NULL,
    [Points] INT NOT NULL,
    [AssessmentId] UNIQUEIDENTIFIER NOT NULL,
    [Options] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [CorrectAnswers] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [Explanation] NVARCHAR(2000) NULL,
    [OrderIndex] INT NOT NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Questions] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Questions_Assessments] FOREIGN KEY ([AssessmentId]) REFERENCES [Assessments]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_Questions_Type] CHECK ([Type] IN ('MultipleChoice', 'MultipleSelect', 'TrueFalse', 'ShortAnswer', 'Essay', 'Code', 'Practical')),
    CONSTRAINT [CK_Questions_Points] CHECK ([Points] > 0)
)
GO

-- AssessmentResults table
CREATE TABLE [dbo].[AssessmentResults] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [AssessmentId] UNIQUEIDENTIFIER NOT NULL,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Score] INT NOT NULL,
    [MaxPossibleScore] INT NOT NULL,
    [Percentage] AS (CASE WHEN [MaxPossibleScore] > 0 THEN ([Score] * 100.0 / [MaxPossibleScore]) ELSE 0 END) PERSISTED,
    [IsPassed] BIT NOT NULL,
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'InProgress',
    [StartedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [CompletedAt] DATETIME2 NULL,
    [TimeSpentInMinutes] INT NOT NULL DEFAULT 0,
    [AttemptNumber] INT NOT NULL DEFAULT 1,
    [Feedback] NVARCHAR(2000) NULL,
    [GradedById] UNIQUEIDENTIFIER NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_AssessmentResults] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AssessmentResults_Assessments] FOREIGN KEY ([AssessmentId]) REFERENCES [Assessments]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AssessmentResults_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AssessmentResults_GradedBy] FOREIGN KEY ([GradedById]) REFERENCES [Users]([Id]),
    CONSTRAINT [CK_AssessmentResults_Status] CHECK ([Status] IN ('InProgress', 'Submitted', 'Graded', 'Reviewed')),
    CONSTRAINT [CK_AssessmentResults_Score] CHECK ([Score] >= 0 AND [Score] <= [MaxPossibleScore]),
    CONSTRAINT [CK_AssessmentResults_Attempt] CHECK ([AttemptNumber] > 0)
)
GO

-- Answers table
CREATE TABLE [dbo].[Answers] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [QuestionId] UNIQUEIDENTIFIER NOT NULL,
    [AssessmentResultId] UNIQUEIDENTIFIER NOT NULL,
    [SelectedOptions] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [TextAnswer] NVARCHAR(5000) NULL,
    [IsCorrect] BIT NOT NULL DEFAULT 0,
    [PointsAwarded] INT NOT NULL DEFAULT 0,
    [GraderFeedback] NVARCHAR(1000) NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Answers] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Answers_Questions] FOREIGN KEY ([QuestionId]) REFERENCES [Questions]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_Answers_AssessmentResults] FOREIGN KEY ([AssessmentResultId]) REFERENCES [AssessmentResults]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_Answers_Points] CHECK ([PointsAwarded] >= 0)
)
GO

-- =============================================
-- Achievement System Tables
-- =============================================

-- Achievements table
CREATE TABLE [dbo].[Achievements] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Title] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NOT NULL,
    [Type] NVARCHAR(50) NOT NULL,
    [Rarity] NVARCHAR(50) NOT NULL,
    [Icon] NVARCHAR(100) NULL,
    [PointsAwarded] INT NOT NULL DEFAULT 0,
    [Criteria] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [IsActive] BIT NOT NULL DEFAULT 1,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Achievements] PRIMARY KEY ([Id]),
    CONSTRAINT [CK_Achievements_Type] CHECK ([Type] IN ('Score', 'Streak', 'Speed', 'Completion', 'Participation', 'Special')),
    CONSTRAINT [CK_Achievements_Rarity] CHECK ([Rarity] IN ('Common', 'Uncommon', 'Rare', 'Epic', 'Legendary')),
    CONSTRAINT [CK_Achievements_Points] CHECK ([PointsAwarded] >= 0)
)
GO

-- UserAchievements table
CREATE TABLE [dbo].[UserAchievements] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [AchievementId] UNIQUEIDENTIFIER NOT NULL,
    [EarnedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [Notes] NVARCHAR(500) NULL,
    
    CONSTRAINT [PK_UserAchievements] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserAchievements_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_UserAchievements_Achievements] FOREIGN KEY ([AchievementId]) REFERENCES [Achievements]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UK_UserAchievements_UserAchievement] UNIQUE ([UserId], [AchievementId])
)
GO

-- =============================================
-- Activity and Scheduling Tables
-- =============================================

-- UserActivities table
CREATE TABLE [dbo].[UserActivities] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Type] NVARCHAR(50) NOT NULL,
    [Title] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NULL,
    [RelatedEntityId] UNIQUEIDENTIFIER NULL,
    [RelatedEntityType] NVARCHAR(50) NULL,
    [Score] DECIMAL(5,2) NULL,
    [Status] NVARCHAR(50) NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_UserActivities] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_UserActivities_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [CK_UserActivities_Type] CHECK ([Type] IN ('Assessment', 'Submission', 'Completion', 'Registration', 'Achievement', 'Login', 'CourseStart', 'TopicComplete'))
)
GO

-- Schedules table
CREATE TABLE [dbo].[Schedules] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [Title] NVARCHAR(200) NOT NULL,
    [Description] NVARCHAR(1000) NULL,
    [Type] NVARCHAR(50) NOT NULL,
    [StartDateTime] DATETIME2 NOT NULL,
    [EndDateTime] DATETIME2 NOT NULL,
    [BatchId] UNIQUEIDENTIFIER NULL,
    [AssessmentId] UNIQUEIDENTIFIER NULL,
    [CreatedById] UNIQUEIDENTIFIER NULL,
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'Scheduled',
    [Location] NVARCHAR(200) NULL,
    [MeetingLink] NVARCHAR(500) NULL,
    [RequiredMaterials] NVARCHAR(MAX) NOT NULL DEFAULT '[]',
    [MaxParticipants] INT NULL,
    [CreatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [UpdatedAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    
    CONSTRAINT [PK_Schedules] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Schedules_Batches] FOREIGN KEY ([BatchId]) REFERENCES [Batches]([Id]),
    CONSTRAINT [FK_Schedules_Assessments] FOREIGN KEY ([AssessmentId]) REFERENCES [Assessments]([Id]),
    CONSTRAINT [FK_Schedules_CreatedBy] FOREIGN KEY ([CreatedById]) REFERENCES [Users]([Id]),
    CONSTRAINT [CK_Schedules_Type] CHECK ([Type] IN ('Lecture', 'Workshop', 'Assessment', 'Project', 'Review', 'Interview', 'Meeting', 'Practice')),
    CONSTRAINT [CK_Schedules_Status] CHECK ([Status] IN ('Scheduled', 'InProgress', 'Completed', 'Cancelled', 'Postponed')),
    CONSTRAINT [CK_Schedules_DateTime] CHECK ([EndDateTime] > [StartDateTime]),
    CONSTRAINT [CK_Schedules_MaxParticipants] CHECK ([MaxParticipants] IS NULL OR [MaxParticipants] > 0)
)
GO

-- ScheduleParticipants table
CREATE TABLE [dbo].[ScheduleParticipants] (
    [Id] UNIQUEIDENTIFIER NOT NULL DEFAULT NEWID(),
    [ScheduleId] UNIQUEIDENTIFIER NOT NULL,
    [UserId] UNIQUEIDENTIFIER NOT NULL,
    [Status] NVARCHAR(50) NOT NULL DEFAULT 'Registered',
    [RegisteredAt] DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    [Notes] NVARCHAR(500) NULL,
    
    CONSTRAINT [PK_ScheduleParticipants] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_ScheduleParticipants_Schedules] FOREIGN KEY ([ScheduleId]) REFERENCES [Schedules]([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_ScheduleParticipants_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([Id]) ON DELETE CASCADE,
    CONSTRAINT [UK_ScheduleParticipants_ScheduleUser] UNIQUE ([ScheduleId], [UserId]),
    CONSTRAINT [CK_ScheduleParticipants_Status] CHECK ([Status] IN ('Registered', 'Confirmed', 'Attended', 'Absent', 'Cancelled'))
)
GO

-- =============================================
-- Additional Indexes for Performance
-- =============================================

-- Performance indexes
CREATE NONCLUSTERED INDEX [IX_UserActivities_CreatedAt] ON [dbo].[UserActivities] ([CreatedAt] DESC)
GO

CREATE NONCLUSTERED INDEX [IX_AssessmentResults_UserId_AssessmentId] ON [dbo].[AssessmentResults] ([UserId], [AssessmentId])
GO

CREATE NONCLUSTERED INDEX [IX_Assessments_Status_Type] ON [dbo].[Assessments] ([Status], [Type])
GO

CREATE NONCLUSTERED INDEX [IX_Batches_Status_StartDate] ON [dbo].[Batches] ([Status], [StartDate])
GO

CREATE NONCLUSTERED INDEX [IX_Enrollments_Status_BatchId] ON [dbo].[Enrollments] ([Status], [BatchId])
GO

CREATE NONCLUSTERED INDEX [IX_Topics_CourseId_OrderIndex] ON [dbo].[Topics] ([CourseId], [OrderIndex])
GO

CREATE NONCLUSTERED INDEX [IX_Questions_AssessmentId_OrderIndex] ON [dbo].[Questions] ([AssessmentId], [OrderIndex])
GO

-- =============================================
-- Update Triggers for UpdatedAt columns
-- =============================================

-- Users update trigger
CREATE TRIGGER [tr_Users_UpdatedAt] ON [dbo].[Users]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Users] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Users] u
    INNER JOIN inserted i ON u.[Id] = i.[Id]
END
GO

-- CandidateProfiles update trigger
CREATE TRIGGER [tr_CandidateProfiles_UpdatedAt] ON [dbo].[CandidateProfiles]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[CandidateProfiles] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[CandidateProfiles] cp
    INNER JOIN inserted i ON cp.[Id] = i.[Id]
END
GO

-- Courses update trigger
CREATE TRIGGER [tr_Courses_UpdatedAt] ON [dbo].[Courses]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Courses] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Courses] c
    INNER JOIN inserted i ON c.[Id] = i.[Id]
END
GO

-- Topics update trigger
CREATE TRIGGER [tr_Topics_UpdatedAt] ON [dbo].[Topics]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Topics] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Topics] t
    INNER JOIN inserted i ON t.[Id] = i.[Id]
END
GO

-- Batches update trigger
CREATE TRIGGER [tr_Batches_UpdatedAt] ON [dbo].[Batches]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Batches] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Batches] b
    INNER JOIN inserted i ON b.[Id] = i.[Id]
END
GO

-- Enrollments update trigger
CREATE TRIGGER [tr_Enrollments_UpdatedAt] ON [dbo].[Enrollments]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Enrollments] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Enrollments] e
    INNER JOIN inserted i ON e.[Id] = i.[Id]
END
GO

-- TopicProgress update trigger
CREATE TRIGGER [tr_TopicProgress_UpdatedAt] ON [dbo].[TopicProgress]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[TopicProgress] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[TopicProgress] tp
    INNER JOIN inserted i ON tp.[Id] = i.[Id]
END
GO

-- Assessments update trigger
CREATE TRIGGER [tr_Assessments_UpdatedAt] ON [dbo].[Assessments]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Assessments] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Assessments] a
    INNER JOIN inserted i ON a.[Id] = i.[Id]
END
GO

-- Questions update trigger
CREATE TRIGGER [tr_Questions_UpdatedAt] ON [dbo].[Questions]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Questions] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Questions] q
    INNER JOIN inserted i ON q.[Id] = i.[Id]
END
GO

-- AssessmentResults update trigger
CREATE TRIGGER [tr_AssessmentResults_UpdatedAt] ON [dbo].[AssessmentResults]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[AssessmentResults] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[AssessmentResults] ar
    INNER JOIN inserted i ON ar.[Id] = i.[Id]
END
GO

-- Answers update trigger
CREATE TRIGGER [tr_Answers_UpdatedAt] ON [dbo].[Answers]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Answers] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Answers] a
    INNER JOIN inserted i ON a.[Id] = i.[Id]
END
GO

-- Schedules update trigger
CREATE TRIGGER [tr_Schedules_UpdatedAt] ON [dbo].[Schedules]
    AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE [dbo].[Schedules] 
    SET [UpdatedAt] = GETUTCDATE()
    FROM [dbo].[Schedules] s
    INNER JOIN inserted i ON s.[Id] = i.[Id]
END
GO

PRINT 'SkillGuide database schema created successfully!'
PRINT 'Tables created: Users, CandidateProfiles, Courses, Topics, Batches, Enrollments, TopicProgress, Assessments, Questions, AssessmentResults, Answers, Achievements, UserAchievements, UserActivities, Schedules, ScheduleParticipants'
PRINT 'Indexes and triggers have been applied for optimal performance.'
PRINT ''
PRINT 'Next steps:'
PRINT '1. Update connection string in appsettings.json'
PRINT '2. Run Entity Framework migrations: dotnet ef database update'
PRINT '3. Start the application to seed initial data'
GO
