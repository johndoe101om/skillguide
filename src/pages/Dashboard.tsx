import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Activity,
  PieChart,
  LineChart,
  Zap,
  RefreshCw,
  Filter,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Brain,
  Target,
  AlertTriangle,
  Settings,
  Sparkles,
  Clock,
  Flame,
  Heart,
  Star,
  BookmarkPlus,
  Eye,
  EyeOff,
  RotateCcw,
  User,
  Lightbulb,
  TrendingDown,
  PlayCircle,
  FileText,
  MessageSquare,
} from "lucide-react";

interface UserPreferences {
  personalizedMode: boolean;
  adaptiveWidgets: boolean;
  showAIInsights: boolean;
  dashboardLayout: "grid" | "list" | "compact";
  preferredWidgets: string[];
  autoRefresh: boolean;
  refreshInterval: number;
  showAnimations: boolean;
  timeFormat: "12h" | "24h";
  theme: "light" | "dark" | "auto";
}

interface UserAnalytics {
  totalCandidates: number;
  activeBatches: number;
  completionRate: number;
  averageScore: number;
  personalStreak: number;
  confidenceLevel: number;
  learningVelocity: "slow" | "medium" | "fast";
  preferredLearningTime: "morning" | "afternoon" | "evening";
  strongSubjects: string[];
  improvementAreas: string[];
  recentActivity: string[];
  nextGoals: string[];
  predictedPerformance: number;
}

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("30days");
  const [refreshing, setRefreshing] = useState(false);
  const [showPersonalizationPanel, setShowPersonalizationPanel] =
    useState(false);

  // User preferences state
  const [preferences, setPreferences] = useState<UserPreferences>({
    personalizedMode: true,
    adaptiveWidgets: true,
    showAIInsights: true,
    dashboardLayout: "grid",
    preferredWidgets: [
      "overview",
      "progress",
      "recommendations",
      "upcoming",
      "achievements",
    ],
    autoRefresh: true,
    refreshInterval: 30,
    showAnimations: true,
    timeFormat: "12h",
    theme: "auto",
  });

  // Enhanced user analytics with personalization
  const [userAnalytics, setUserAnalytics] = useState<UserAnalytics>({
    totalCandidates: 420,
    activeBatches: 15,
    completionRate: 88.5,
    averageScore: 84.2,
    personalStreak: 12,
    confidenceLevel: 0.82,
    learningVelocity: "fast",
    preferredLearningTime: "morning",
    strongSubjects: ["React.js", "JavaScript", "CSS"],
    improvementAreas: ["Node.js", "Testing", "DevOps"],
    recentActivity: [
      "Completed JavaScript Advanced Test",
      "Achieved 7-day learning streak",
      "Earned React.js Certification",
    ],
    nextGoals: [
      "Master Node.js fundamentals",
      "Complete 15-day streak",
      "Score 90%+ on next assessment",
    ],
    predictedPerformance: 87,
  });

  // Comprehensive dashboard data with personalization
  const dashboardData = {
    overview: {
      totalCandidates: userAnalytics.totalCandidates,
      activeBatches: userAnalytics.activeBatches,
      completionRate: userAnalytics.completionRate,
      averageScore: userAnalytics.averageScore,
      trends: {
        candidates: { value: 12, direction: "up" },
        batches: { value: 2, direction: "up" },
        completion: { value: 5.2, direction: "up" },
        score: { value: 3.1, direction: "up" },
      },
    },
    personalizedMetrics: [
      {
        title: "Personal Progress",
        value: `${userAnalytics.averageScore}%`,
        change: "+8.5%",
        trend: "up",
        description: "Your average score this month",
        target: 90,
        current: userAnalytics.averageScore,
        icon: TrendingUp,
        color: "blue",
      },
      {
        title: "Learning Streak",
        value: `${userAnalytics.personalStreak} days`,
        change: "+3 days",
        trend: "up",
        description: "Current consecutive learning days",
        target: 15,
        current: userAnalytics.personalStreak,
        icon: Flame,
        color: "orange",
      },
      {
        title: "Confidence Level",
        value: `${Math.round(userAnalytics.confidenceLevel * 100)}%`,
        change: "+12%",
        trend: "up",
        description: "AI-calculated confidence score",
        target: 85,
        current: userAnalytics.confidenceLevel * 100,
        icon: Heart,
        color: "red",
      },
      {
        title: "Next Goal",
        value: "Node.js",
        change: "Focus Area",
        trend: "stable",
        description: "Recommended improvement area",
        target: 100,
        current: 65,
        icon: Target,
        color: "purple",
      },
    ],
    aiRecommendations: [
      {
        type: "practice",
        priority: "high",
        title: "Morning Practice Session",
        description: "You perform 23% better in morning sessions",
        action: "Schedule 9 AM practice",
        impact: "High",
        icon: Clock,
        timeEstimate: "30 min",
      },
      {
        type: "subject",
        priority: "medium",
        title: "Focus on Node.js",
        description: "Improve weak area to boost overall score",
        action: "Take Node.js fundamentals test",
        impact: "Medium",
        icon: BookOpen,
        timeEstimate: "1 hour",
      },
      {
        type: "streak",
        priority: "high",
        title: "Maintain Learning Streak",
        description: "You're 3 days away from your 15-day goal",
        action: "Complete any practice test today",
        impact: "High",
        icon: Flame,
        timeEstimate: "20 min",
      },
      {
        type: "assessment",
        priority: "low",
        title: "Ready for Advanced Tests",
        description: "Your scores suggest you can handle harder challenges",
        action: "Try advanced difficulty level",
        impact: "Low",
        icon: Award,
        timeEstimate: "45 min",
      },
    ],
    upcomingSchedule: [
      {
        title: "React.js Advanced Assessment",
        date: "2024-01-25",
        time: "10:00 AM",
        type: "assessment",
        status: "registered",
        preparedness: 85,
        personalRecommendation: "You're well prepared! Focus on hooks review.",
      },
      {
        title: "Node.js Practice Session",
        date: "2024-01-26",
        time: "9:00 AM",
        type: "practice",
        status: "suggested",
        preparedness: 60,
        personalRecommendation: "Recommended to improve weak area.",
      },
      {
        title: "Full Stack Mock Interview",
        date: "2024-01-30",
        time: "2:00 PM",
        type: "interview",
        status: "available",
        preparedness: 75,
        personalRecommendation: "Good chance to showcase your skills.",
      },
    ],
    recentAchievements: [
      {
        title: "JavaScript Master",
        description: "Scored 95%+ on JavaScript assessment",
        date: "2024-01-20",
        type: "score",
        icon: Star,
        rarity: "rare",
      },
      {
        title: "Week Warrior",
        description: "Completed 7 consecutive days of learning",
        date: "2024-01-19",
        type: "streak",
        icon: Flame,
        rarity: "common",
      },
      {
        title: "Quick Learner",
        description: "Completed assessment 20% faster than average",
        date: "2024-01-18",
        type: "speed",
        icon: Zap,
        rarity: "uncommon",
      },
    ],
    learningInsights: [
      {
        insight: "Peak Performance Time",
        description: "You score 23% higher during 9-11 AM sessions",
        actionable: true,
        action: "Schedule important tests for morning",
        category: "timing",
      },
      {
        insight: "Learning Style Match",
        description: "Visual learning materials increase retention by 18%",
        actionable: true,
        action: "Prefer video tutorials and diagrams",
        category: "style",
      },
      {
        insight: "Confidence Pattern",
        description:
          "Your confidence increases after completing practice tests",
        actionable: true,
        action: "Take practice tests before formal assessments",
        category: "confidence",
      },
      {
        insight: "Subject Correlation",
        description: "Strong CSS skills are helping with React.js performance",
        actionable: false,
        action: "",
        category: "correlation",
      },
    ],
  };

  const updatePreference = (key: keyof UserPreferences, value: any) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh with personalized loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case "down":
        return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMetricColor = (color: string) => {
    const colors = {
      blue: "from-blue-600 to-blue-700",
      orange: "from-orange-600 to-orange-700",
      red: "from-red-600 to-red-700",
      purple: "from-purple-600 to-purple-700",
      green: "from-green-600 to-green-700",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "rare":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "uncommon":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "common":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Auto-refresh functionality
  useEffect(() => {
    if (preferences.autoRefresh) {
      const interval = setInterval(() => {
        // Auto refresh data
      }, preferences.refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [preferences.autoRefresh, preferences.refreshInterval]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header with Personalization */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              {preferences.personalizedMode && (
                <Sparkles className="w-8 h-8 mr-3 text-skillguide-600" />
              )}
              Personalized Dashboard
            </h1>
            <p className="text-gray-600">
              {preferences.personalizedMode
                ? `AI-powered insights tailored for your ${userAnalytics.learningVelocity} learning style`
                : "Comprehensive insights and performance metrics"}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setShowPersonalizationPanel(!showPersonalizationPanel)
              }
            >
              <Settings className="w-4 h-4 mr-2" />
              Customize
            </Button>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw
                className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>
        </div>

        {/* Personalization Panel */}
        {showPersonalizationPanel && (
          <Card className="mb-8 border-skillguide-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2 text-skillguide-600" />
                Dashboard Personalization
              </CardTitle>
              <CardDescription>
                Customize your dashboard experience and AI recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="personalizedMode">
                      Personalized Experience
                    </Label>
                    <p className="text-sm text-gray-500">
                      Enable AI-powered personalization
                    </p>
                  </div>
                  <Switch
                    id="personalizedMode"
                    checked={preferences.personalizedMode}
                    onCheckedChange={(checked) =>
                      updatePreference("personalizedMode", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="adaptiveWidgets">Adaptive Widgets</Label>
                    <p className="text-sm text-gray-500">
                      Widgets adapt to your usage patterns
                    </p>
                  </div>
                  <Switch
                    id="adaptiveWidgets"
                    checked={preferences.adaptiveWidgets}
                    onCheckedChange={(checked) =>
                      updatePreference("adaptiveWidgets", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showAIInsights">AI Insights</Label>
                    <p className="text-sm text-gray-500">
                      Display AI-powered recommendations
                    </p>
                  </div>
                  <Switch
                    id="showAIInsights"
                    checked={preferences.showAIInsights}
                    onCheckedChange={(checked) =>
                      updatePreference("showAIInsights", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="autoRefresh">Auto Refresh</Label>
                    <p className="text-sm text-gray-500">
                      Automatically update data
                    </p>
                  </div>
                  <Switch
                    id="autoRefresh"
                    checked={preferences.autoRefresh}
                    onCheckedChange={(checked) =>
                      updatePreference("autoRefresh", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showAnimations">Animations</Label>
                    <p className="text-sm text-gray-500">
                      Enable smooth animations
                    </p>
                  </div>
                  <Switch
                    id="showAnimations"
                    checked={preferences.showAnimations}
                    onCheckedChange={(checked) =>
                      updatePreference("showAnimations", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dashboard Layout</Label>
                  <Select
                    value={preferences.dashboardLayout}
                    onValueChange={(value) =>
                      updatePreference("dashboardLayout", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid Layout</SelectItem>
                      <SelectItem value="list">List Layout</SelectItem>
                      <SelectItem value="compact">Compact Layout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personalized Metrics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {preferences.personalizedMode
            ? dashboardData.personalizedMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card
                    key={index}
                    className={`bg-gradient-to-r ${getMetricColor(metric.color)} text-white ${
                      preferences.showAnimations
                        ? "transform hover:scale-105 transition-transform duration-200"
                        : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white/80 text-sm">
                            {metric.title}
                          </p>
                          <p className="text-3xl font-bold">{metric.value}</p>
                          <div className="flex items-center mt-2">
                            {getTrendIcon(metric.trend)}
                            <span className="text-sm ml-1">
                              {metric.change}
                            </span>
                          </div>
                        </div>
                        <Icon className="w-12 h-12 text-white/60" />
                      </div>
                      {preferences.personalizedMode && (
                        <div className="mt-3">
                          <Progress
                            value={(metric.current / metric.target) * 100}
                            className="h-2 bg-white/20"
                          />
                          <p className="text-xs text-white/70 mt-1">
                            Goal: {metric.target}
                            {typeof metric.target === "number" &&
                            metric.target < 50
                              ? ""
                              : "%"}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })
            : // Standard metrics for non-personalized mode
              [
                {
                  title: "Total Candidates",
                  value: dashboardData.overview.totalCandidates,
                  icon: Users,
                },
                {
                  title: "Active Batches",
                  value: dashboardData.overview.activeBatches,
                  icon: BookOpen,
                },
                {
                  title: "Completion Rate",
                  value: `${dashboardData.overview.completionRate}%`,
                  icon: CheckCircle,
                },
                {
                  title: "Average Score",
                  value: `${dashboardData.overview.averageScore}%`,
                  icon: BarChart3,
                },
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm">
                            {metric.title}
                          </p>
                          <p className="text-3xl font-bold text-gray-900">
                            {metric.value}
                          </p>
                        </div>
                        <Icon className="w-12 h-12 text-blue-600/60" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        {/* AI Recommendations (Personalized Mode Only) */}
        {preferences.personalizedMode && preferences.showAIInsights && (
          <Card className="mb-8 border-skillguide-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-skillguide-600" />
                AI-Powered Recommendations
                <Badge className="ml-2 bg-skillguide-100 text-skillguide-700">
                  Personalized
                </Badge>
              </CardTitle>
              <CardDescription>
                Smart suggestions based on your learning patterns and goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardData.aiRecommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 border rounded-lg hover:shadow-md transition-all duration-200 ${
                        preferences.showAnimations ? "hover:scale-105" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-5 h-5 text-skillguide-600" />
                        <Badge className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {rec.description}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-skillguide-600 font-medium">
                          {rec.impact} Impact
                        </span>
                        <span className="text-xs text-gray-500">
                          {rec.timeEstimate}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs"
                      >
                        {rec.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">
              {preferences.personalizedMode ? "My Progress" : "Progress"}
            </TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="insights">
              {preferences.personalizedMode ? "AI Insights" : "Analytics"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Enhanced Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    {preferences.personalizedMode
                      ? "Personal Performance"
                      : "Key Performance Indicators"}
                    {preferences.personalizedMode && (
                      <Badge variant="outline" className="ml-2">
                        AI-Enhanced
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {preferences.personalizedMode ? (
                      <>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">
                              Learning Velocity
                            </span>
                            <Badge className="bg-green-100 text-green-800">
                              {userAnalytics.learningVelocity}
                            </Badge>
                          </div>
                          <Progress
                            value={
                              userAnalytics.learningVelocity === "fast"
                                ? 90
                                : userAnalytics.learningVelocity === "medium"
                                  ? 60
                                  : 30
                            }
                            className="h-2"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">
                              Predicted Next Score
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              {userAnalytics.predictedPerformance}%
                            </span>
                          </div>
                          <Progress
                            value={userAnalytics.predictedPerformance}
                            className="h-2"
                          />
                        </div>
                      </>
                    ) : (
                      // Standard KPIs for non-personalized mode
                      [
                        {
                          title: "Overall Success Rate",
                          value: "88.5%",
                          target: 90,
                          current: 88.5,
                        },
                        {
                          title: "Average Score",
                          value: "84.2",
                          target: 85,
                          current: 84.2,
                        },
                      ].map((metric, index) => (
                        <div key={index}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">{metric.title}</span>
                            <span className="text-lg font-bold text-blue-600">
                              {metric.value}
                            </span>
                          </div>
                          <Progress
                            value={(metric.current / metric.target) * 100}
                            className="h-2"
                          />
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    {preferences.personalizedMode
                      ? "Your Recent Activity"
                      : "Recent Activity"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(preferences.personalizedMode
                      ? userAnalytics.recentActivity
                      : [
                          "Java Batch 001 completed with 96% success rate",
                          "15 new candidates registered today",
                          "3 batches approaching capacity",
                        ]
                    ).map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity}</p>
                          <p className="text-xs text-gray-500">
                            {index === 0
                              ? "2 hours ago"
                              : index === 1
                                ? "4 hours ago"
                                : "6 hours ago"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            {preferences.personalizedMode ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Learning Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-skillguide-600" />
                      Subject Mastery
                    </CardTitle>
                    <CardDescription>
                      Your progress across different subjects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userAnalytics.strongSubjects.map((subject, index) => (
                        <div key={subject} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium">{subject}</span>
                              <Star className="w-4 h-4 text-yellow-500 ml-2" />
                            </div>
                            <span className="text-sm text-green-600 font-medium">
                              {[92, 89, 95][index]}% Mastery
                            </span>
                          </div>
                          <Progress
                            value={[92, 89, 95][index]}
                            className="h-2"
                          />
                        </div>
                      ))}
                      <Separator />
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Improvement Areas:
                      </div>
                      {userAnalytics.improvementAreas.map((subject, index) => (
                        <div key={subject} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium">{subject}</span>
                              <Target className="w-4 h-4 text-red-500 ml-2" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-red-600 font-medium">
                                {[58, 62, 45][index]}%
                              </span>
                              <Button size="sm" variant="outline">
                                <PlayCircle className="w-3 h-3 mr-1" />
                                Practice
                              </Button>
                            </div>
                          </div>
                          <Progress
                            value={[58, 62, 45][index]}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Goals and Milestones */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-skillguide-600" />
                      Goals & Milestones
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userAnalytics.nextGoals.map((goal, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{goal}</span>
                            <Badge variant="outline">
                              {["3 days", "2 days", "1 week"][index]}
                            </Badge>
                          </div>
                          <Progress
                            value={[67, 80, 25][index]}
                            className="h-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {[67, 80, 25][index]}% complete
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Standard progress view
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "React.js",
                      "JavaScript",
                      "CSS",
                      "Node.js",
                      "Testing",
                    ].map((subject, index) => {
                      const scores = [95, 87, 92, 78, 83];
                      return (
                        <div key={subject} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">
                              {subject}
                            </span>
                            <span className="text-sm text-gray-600">
                              {scores[index]}%
                            </span>
                          </div>
                          <Progress value={scores[index]} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  {preferences.personalizedMode
                    ? "Your Personalized Schedule"
                    : "Upcoming Events"}
                  {preferences.personalizedMode && (
                    <Badge className="ml-2 bg-skillguide-100 text-skillguide-700">
                      Optimized for you
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.upcomingSchedule.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">
                            {event.date} at {event.time}
                          </p>
                          {preferences.personalizedMode &&
                            event.personalRecommendation && (
                              <p className="text-xs text-skillguide-600 mt-1">
                                💡 {event.personalRecommendation}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge
                          variant={
                            event.status === "registered"
                              ? "default"
                              : event.status === "suggested"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {event.status}
                        </Badge>
                        {preferences.personalizedMode && (
                          <div>
                            <div className="text-xs text-gray-500">
                              Preparedness
                            </div>
                            <div className="w-16">
                              <Progress
                                value={event.preparedness}
                                className="h-1"
                              />
                            </div>
                            <div className="text-xs text-gray-600">
                              {event.preparedness}%
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  {preferences.personalizedMode
                    ? "Your Achievements"
                    : "Recent Achievements"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dashboardData.recentAchievements.map(
                    (achievement, index) => {
                      const Icon = achievement.icon;
                      return (
                        <div
                          key={index}
                          className={`p-4 border rounded-lg text-center ${
                            preferences.showAnimations
                              ? "hover:shadow-lg transition-shadow duration-200"
                              : ""
                          }`}
                        >
                          <div className="flex justify-center mb-3">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                              <Icon className="w-6 h-6 text-yellow-600" />
                            </div>
                          </div>
                          <h3 className="font-semibold mb-1">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge
                              className={getRarityColor(achievement.rarity)}
                            >
                              {achievement.rarity}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {achievement.date}
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {preferences.personalizedMode ? (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Learning Insights */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-skillguide-600" />
                      Learning Pattern Analysis
                    </CardTitle>
                    <CardDescription>
                      AI insights into your learning behavior and optimization
                      suggestions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.learningInsights.map((insight, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <h4 className="font-semibold text-sm mb-2">
                            {insight.insight}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {insight.description}
                          </p>
                          {insight.actionable && (
                            <Badge className="bg-blue-100 text-blue-800">
                              💡 {insight.action}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Predictive Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-skillguide-600" />
                      Predictive Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-2">
                          Next Assessment Prediction
                        </h4>
                        <div className="text-2xl font-bold text-skillguide-600 mb-1">
                          {userAnalytics.predictedPerformance}% expected score
                        </div>
                        <Progress
                          value={userAnalytics.predictedPerformance}
                          className="h-3 mb-2"
                        />
                        <p className="text-sm text-gray-600">
                          Based on your recent performance trends
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">
                          Optimal Study Schedule
                        </h4>
                        <div className="text-lg font-bold text-skillguide-600 mb-1">
                          {userAnalytics.preferredLearningTime} sessions
                        </div>
                        <p className="text-sm text-gray-600">
                          You perform 23% better during{" "}
                          {userAnalytics.preferredLearningTime} hours
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Confidence Trend</h4>
                        <div className="text-lg font-bold text-green-600 mb-1">
                          {Math.round(userAnalytics.confidenceLevel * 100)}%
                          confidence level
                        </div>
                        <p className="text-sm text-gray-600">
                          Increasing steadily over the past month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Standard analytics view
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Standard Analytics
                    </h3>
                    <p className="text-gray-600">
                      Basic performance metrics and trends
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions with Personalization */}
        <Card className="mt-8 border-skillguide-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-skillguide-600" />
              {preferences.personalizedMode
                ? "Recommended Actions"
                : "Quick Actions"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {preferences.personalizedMode ? (
                <>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-6 bg-green-50 hover:bg-green-100 border-green-200"
                  >
                    <PlayCircle className="w-5 h-5 mr-2 text-green-600" />
                    Take Node.js Practice
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-6 bg-orange-50 hover:bg-orange-100 border-orange-200"
                  >
                    <Flame className="w-5 h-5 mr-2 text-orange-600" />
                    Continue Streak
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-6 bg-purple-50 hover:bg-purple-100 border-purple-200"
                  >
                    <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                    Schedule Morning Session
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center p-6">
                    <Sparkles className="w-5 h-5 mr-2" />
                    View All Insights
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-6"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Export Analytics
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-6"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule Report
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center p-6"
                  >
                    <Users className="w-5 h-5 mr-2" />
                    Manage Batches
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center p-6">
                    <Zap className="w-5 h-5 mr-2" />
                    AI Insights
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
