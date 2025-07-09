# SkillGuide Local Setup Guide

This guide will help you set up the SkillGuide Learning Management System on your local development environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Application Configuration](#application-configuration)
4. [Running the Application](#running-the-application)
5. [Background Jobs Setup](#background-jobs-setup)
6. [Development Tools](#development-tools)
7. [Troubleshooting](#troubleshooting)
8. [API Testing](#api-testing)

## Prerequisites

### Required Software

1. **.NET 8.0 SDK** (Latest LTS version)

   - Download from: https://dotnet.microsoft.com/download/dotnet/8.0
   - Verify installation: `dotnet --version`

2. **SQL Server** (LocalDB, Express, or Full version)

   - **Option A: SQL Server LocalDB** (Recommended for development)
     - Included with Visual Studio or download separately
   - **Option B: SQL Server Express**
     - Download from: https://www.microsoft.com/en-us/sql-server/sql-server-downloads
   - **Option C: Docker SQL Server**
     ```bash
     docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" \
       -p 1433:1433 --name sqlserver \
       -d mcr.microsoft.com/mssql/server:2022-latest
     ```

3. **Git** (Latest version)

   - Download from: https://git-scm.com/downloads

4. **Visual Studio 2022** or **Visual Studio Code** (Recommended)
   - Visual Studio 2022: https://visualstudio.microsoft.com/downloads/
   - VS Code: https://code.visualstudio.com/download

### Optional but Recommended

1. **SQL Server Management Studio (SSMS)**

   - Download from: https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms

2. **Postman** (for API testing)

   - Download from: https://www.postman.com/downloads/

3. **Node.js** (for frontend development if needed)
   - Download from: https://nodejs.org/

## Database Setup

### Option 1: Automatic Setup (Recommended)

The application will automatically create and seed the database on first run.

1. **Update Connection String** (if needed)

   Edit `appsettings.json`:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SkillGuideDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true"
     }
   }
   ```

2. **Connection String Examples:**

   **LocalDB (Default):**

   ```json
   "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SkillGuideDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true"
   ```

   **SQL Server Express:**

   ```json
   "DefaultConnection": "Server=.\\SQLEXPRESS;Database=SkillGuideDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true"
   ```

   **SQL Server with credentials:**

   ```json
   "DefaultConnection": "Server=localhost;Database=SkillGuideDB;User Id=sa;Password=YourStrong@Passw0rd;MultipleActiveResultSets=true;TrustServerCertificate=true"
   ```

   **Docker SQL Server:**

   ```json
   "DefaultConnection": "Server=localhost,1433;Database=SkillGuideDB;User Id=sa;Password=YourStrong@Passw0rd;MultipleActiveResultSets=true;TrustServerCertificate=true"
   ```

### Option 2: Manual Database Setup

1. **Create Database using SQL Script**

   Run the SQL script located at `Database/CreateDatabase.sql`:

   ```bash
   # Using SQLCMD
   sqlcmd -S (localdb)\mssqllocaldb -i Database/CreateDatabase.sql

   # Or using SSMS
   # Open Database/CreateDatabase.sql in SSMS and execute
   ```

2. **Verify Database Creation**

   Check that the following tables are created:

   - Users
   - CandidateProfiles
   - Courses
   - Topics
   - Batches
   - Enrollments
   - TopicProgress
   - Assessments
   - Questions
   - AssessmentResults
   - Answers
   - Achievements
   - UserAchievements
   - UserActivities
   - Schedules
   - ScheduleParticipants
   - HangFire tables (created automatically)

### Option 3: Entity Framework Migrations

1. **Install EF Core Tools**

   ```bash
   dotnet tool install --global dotnet-ef
   ```

2. **Create Initial Migration** (if not exists)

   ```bash
   cd backend/SkillGuide.Api
   dotnet ef migrations add InitialCreate
   ```

3. **Update Database**
   ```bash
   dotnet ef database update
   ```

## Application Configuration

### 1. Application Settings

Create or update `appsettings.Development.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SkillGuideDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true"
  },
  "Hangfire": {
    "DashboardEnabled": true,
    "WorkerCount": 2
  },
  "Email": {
    "SmtpServer": "localhost",
    "SmtpPort": 587,
    "Username": "test@example.com",
    "Password": "password",
    "FromEmail": "noreply@skillguide.com",
    "FromName": "SkillGuide System"
  },
  "Features": {
    "EnableBackgroundJobs": true,
    "EnableEmailNotifications": false,
    "EnableDetailedLogging": true
  }
}
```

### 2. User Secrets (for sensitive data)

```bash
cd backend/SkillGuide.Api
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "your-connection-string"
dotnet user-secrets set "Email:Password" "your-email-password"
```

### 3. Environment Variables

Alternatively, set environment variables:

**Windows:**

```cmd
set ASPNETCORE_ENVIRONMENT=Development
set ConnectionStrings__DefaultConnection="your-connection-string"
```

**Linux/Mac:**

```bash
export ASPNETCORE_ENVIRONMENT=Development
export ConnectionStrings__DefaultConnection="your-connection-string"
```

## Running the Application

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skillguide.git
cd skillguide/backend/SkillGuide.Api
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Build the Application

```bash
dotnet build
```

### 4. Run the Application

**Using .NET CLI:**

```bash
dotnet run
```

**Using Visual Studio:**

- Open `SkillGuide.Api.sln`
- Press F5 or click "Start Debugging"

**Using VS Code:**

- Open the folder in VS Code
- Press Ctrl+F5 or use the Terminal: `dotnet run`

### 5. Access the Application

- **Web Application:** http://localhost:5000 (HTTP) or https://localhost:5001 (HTTPS)
- **API Documentation (Swagger):** https://localhost:5001/swagger
- **Hangfire Dashboard:** https://localhost:5001/hangfire
- **Health Check:** https://localhost:5001/health

### 6. Default User Accounts

The application seeds default user accounts:

| Email                  | Password | Role    | Description          |
| ---------------------- | -------- | ------- | -------------------- |
| admin@skillguide.com   | password | Admin   | System administrator |
| trainer@skillguide.com | password | Trainer | Training instructor  |
| student@skillguide.com | password | User    | Student/candidate    |

## Background Jobs Setup

### Hangfire Configuration

1. **Hangfire Dashboard Access**

   - URL: https://localhost:5001/hangfire
   - No authentication required in development

2. **Recurring Jobs**

   The following jobs are automatically scheduled:

   - **Update User Rankings:** Every hour
   - **Cleanup Old Logs:** Daily at midnight
   - **Send Daily Reports:** Daily at 8 AM
   - **Update Skill Demand Data:** Weekly
   - **Archive Old Batches:** Monthly

3. **Manual Job Testing**

   You can trigger jobs manually via the Hangfire dashboard or API:

   ```bash
   # Trigger user ranking update
   curl -X POST https://localhost:5001/api/background-jobs/update-rankings

   # Send test notification
   curl -X POST https://localhost:5001/api/background-jobs/test-notification \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","message":"Test notification"}'
   ```

### Email Configuration

For development, you can use any of these approaches:

1. **Use a local SMTP server** (recommended for testing)

   ```bash
   # Install and run smtp4dev (cross-platform SMTP server for development)
   dotnet tool install -g Rnwood.Smtp4dev
   smtp4dev
   # Access web interface at http://localhost:5000
   ```

2. **Use a service like Mailtrap** (for testing)

   ```json
   "Email": {
     "SmtpServer": "smtp.mailtrap.io",
     "SmtpPort": 587,
     "Username": "your-mailtrap-username",
     "Password": "your-mailtrap-password",
     "FromEmail": "noreply@skillguide.com"
   }
   ```

3. **Disable email notifications** (simplest for development)
   ```json
   "Features": {
     "EnableEmailNotifications": false
   }
   ```

## Development Tools

### 1. Entity Framework Tools

```bash
# Install EF Core tools globally
dotnet tool install --global dotnet-ef

# Common EF commands
dotnet ef database update
dotnet ef migrations add <MigrationName>
dotnet ef migrations remove
dotnet ef database drop
```

### 2. Development Certificates

```bash
# Trust the development certificate
dotnet dev-certs https --trust
```

### 3. Hot Reload

When using .NET 6+, hot reload is enabled by default:

```bash
dotnet run --launch-profile https
```

### 4. Debugging

**Visual Studio:**

- Set breakpoints and press F5
- Use the Debug menu for advanced options

**VS Code:**

- Install C# extension
- Use F5 to start debugging
- Configure launch.json if needed

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues

**Error:** "A network-related or instance-specific error occurred..."

**Solutions:**

- Verify SQL Server is running: `sqlcmd -S (localdb)\mssqllocaldb -Q "SELECT @@VERSION"`
- Check connection string format
- Ensure LocalDB is installed: `sqllocaldb info`
- Start LocalDB if needed: `sqllocaldb start mssqllocaldb`

#### 2. Port Already in Use

**Error:** "Failed to bind to address..."

**Solutions:**

- Check what's using the port: `netstat -ano | findstr :5001`
- Kill the process or change the port in `launchSettings.json`
- Use different ports:
  ```json
  "applicationUrl": "https://localhost:5002;http://localhost:5003"
  ```

#### 3. SSL Certificate Issues

**Error:** "The SSL connection could not be established..."

**Solutions:**

```bash
# Trust development certificates
dotnet dev-certs https --clean
dotnet dev-certs https --trust
```

#### 4. Hangfire Dashboard Not Loading

**Solutions:**

- Verify Hangfire tables exist in database
- Check connection string is correct
- Ensure SQL Server is accessible
- Check logs for specific errors

#### 5. Migration Issues

**Error:** "No migrations configuration type was found..."

**Solutions:**

```bash
# Recreate migrations
dotnet ef migrations remove
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Logging and Diagnostics

1. **Check Application Logs**

   - Logs are written to `logs/skillguide-{date}.txt`
   - Console output shows real-time logs

2. **Enable Detailed Logging**

   ```json
   "Logging": {
     "LogLevel": {
       "Default": "Debug",
       "Microsoft.EntityFrameworkCore": "Information"
     }
   }
   ```

3. **Health Checks**

   - Visit https://localhost:5001/health
   - Should return "Healthy" status

4. **Database Connectivity Test**
   ```bash
   # Test connection using Entity Framework
   dotnet run --project SkillGuide.Api -- --test-db
   ```

## API Testing

### 1. Using Swagger UI

1. Navigate to https://localhost:5001/swagger
2. Expand any endpoint
3. Click "Try it out"
4. Fill in parameters and click "Execute"

### 2. Using Postman

Import the Postman collection (if available) or create requests manually:

**Base URL:** `https://localhost:5001`

**Common Endpoints:**

- GET `/api/users` - Get all users
- GET `/api/dashboard` - Get dashboard data
- GET `/api/assessments` - Get assessments
- GET `/api/batches` - Get batches
- GET `/health` - Health check

**Authentication:**

- Currently no authentication required for development
- Add `RequestVerificationToken` header for POST requests if CSRF is enabled

### 3. Using curl

```bash
# Get dashboard data
curl -k https://localhost:5001/api/dashboard

# Get all users
curl -k https://localhost:5001/api/users

# Get health status
curl -k https://localhost:5001/health

# Test with JSON payload
curl -k -X POST https://localhost:5001/api/assessments \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Assessment","type":"Quiz","durationInMinutes":30}'
```

## Performance Considerations

### 1. Database Optimization

- Ensure proper indexes are created (handled by Entity Framework)
- Monitor query performance using SQL Server Profiler
- Consider connection pooling settings

### 2. Memory Usage

- Monitor memory usage during development
- Use dotMemory or similar tools for profiling
- Check for memory leaks in background jobs

### 3. Hangfire Performance

- Monitor job execution times in dashboard
- Adjust worker count based on system resources
- Use background job queues for heavy operations

## Next Steps

1. **Set up CI/CD Pipeline**
2. **Configure Production Environment**
3. **Set up Monitoring and Alerting**
4. **Implement Authentication/Authorization**
5. **Add Integration Tests**
6. **Configure Load Balancing** (for production)

## Support

For issues and questions:

- Check the troubleshooting section above
- Review application logs
- Check GitHub issues (if applicable)
- Contact the development team

---

**Last Updated:** December 2024  
**Version:** 1.0  
**Compatibility:** .NET 8.0, SQL Server 2019+
