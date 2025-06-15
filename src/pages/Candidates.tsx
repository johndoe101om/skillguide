import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  Download,
  Upload,
  MessageSquare,
  Target,
  Brain,
  Star,
  Settings,
  Trophy,
  Activity,
  Zap,
  Bookmark,
  Play,
  PlusCircle,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const Candidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("john-doe");

  // Enhanced mock data for demonstration
  const candidateData = {
    name: "John Doe",
    email: "john.doe@example.com",
    batch: "Java Batch - Batch 001",
    enrollmentDate: "2024-01-15",
    profileCompletion: 85,
    currentLevel: "Intermediate",
    nextMilestone: "Advanced Java Concepts",
    progress: {
      overall: 75,
      currentWeek: 12,
      totalWeeks: 16,
      topics: [
        {
          name: "Java Fundamentals",
          progress: 100,
          status: "completed",
          score: 92,
          timeSpent: "24h",
        },
        {
          name: "Spring Framework",
          progress: 80,
          status: "in-progress",
          score: 78,
          timeSpent: "18h",
        },
        {
          name: "Microservices",
          progress: 60,
          status: "in-progress",
          score: 0,
          timeSpent: "12h",
        },
        {
          name: "Cloud Deployment",
          progress: 0,
          status: "not-started",
          score: 0,
          timeSpent: "0h",
        },
      ],
    },
    recentActivity: [
      {
        type: "assessment",
        title: "Spring Boot Quiz",
        score: 85,
        date: "2 hours ago",
      },
      {
        type: "submission",
        title: "Microservices Project",
        status: "submitted",
        date: "1 day ago",
      },
      {
        type: "completion",
        title: "Spring MVC Tutorial",
        date: "2 days ago",
      },
    ],
    upcomingTasks: [
      {
        type: "assignment",
        title: "REST API Project",
        dueDate: "2024-01-20",
        priority: "high",
      },
      {
        type: "quiz",
        title: "Spring Security Assessment",
        dueDate: "2024-01-22",
        priority: "medium",
      },
      {
        type: "session",
        title: "Live Coding Session",
        dueDate: "2024-01-23",
        priority: "low",
      },
    ],
    scores: {
      mcq: [
        {
          topic: "Java Fundamentals",
          score: 92,
          maxScore: 100,
          date: "Jan 10",
        },
        { topic: "Spring Framework", score: 85, maxScore: 100, date: "Jan 15" },
      ],
      projects: [
        {
          name: "E-commerce Backend",
          score: 92,
          maxScore: 100,
          feedback: "Excellent implementation",
        },
        {
          name: "REST API Development",
          score: 88,
          maxScore: 100,
          feedback: "Good structure, needs optimization",
        },
      ],
    },
    aiRecommendations: [
      {
        type: "focus",
        title: "Exception Handling",
        description: "Review Java exception handling patterns",
        priority: "high",
      },
      {
        type: "practice",
        title: "Spring Boot Configuration",
        description: "Practice more with application.properties",
        priority: "medium",
      },
      {
        type: "study",
        title: "Microservices Patterns",
        description: "Study common microservices design patterns",
        priority: "medium",
      },
    ],
    certificates: [
      { name: "AWS Cloud Practitioner", status: "verified", date: "Dec 2023" },
      { name: "Java SE 11 Developer", status: "pending", date: "Jan 2024" },
    ],
    studyStreak: 12,
    skillPoints: 1250,
    rank: 3,
    totalCandidates: 28,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
            <p className="text-gray-600">
              Manage and monitor candidate progress and performance
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Select
              value={selectedCandidate}
              onValueChange={setSelectedCandidate}
            >
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">👨‍🎓 John Doe (You)</SelectItem>
                <SelectItem value="jane-smith">👩‍🎓 Jane Smith</SelectItem>
                <SelectItem value="mike-johnson">👨‍🎓 Mike Johnson</SelectItem>
                <SelectItem value="all-candidates">
                  👥 All Candidates
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {/* Enhanced Welcome Section */}
          <Card className="bg-skillguide-gradient text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 opacity-10">
              <div className="w-32 h-32 rounded-full bg-white/20 transform translate-x-16 -translate-y-16" />
              <div className="w-24 h-24 rounded-full bg-white/20 transform translate-x-8 -translate-y-8" />
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Welcome back, {candidateData.name}! 🚀
                  </h2>
                  <p className="text-white/90 mb-1">
                    You're in {candidateData.batch}
                  </p>
                  <p className="text-white/80 text-sm">
                    Enrolled since {candidateData.enrollmentDate} • Week{" "}
                    {candidateData.progress.currentWeek} of{" "}
                    {candidateData.progress.totalWeeks}
                  </p>
                  <div className="flex items-center mt-3 space-x-4">
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {candidateData.studyStreak} day streak
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {candidateData.skillPoints} skill points
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        Rank #{candidateData.rank} of{" "}
                        {candidateData.totalCandidates}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="text-4xl font-bold mb-1">
                      {candidateData.progress.overall}%
                    </div>
                    <div className="text-white/80 text-sm">
                      Overall Progress
                    </div>
                    <div className="absolute -inset-2 border-2 border-white/20 rounded-full" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-skillguide-primary" />
                      Learning Progress
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    Current level: {candidateData.currentLevel} • Next:{" "}
                    {candidateData.nextMilestone}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {candidateData.progress.topics.map((topic, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <div>
                            <h3 className="font-semibold">{topic.name}</h3>
                            <p className="text-sm text-gray-500">
                              Time spent: {topic.timeSpent}
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                topic.status === "completed"
                                  ? "default"
                                  : topic.status === "in-progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {topic.status.replace("-", " ")}
                            </Badge>
                            {topic.score > 0 && (
                              <div className="text-right">
                                <div className="font-semibold text-skillguide-primary">
                                  {topic.score}%
                                </div>
                                <div className="text-xs text-gray-500">
                                  score
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{topic.progress}%</span>
                          </div>
                          <Progress value={topic.progress} className="h-2" />
                        </div>
                        <div className="flex justify-between mt-3">
                          <Button variant="outline" size="sm">
                            <BookOpen className="w-4 h-4 mr-1" />
                            Study Material
                          </Button>
                          {topic.status === "in-progress" && (
                            <Button
                              size="sm"
                              className="bg-skillguide-gradient"
                            >
                              <Play className="w-4 h-4 mr-1" />
                              Continue
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {candidateData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-skillguide-gradient-light flex items-center justify-center">
                            {activity.type === "assessment" && (
                              <Award className="w-5 h-5 text-skillguide-primary" />
                            )}
                            {activity.type === "submission" && (
                              <Upload className="w-5 h-5 text-skillguide-primary" />
                            )}
                            {activity.type === "completion" && (
                              <CheckCircle className="w-5 h-5 text-skillguide-primary" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500">
                              {activity.date}
                            </p>
                          </div>
                        </div>
                        {activity.score && (
                          <Badge className="bg-green-100 text-green-800">
                            {activity.score}%
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Profile Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Profile Completion</span>
                        <span className="text-sm font-medium">
                          {candidateData.profileCompletion}%
                        </span>
                      </div>
                      <Progress value={candidateData.profileCompletion} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Certificates</span>
                        <Badge variant="outline">2 uploaded</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>GitHub Profile</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>LinkedIn Profile</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                    <Link to="/profile">
                      <Button variant="outline" size="sm" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Complete Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Tasks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Upcoming Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {candidateData.upcomingTasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-sm">{task.title}</p>
                          <p className="text-xs text-gray-500">
                            Due: {task.dueDate}
                          </p>
                        </div>
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>

              {/* AI Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-skillguide-primary" />
                    AI Recommendations
                  </CardTitle>
                  <CardDescription>
                    Personalized suggestions for improvement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {candidateData.aiRecommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-3 hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-sm">{rec.title}</h4>
                          <Badge
                            variant={
                              rec.priority === "high"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {rec.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600">
                          {rec.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 p-0 h-auto"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-6 gap-4">
                <Button className="flex flex-col items-center justify-center h-20 bg-skillguide-gradient hover:bg-skillguide-gradient-dark">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-sm">Upload Certificates</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20"
                >
                  <MessageSquare className="w-5 h-5 mb-1" />
                  <span className="text-sm">Give Feedback</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20"
                >
                  <Calendar className="w-5 h-5 mb-1" />
                  <span className="text-sm">View Schedule</span>
                </Button>
                <Link to="/reports" className="contents">
                  <Button
                    variant="outline"
                    className="flex flex-col items-center justify-center h-20"
                  >
                    <Download className="w-5 h-5 mb-1" />
                    <span className="text-sm">Download Report</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20"
                >
                  <Bookmark className="w-5 h-5 mb-1" />
                  <span className="text-sm">Saved Resources</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex flex-col items-center justify-center h-20"
                >
                  <Target className="w-5 h-5 mb-1" />
                  <span className="text-sm">Set Goals</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
