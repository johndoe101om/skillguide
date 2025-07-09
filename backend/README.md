# SkillGuide Learning Management System - Backend

A comprehensive ASP.NET Core 8 backend for the SkillGuide Learning Management System featuring MVC architecture, AJAX integration, Hangfire background jobs, and comprehensive assessment management.

## 🚀 Quick Start

### Prerequisites

- .NET 8.0 SDK
- SQL Server (LocalDB, Express, or Full version)
- Visual Studio 2022 or VS Code

### 1. Clone & Setup

```bash
git clone <repository-url>
cd skillguide/backend/SkillGuide.Api
dotnet restore
```

### 2. Configure Database

Update `appsettings.json` with your connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SkillGuideDB;Trusted_Connection=true;MultipleActiveResultSets=true;TrustServerCertificate=true"
  }
}
```

### 3. Run Application

```bash
dotnet run
```

The application will automatically:

- Create the database and tables
- Seed sample data
- Start background job processing
- Launch the web interface

### 4. Access the System

- **Web Application:** https://localhost:5001
- **API Documentation:** https://localhost:5001/swagger
- **Background Jobs Dashboard:** https://localhost:5001/hangfire
- **Health Check:** https://localhost:5001/health

### 5. Default Login Credentials

| Email                  | Password | Role    |
| ---------------------- | -------- | ------- |
| admin@skillguide.com   | password | Admin   |
| trainer@skillguide.com | password | Trainer |
| student@skillguide.com | password | User    |

## 📋 Project Structure

```
backend/
├── SkillGuide.Api/
│   ├── Controllers/              # MVC and API Controllers
│   │   ├── HomeController.cs     # MVC Home controller
│   │   ├── AssessmentController.cs # Assessment management
│   │   ├── BatchController.cs    # Batch management
│   │   ├── UsersController.cs    # User management API
│   │   └── DashboardController.cs # Dashboard API
│   ├── Models/                   # Domain models
│   │   ├── User.cs
│   │   ├── Assessment.cs
│   │   ├── Batch.cs
│   │   └── ...
│   ├── DTOs/                     # Data Transfer Objects
│   ├── Data/                     # Entity Framework
│   │   └── SkillGuideDbContext.cs
│   ├── Services/                 # Business logic services
│   │   ├── IBackgroundJobService.cs
│   │   └── BackgroundJobService.cs
│   ├── Views/                    # MVC Razor views
│   │   ├── Home/
│   │   ├── Assessment/
│   │   ├── Batch/
│   │   └── Shared/
│   ├── wwwroot/                  # Static files
│   │   ├── js/
│   │   │   └── site.js          # AJAX integration
│   │   └── css/
│   └── Program.cs               # Application entry point
├── Database/                    # Database scripts
│   ├── CreateDatabase.sql       # Complete database schema
│   └── TableStructure.md        # Database documentation
└── Setup/                       # Setup documentation
    └── LocalSetupGuide.md       # Detailed setup guide
```

## 🏗️ Architecture Features

### MVC Architecture

- **Controllers:** Handle HTTP requests and return views or JSON
- **Views:** Razor pages with AJAX integration
- **Models:** Domain entities with Entity Framework integration

### AJAX Integration

- Comprehensive AJAX support in `wwwroot/js/site.js`
- Real-time dashboard updates
- Form submissions without page refresh
- Dynamic content loading
- Global error handling and notifications

### Background Jobs (Hangfire)

- **Assessment Processing:** Auto-grading and result calculation
- **User Analytics:** Progress tracking and recommendations
- **Email Notifications:** Automated messaging system
- **Data Maintenance:** Cleanup and archiving tasks
- **Dashboard:** Monitor jobs at `/hangfire`

### Database Design

- **16 Core Tables:** Users, assessments, batches, achievements, etc.
- **Comprehensive Relationships:** Foreign keys and constraints
- **Performance Optimized:** Indexes and computed columns
- **Hangfire Integration:** Background job persistence

## 🔧 Configuration

### Connection Strings

**LocalDB (Development):**

```json
"Server=(localdb)\\mssqllocaldb;Database=SkillGuideDB;Trusted_Connection=true"
```

**SQL Server Express:**

```json
"Server=.\\SQLEXPRESS;Database=SkillGuideDB;Trusted_Connection=true"
```

**Docker SQL Server:**

```json
"Server=localhost,1433;Database=SkillGuideDB;User Id=sa;Password=YourPassword"
```

### Features Configuration

```json
{
  "Features": {
    "EnableBackgroundJobs": true,
    "EnableEmailNotifications": false,
    "EnableDetailedLogging": true,
    "EnableSwagger": true
  }
}
```

### Email Configuration

```json
{
  "Email": {
    "SmtpServer": "smtp.gmail.com",
    "SmtpPort": 587,
    "EnableSsl": true,
    "Username": "your-email@gmail.com",
    "Password": "your-app-password",
    "FromEmail": "noreply@skillguide.com"
  }
}
```

## 📊 Database Schema

### Core Tables

1. **Users** - User accounts (students, trainers, admins)
2. **CandidateProfiles** - Extended student profiles with analytics
3. **Courses** - Training course definitions
4. **Topics** - Individual course topics
5. **Batches** - Training batch management
6. **Enrollments** - Student enrollment tracking
7. **Assessments** - Test and exam definitions
8. **Questions** - Assessment questions
9. **AssessmentResults** - Student results and scoring
10. **Achievements** - Gamification system
11. **UserActivities** - Activity tracking
12. **Schedules** - Event and session scheduling

### Key Relationships

- Users → CandidateProfiles (1:N)
- Batches → Enrollments → TopicProgress (1:N:N)
- Assessments → Questions → Answers (1:N:N)
- Users → UserAchievements ← Achievements (N:N)

## 🚀 API Endpoints

### Dashboard APIs

- `GET /api/dashboard` - Dashboard overview data
- `GET /api/dashboard/analytics` - Advanced analytics

### User Management

- `GET /api/users` - List all users
- `GET /api/users/{id}` - Get user profile
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `PUT /api/users/{id}/profile` - Update candidate profile

### Assessment System

- `GET /api/assessments` - List assessments
- `POST /api/assessments` - Create assessment
- `GET /api/assessments/{id}/questions` - Get questions
- `POST /api/assessments/{id}/submit` - Submit assessment
- `GET /api/assessments/{id}/results` - View results

### Batch Management

- `GET /api/batches` - List batches
- `POST /api/batches` - Create batch
- `POST /api/batches/{id}/enroll` - Enroll student
- `GET /api/batches/{id}/analytics` - Batch analytics

## 🎯 AJAX Features

### Real-time Dashboard

- Live metric updates every 30 seconds
- Dynamic charts with Chart.js integration
- System status monitoring
- Recent activity feeds

### Form Management

- AJAX form submissions with validation
- File upload support
- Progress indicators
- Error handling and display

### Dynamic Content

- Modal content loading
- Dropdown population
- Table data refresh
- Notification system

### Global Features

```javascript
// Global AJAX utilities
showNotification("success", "Operation completed");
showLoading();
refreshElement("#dashboard-widget", "/api/dashboard");
loadSelectOptions("#batch-select", "/api/batches");
```

## 🔄 Background Jobs

### Scheduled Jobs

- **Hourly:** Update user rankings
- **Daily:** Send reports, cleanup logs
- **Weekly:** Update skill demand data
- **Monthly:** Archive old data

### On-Demand Jobs

```csharp
// Trigger background jobs
await _backgroundJobService.ProcessAssessmentResults(resultId);
await _backgroundJobService.CheckUserAchievements(userId);
await _backgroundJobService.SendEmailNotification(email, subject, body);
```

### Job Monitoring

Access the Hangfire dashboard at `/hangfire` to:

- Monitor job execution
- View job history
- Retry failed jobs
- Schedule recurring tasks

## 🛠️ Development

### Running Tests

```bash
dotnet test
```

### Database Migrations

```bash
# Create migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Remove last migration
dotnet ef migrations remove
```

### Development Tools

```bash
# Install EF Core tools
dotnet tool install --global dotnet-ef

# Trust development certificates
dotnet dev-certs https --trust

# Watch for changes (hot reload)
dotnet watch run
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Verify SQL Server is running
   - Check connection string format
   - Ensure database exists

2. **Port Already in Use**

   - Kill existing processes: `netstat -ano | findstr :5001`
   - Change ports in `launchSettings.json`

3. **SSL Certificate Issues**
   ```bash
   dotnet dev-certs https --clean
   dotnet dev-certs https --trust
   ```

### Debugging

- Check logs in `logs/skillguide-{date}.txt`
- Use browser developer tools for AJAX debugging
- Monitor Hangfire dashboard for job failures
- Visit `/health` endpoint for system status

## 📝 API Documentation

### Swagger UI

Access comprehensive API documentation at:

- **Development:** https://localhost:5001/swagger
- **Staging:** https://staging.skillguide.com/swagger

### Authentication

Currently using cookie-based authentication for MVC and token-based for API (future implementation).

### Rate Limiting

Default rate limits:

- **API calls:** 100 requests per minute per IP
- **File uploads:** 10 MB maximum size
- **Bulk operations:** 1000 records maximum

## 🔒 Security Features

- **CSRF Protection:** Built-in anti-forgery tokens
- **CORS Configuration:** Restricted origins
- **Input Validation:** FluentValidation integration
- **SQL Injection Protection:** Entity Framework parameterized queries
- **XSS Prevention:** Razor view encoding

## 📈 Performance

### Database Optimization

- **Indexes:** Optimized for common queries
- **Connection Pooling:** Configured for high concurrency
- **Query Optimization:** Entity Framework best practices

### Caching Strategy

- **Memory Caching:** Frequently accessed data
- **Response Caching:** Static content
- **Distributed Caching:** For scaled deployments

### Monitoring

- **Health Checks:** `/health` endpoint
- **Application Insights:** Performance monitoring
- **Custom Metrics:** Business KPIs tracking

## 🚀 Deployment

### Production Configuration

1. Update `appsettings.Production.json`
2. Configure secure connection strings
3. Enable HTTPS redirection
4. Set up monitoring and logging
5. Configure email service
6. Deploy to IIS/Docker/Cloud

### Docker Support

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
COPY . /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["dotnet", "SkillGuide.Api.dll"]
```

## 📚 Additional Documentation

- [Local Setup Guide](Setup/LocalSetupGuide.md) - Detailed setup instructions
- [Database Schema](Database/TableStructure.md) - Complete database documentation
- [API Reference](https://localhost:5001/swagger) - Interactive API documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:

- Check the troubleshooting section
- Review the setup guide
- Open an issue on GitHub
- Contact the development team

---

**Version:** 1.0  
**Last Updated:** December 2024  
**Framework:** ASP.NET Core 8.0  
**Database:** SQL Server 2019+
