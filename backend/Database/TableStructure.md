# SkillGuide Database Table Structure

This document describes the database schema for the SkillGuide Learning Management System.

## Database Overview

The SkillGuide database consists of 14 main tables that manage users, courses, assessments, and analytics. The database is designed to support a comprehensive learning management system with advanced features like progress tracking, achievements, and background job processing.

## Core Tables

### 1. Users

**Purpose**: Store user account information for all user types (students, trainers, admins)

| Column      | Type             | Constraints           | Description                      |
| ----------- | ---------------- | --------------------- | -------------------------------- |
| Id          | uniqueidentifier | PRIMARY KEY, NOT NULL | Unique user identifier           |
| Email       | nvarchar(255)    | NOT NULL, UNIQUE      | User's email address             |
| Name        | nvarchar(100)    | NOT NULL              | User's full name                 |
| Role        | nvarchar(50)     | NOT NULL              | User role (User, Trainer, Admin) |
| Avatar      | nvarchar(max)    | NULL                  | URL to user's profile picture    |
| Department  | nvarchar(100)    | NULL                  | User's department                |
| Permissions | nvarchar(max)    | NOT NULL              | JSON array of user permissions   |
| CreatedAt   | datetime2        | NOT NULL              | Account creation timestamp       |
| UpdatedAt   | datetime2        | NOT NULL              | Last update timestamp            |

### 2. CandidateProfiles

**Purpose**: Extended profile information for student users

| Column                      | Type             | Constraints           | Description                       |
| --------------------------- | ---------------- | --------------------- | --------------------------------- |
| Id                          | uniqueidentifier | PRIMARY KEY, NOT NULL | Profile identifier                |
| UserId                      | uniqueidentifier | NOT NULL, FK to Users | Reference to user account         |
| Phone                       | nvarchar(20)     | NULL                  | Phone number                      |
| DateOfBirth                 | datetime2        | NULL                  | Date of birth                     |
| Address                     | nvarchar(500)    | NULL                  | Physical address                  |
| GitHubProfile               | nvarchar(100)    | NULL                  | GitHub profile URL                |
| LinkedInProfile             | nvarchar(100)    | NULL                  | LinkedIn profile URL              |
| Portfolio                   | nvarchar(100)    | NULL                  | Portfolio website URL             |
| Skills                      | nvarchar(max)    | NOT NULL              | JSON array of skills              |
| Certifications              | nvarchar(max)    | NOT NULL              | JSON array of certifications      |
| Projects                    | nvarchar(max)    | NOT NULL              | JSON array of projects            |
| Biography                   | nvarchar(500)    | NULL                  | Personal biography                |
| ProfileCompletionPercentage | int              | NOT NULL, DEFAULT 0   | Profile completion percentage     |
| CurrentLevel                | nvarchar(max)    | NULL                  | Current skill level               |
| NextMilestone               | nvarchar(max)    | NULL                  | Next learning milestone           |
| StudyStreak                 | int              | NOT NULL, DEFAULT 0   | Consecutive study days            |
| SkillPoints                 | int              | NOT NULL, DEFAULT 0   | Total skill points earned         |
| Rank                        | int              | NOT NULL, DEFAULT 0   | User's rank among peers           |
| ConfidenceLevel             | decimal(3,2)     | NOT NULL, DEFAULT 0   | AI-calculated confidence (0-1)    |
| LearningVelocity            | nvarchar(max)    | NULL                  | Learning speed (Slow/Medium/Fast) |
| PreferredLearningTime       | nvarchar(max)    | NULL                  | Preferred learning time           |
| StrongSubjects              | nvarchar(max)    | NOT NULL              | JSON array of strong subjects     |
| ImprovementAreas            | nvarchar(max)    | NOT NULL              | JSON array of areas to improve    |
| CreatedAt                   | datetime2        | NOT NULL              | Creation timestamp                |
| UpdatedAt                   | datetime2        | NOT NULL              | Last update timestamp             |

### 3. Courses

**Purpose**: Define training courses and their curriculum

| Column             | Type             | Constraints           | Description                       |
| ------------------ | ---------------- | --------------------- | --------------------------------- |
| Id                 | uniqueidentifier | PRIMARY KEY, NOT NULL | Course identifier                 |
| Title              | nvarchar(200)    | NOT NULL              | Course title                      |
| Description        | nvarchar(1000)   | NULL                  | Course description                |
| DurationInWeeks    | int              | NOT NULL              | Course duration                   |
| Level              | nvarchar(50)     | NOT NULL              | Difficulty level                  |
| Prerequisites      | nvarchar(max)    | NOT NULL              | JSON array of prerequisites       |
| LearningObjectives | nvarchar(max)    | NOT NULL              | JSON array of learning objectives |
| TechnicalSkills    | nvarchar(max)    | NOT NULL              | JSON array of technical skills    |
| IsActive           | bit              | NOT NULL, DEFAULT 1   | Course active status              |
| CreatedAt          | datetime2        | NOT NULL              | Creation timestamp                |
| UpdatedAt          | datetime2        | NOT NULL              | Last update timestamp             |

### 4. Topics

**Purpose**: Individual topics within courses

| Column         | Type             | Constraints             | Description                      |
| -------------- | ---------------- | ----------------------- | -------------------------------- |
| Id             | uniqueidentifier | PRIMARY KEY, NOT NULL   | Topic identifier                 |
| Name           | nvarchar(200)    | NOT NULL                | Topic name                       |
| Description    | nvarchar(1000)   | NULL                    | Topic description                |
| OrderIndex     | int              | NOT NULL                | Display order within course      |
| EstimatedHours | int              | NOT NULL                | Estimated completion time        |
| CourseId       | uniqueidentifier | NOT NULL, FK to Courses | Parent course                    |
| Resources      | nvarchar(max)    | NOT NULL                | JSON array of learning resources |
| KeyConcepts    | nvarchar(max)    | NOT NULL                | JSON array of key concepts       |
| IsActive       | bit              | NOT NULL, DEFAULT 1     | Topic active status              |
| CreatedAt      | datetime2        | NOT NULL                | Creation timestamp               |
| UpdatedAt      | datetime2        | NOT NULL                | Last update timestamp            |

### 5. Batches

**Purpose**: Training batch management

| Column             | Type             | Constraints                 | Description                 |
| ------------------ | ---------------- | --------------------------- | --------------------------- |
| Id                 | uniqueidentifier | PRIMARY KEY, NOT NULL       | Batch identifier            |
| Name               | nvarchar(100)    | NOT NULL                    | Batch name                  |
| Description        | nvarchar(500)    | NULL                        | Batch description           |
| StartDate          | datetime2        | NOT NULL                    | Batch start date            |
| EndDate            | datetime2        | NOT NULL                    | Batch end date              |
| MaxCapacity        | int              | NOT NULL                    | Maximum enrollment capacity |
| CurrentEnrollment  | int              | NOT NULL, DEFAULT 0         | Current enrollment count    |
| Status             | nvarchar(50)     | NOT NULL, DEFAULT 'Planned' | Batch status                |
| TrainerId          | uniqueidentifier | NOT NULL, FK to Users       | Assigned trainer            |
| CompletionRate     | decimal(5,2)     | NOT NULL, DEFAULT 0         | Batch completion rate       |
| AverageScore       | decimal(5,2)     | NOT NULL, DEFAULT 0         | Average assessment score    |
| SatisfactionRating | decimal(3,2)     | NOT NULL, DEFAULT 0         | Student satisfaction rating |
| CreatedAt          | datetime2        | NOT NULL                    | Creation timestamp          |
| UpdatedAt          | datetime2        | NOT NULL                    | Last update timestamp       |

### 6. Enrollments

**Purpose**: Track student enrollment in batches

| Column          | Type             | Constraints                    | Description                    |
| --------------- | ---------------- | ------------------------------ | ------------------------------ |
| Id              | uniqueidentifier | PRIMARY KEY, NOT NULL          | Enrollment identifier          |
| UserId          | uniqueidentifier | NOT NULL, FK to Users          | Enrolled student               |
| BatchId         | uniqueidentifier | NOT NULL, FK to Batches        | Target batch                   |
| EnrollmentDate  | datetime2        | NOT NULL, DEFAULT GETUTCDATE() | Enrollment date                |
| Status          | nvarchar(50)     | NOT NULL, DEFAULT 'Active'     | Enrollment status              |
| OverallProgress | decimal(5,2)     | NOT NULL, DEFAULT 0            | Overall progress percentage    |
| AverageScore    | decimal(5,2)     | NOT NULL, DEFAULT 0            | Average assessment score       |
| CompletionDate  | datetime2        | NULL                           | Completion date (if completed) |
| Notes           | nvarchar(1000)   | NULL                           | Additional notes               |
| CreatedAt       | datetime2        | NOT NULL                       | Creation timestamp             |
| UpdatedAt       | datetime2        | NOT NULL                       | Last update timestamp          |

**Indexes**:

- UNIQUE INDEX on (UserId, BatchId)

### 7. TopicProgress

**Purpose**: Track individual topic completion progress

| Column             | Type             | Constraints                    | Description            |
| ------------------ | ---------------- | ------------------------------ | ---------------------- |
| Id                 | uniqueidentifier | PRIMARY KEY, NOT NULL          | Progress identifier    |
| EnrollmentId       | uniqueidentifier | NOT NULL, FK to Enrollments    | Related enrollment     |
| TopicId            | uniqueidentifier | NOT NULL, FK to Topics         | Target topic           |
| ProgressPercentage | decimal(5,2)     | NOT NULL, DEFAULT 0            | Progress percentage    |
| Status             | nvarchar(50)     | NOT NULL, DEFAULT 'NotStarted' | Topic status           |
| Score              | decimal(5,2)     | NULL                           | Topic assessment score |
| TimeSpentInMinutes | int              | NOT NULL, DEFAULT 0            | Time spent studying    |
| StartedAt          | datetime2        | NULL                           | Topic start date       |
| CompletedAt        | datetime2        | NULL                           | Topic completion date  |
| CreatedAt          | datetime2        | NOT NULL                       | Creation timestamp     |
| UpdatedAt          | datetime2        | NOT NULL                       | Last update timestamp  |

**Indexes**:

- UNIQUE INDEX on (EnrollmentId, TopicId)

## Assessment System Tables

### 8. Assessments

**Purpose**: Define assessments, quizzes, and exams

| Column            | Type             | Constraints               | Description              |
| ----------------- | ---------------- | ------------------------- | ------------------------ |
| Id                | uniqueidentifier | PRIMARY KEY, NOT NULL     | Assessment identifier    |
| Title             | nvarchar(200)    | NOT NULL                  | Assessment title         |
| Description       | nvarchar(1000)   | NULL                      | Assessment description   |
| Type              | nvarchar(50)     | NOT NULL                  | Assessment type          |
| DurationInMinutes | int              | NOT NULL                  | Time limit               |
| MaxScore          | int              | NOT NULL                  | Maximum possible score   |
| PassingScore      | int              | NOT NULL                  | Minimum passing score    |
| Status            | nvarchar(50)     | NOT NULL, DEFAULT 'Draft' | Assessment status        |
| StartDate         | datetime2        | NULL                      | Available start date     |
| EndDate           | datetime2        | NULL                      | Available end date       |
| CreatedById       | uniqueidentifier | NOT NULL, FK to Users     | Creator                  |
| CourseId          | uniqueidentifier | NULL, FK to Courses       | Related course           |
| TopicId           | uniqueidentifier | NULL, FK to Topics        | Related topic            |
| BatchId           | uniqueidentifier | NULL, FK to Batches       | Related batch            |
| IsRandomOrder     | bit              | NOT NULL, DEFAULT 0       | Randomize question order |
| MaxAttempts       | int              | NOT NULL, DEFAULT 1       | Maximum attempts allowed |
| CreatedAt         | datetime2        | NOT NULL                  | Creation timestamp       |
| UpdatedAt         | datetime2        | NOT NULL                  | Last update timestamp    |

### 9. Questions

**Purpose**: Individual questions within assessments

| Column         | Type             | Constraints                 | Description                   |
| -------------- | ---------------- | --------------------------- | ----------------------------- |
| Id             | uniqueidentifier | PRIMARY KEY, NOT NULL       | Question identifier           |
| Text           | nvarchar(1000)   | NOT NULL                    | Question text                 |
| Type           | nvarchar(50)     | NOT NULL                    | Question type                 |
| Points         | int              | NOT NULL                    | Points awarded                |
| AssessmentId   | uniqueidentifier | NOT NULL, FK to Assessments | Parent assessment             |
| Options        | nvarchar(max)    | NOT NULL                    | JSON array of answer options  |
| CorrectAnswers | nvarchar(max)    | NOT NULL                    | JSON array of correct answers |
| Explanation    | nvarchar(2000)   | NULL                        | Answer explanation            |
| OrderIndex     | int              | NOT NULL                    | Display order                 |
| CreatedAt      | datetime2        | NOT NULL                    | Creation timestamp            |
| UpdatedAt      | datetime2        | NOT NULL                    | Last update timestamp         |

### 10. AssessmentResults

**Purpose**: Store assessment attempt results

| Column             | Type             | Constraints                    | Description                 |
| ------------------ | ---------------- | ------------------------------ | --------------------------- |
| Id                 | uniqueidentifier | PRIMARY KEY, NOT NULL          | Result identifier           |
| AssessmentId       | uniqueidentifier | NOT NULL, FK to Assessments    | Target assessment           |
| UserId             | uniqueidentifier | NOT NULL, FK to Users          | Student who took assessment |
| Score              | int              | NOT NULL                       | Points scored               |
| MaxPossibleScore   | int              | NOT NULL                       | Maximum possible points     |
| IsPassed           | bit              | NOT NULL                       | Whether student passed      |
| Status             | nvarchar(50)     | NOT NULL, DEFAULT 'InProgress' | Result status               |
| StartedAt          | datetime2        | NOT NULL, DEFAULT GETUTCDATE() | Start time                  |
| CompletedAt        | datetime2        | NULL                           | Completion time             |
| TimeSpentInMinutes | int              | NOT NULL, DEFAULT 0            | Time taken                  |
| AttemptNumber      | int              | NOT NULL, DEFAULT 1            | Attempt number              |
| Feedback           | nvarchar(2000)   | NULL                           | Instructor feedback         |
| GradedById         | uniqueidentifier | NULL, FK to Users              | Grader (if manual)          |
| CreatedAt          | datetime2        | NOT NULL                       | Creation timestamp          |
| UpdatedAt          | datetime2        | NOT NULL                       | Last update timestamp       |

**Computed Columns**:

- Percentage AS (CASE WHEN MaxPossibleScore > 0 THEN (Score \* 100.0 / MaxPossibleScore) ELSE 0 END)

### 11. Answers

**Purpose**: Store individual question answers

| Column             | Type             | Constraints                       | Description                    |
| ------------------ | ---------------- | --------------------------------- | ------------------------------ |
| Id                 | uniqueidentifier | PRIMARY KEY, NOT NULL             | Answer identifier              |
| QuestionId         | uniqueidentifier | NOT NULL, FK to Questions         | Target question                |
| AssessmentResultId | uniqueidentifier | NOT NULL, FK to AssessmentResults | Parent result                  |
| SelectedOptions    | nvarchar(max)    | NOT NULL                          | JSON array of selected options |
| TextAnswer         | nvarchar(5000)   | NULL                              | Text-based answer              |
| IsCorrect          | bit              | NOT NULL, DEFAULT 0               | Whether answer is correct      |
| PointsAwarded      | int              | NOT NULL, DEFAULT 0               | Points earned                  |
| GraderFeedback     | nvarchar(1000)   | NULL                              | Grader feedback                |
| CreatedAt          | datetime2        | NOT NULL                          | Creation timestamp             |
| UpdatedAt          | datetime2        | NOT NULL                          | Last update timestamp          |

## Achievement System Tables

### 12. Achievements

**Purpose**: Define available achievements

| Column        | Type             | Constraints           | Description               |
| ------------- | ---------------- | --------------------- | ------------------------- |
| Id            | uniqueidentifier | PRIMARY KEY, NOT NULL | Achievement identifier    |
| Title         | nvarchar(200)    | NOT NULL              | Achievement title         |
| Description   | nvarchar(1000)   | NOT NULL              | Achievement description   |
| Type          | nvarchar(50)     | NOT NULL              | Achievement type          |
| Rarity        | nvarchar(50)     | NOT NULL              | Achievement rarity        |
| Icon          | nvarchar(100)    | NULL                  | Icon representation       |
| PointsAwarded | int              | NOT NULL, DEFAULT 0   | Skill points awarded      |
| Criteria      | nvarchar(max)    | NOT NULL              | JSON array of criteria    |
| IsActive      | bit              | NOT NULL, DEFAULT 1   | Achievement active status |
| CreatedAt     | datetime2        | NOT NULL              | Creation timestamp        |

### 13. UserAchievements

**Purpose**: Track earned achievements

| Column        | Type             | Constraints                    | Description                 |
| ------------- | ---------------- | ------------------------------ | --------------------------- |
| Id            | uniqueidentifier | PRIMARY KEY, NOT NULL          | Record identifier           |
| UserId        | uniqueidentifier | NOT NULL, FK to Users          | User who earned achievement |
| AchievementId | uniqueidentifier | NOT NULL, FK to Achievements   | Earned achievement          |
| EarnedAt      | datetime2        | NOT NULL, DEFAULT GETUTCDATE() | When achievement was earned |
| Notes         | nvarchar(500)    | NULL                           | Additional notes            |

**Indexes**:

- UNIQUE INDEX on (UserId, AchievementId)

## Activity and Scheduling Tables

### 14. UserActivities

**Purpose**: Track user activities and interactions

| Column            | Type             | Constraints                    | Description                 |
| ----------------- | ---------------- | ------------------------------ | --------------------------- |
| Id                | uniqueidentifier | PRIMARY KEY, NOT NULL          | Activity identifier         |
| UserId            | uniqueidentifier | NOT NULL, FK to Users          | User who performed activity |
| Type              | nvarchar(50)     | NOT NULL                       | Activity type               |
| Title             | nvarchar(200)    | NOT NULL                       | Activity title              |
| Description       | nvarchar(1000)   | NULL                           | Activity description        |
| RelatedEntityId   | uniqueidentifier | NULL                           | Related entity ID           |
| RelatedEntityType | nvarchar(50)     | NULL                           | Related entity type         |
| Score             | decimal(5,2)     | NULL                           | Associated score            |
| Status            | nvarchar(50)     | NULL                           | Activity status             |
| CreatedAt         | datetime2        | NOT NULL, DEFAULT GETUTCDATE() | Activity timestamp          |

**Indexes**:

- INDEX on CreatedAt for time-based queries

### 15. Schedules

**Purpose**: Manage scheduled events and sessions

| Column            | Type             | Constraints                   | Description                      |
| ----------------- | ---------------- | ----------------------------- | -------------------------------- |
| Id                | uniqueidentifier | PRIMARY KEY, NOT NULL         | Schedule identifier              |
| Title             | nvarchar(200)    | NOT NULL                      | Event title                      |
| Description       | nvarchar(1000)   | NULL                          | Event description                |
| Type              | nvarchar(50)     | NOT NULL                      | Event type                       |
| StartDateTime     | datetime2        | NOT NULL                      | Event start time                 |
| EndDateTime       | datetime2        | NOT NULL                      | Event end time                   |
| BatchId           | uniqueidentifier | NULL, FK to Batches           | Related batch                    |
| AssessmentId      | uniqueidentifier | NULL, FK to Assessments       | Related assessment               |
| CreatedById       | uniqueidentifier | NULL, FK to Users             | Event creator                    |
| Status            | nvarchar(50)     | NOT NULL, DEFAULT 'Scheduled' | Event status                     |
| Location          | nvarchar(200)    | NULL                          | Physical location                |
| MeetingLink       | nvarchar(500)    | NULL                          | Virtual meeting link             |
| RequiredMaterials | nvarchar(max)    | NOT NULL                      | JSON array of required materials |
| MaxParticipants   | int              | NULL                          | Maximum participants             |
| CreatedAt         | datetime2        | NOT NULL                      | Creation timestamp               |
| UpdatedAt         | datetime2        | NOT NULL                      | Last update timestamp            |

### 16. ScheduleParticipants

**Purpose**: Track event participants

| Column       | Type             | Constraints                    | Description                   |
| ------------ | ---------------- | ------------------------------ | ----------------------------- |
| Id           | uniqueidentifier | PRIMARY KEY, NOT NULL          | Participant record identifier |
| ScheduleId   | uniqueidentifier | NOT NULL, FK to Schedules      | Target schedule               |
| UserId       | uniqueidentifier | NOT NULL, FK to Users          | Participant user              |
| Status       | nvarchar(50)     | NOT NULL, DEFAULT 'Registered' | Participation status          |
| RegisteredAt | datetime2        | NOT NULL, DEFAULT GETUTCDATE() | Registration time             |
| Notes        | nvarchar(500)    | NULL                           | Additional notes              |

**Indexes**:

- UNIQUE INDEX on (ScheduleId, UserId)

## Hangfire Tables

Hangfire automatically creates its own tables for background job processing:

- **HangFire.Job** - Stores background jobs
- **HangFire.JobParameter** - Job parameters
- **HangFire.JobQueue** - Job queue management
- **HangFire.Server** - Server instances
- **HangFire.Set** - Set storage
- **HangFire.Counter** - Counters
- **HangFire.Hash** - Hash storage
- **HangFire.List** - List storage
- **HangFire.State** - Job state history

## Relationships Summary

### Primary Relationships:

- Users → CandidateProfiles (1:N)
- Users → Enrollments (1:N)
- Users → AssessmentResults (1:N)
- Users → UserActivities (1:N)
- Users → UserAchievements (1:N)
- Courses → Topics (1:N)
- Courses → Batches (N:N via junction table)
- Batches → Enrollments (1:N)
- Enrollments → TopicProgress (1:N)
- Assessments → Questions (1:N)
- Assessments → AssessmentResults (1:N)
- AssessmentResults → Answers (1:N)
- Questions → Answers (1:N)
- Achievements → UserAchievements (1:N)
- Schedules → ScheduleParticipants (1:N)

### Foreign Key Constraints:

All foreign key relationships are enforced with appropriate CASCADE, RESTRICT, or SET NULL actions based on business requirements.

## Indexes and Performance

### Recommended Indexes:

1. **Users.Email** - UNIQUE for authentication
2. **Enrollments(UserId, BatchId)** - UNIQUE to prevent duplicate enrollments
3. **TopicProgress(EnrollmentId, TopicId)** - UNIQUE for progress tracking
4. **UserAchievements(UserId, AchievementId)** - UNIQUE to prevent duplicate achievements
5. **UserActivities.CreatedAt** - For time-based activity queries
6. **AssessmentResults(UserId, AssessmentId)** - For result lookups
7. **ScheduleParticipants(ScheduleId, UserId)** - UNIQUE for event participation

### Query Optimization:

- JSON columns are used for flexible data storage (Skills, Permissions, etc.)
- Computed columns for percentage calculations
- Appropriate use of nullable fields to reduce storage overhead
- Proper indexing on frequently queried columns
