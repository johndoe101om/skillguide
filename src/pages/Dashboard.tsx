import { useState } from "react";
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
} from "lucide-react";

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("30days");
  const [refreshing, setRefreshing] = useState(false);

  // Comprehensive dashboard data
  const dashboardData = {
    overview: {
      totalCandidates: 420,
      activeBatches: 15,
      completionRate: 88.5,
      averageScore: 84.2,
      trends: {
        candidates: { value: 12, direction: "up" },
        batches: { value: 2, direction: "up" },
        completion: { value: 5.2, direction: "up" },
        score: { value: -2.1, direction: "down" },
      },
    },
    performanceMetrics: [
      {
        title: "Overall Success Rate",
        value: "88.5%",
        change: "+5.2%",
        trend: "up",
        description: "Candidates completing training successfully",
        target: 90,
        current: 88.5,
      },
      {
        title: "Average Score",
        value: "84.2",
        change: "+2.1",
        trend: "up",
        description: "Mean score across all assessments",
        target: 85,
        current: 84.2,
      },
      {
        title: "Completion Time",
        value: "12.5 weeks",
        change: "-0.8 weeks",
        trend: "down",
        description: "Average time to complete training",
        target: 12,
        current: 12.5,
      },
      {
        title: "Retention Rate",
        value: "92%",
        change: "+3.8%",
        trend: "up",
        description: "Candidates staying until completion",
        target: 95,
        current: 92,
      },
    ],
    batchPerformance: [
      {
        name: "Java Batch 001",
        candidates: 28,
        avgScore: 87.5,
        completion: 96,
        status: "excellent",
        trend: "up",
      },
      {
        name: "Data Engineering 002",
        candidates: 25,
        avgScore: 91.2,
        completion: 100,
        status: "excellent",
        trend: "up",
      },
      {
        name: ".NET Batch 003",
        candidates: 30,
        avgScore: 78.9,
        completion: 87,
        status: "good",
        trend: "stable",
      },
      {
        name: "Java Batch 004",
        candidates: 27,
        avgScore: 82.1,
        completion: 89,
        status: "good",
        trend: "up",
      },
    ],
    skillDistribution: [
      { skill: "Java", candidates: 45, percentage: 32 },
      { skill: "Python", candidates: 38, percentage: 27 },
      { skill: ".NET", candidates: 35, percentage: 25 },
      { skill: "JavaScript", candidates: 22, percentage: 16 },
    ],
    recentActivity: [
      {
        type: "batch_completed",
        message: "Java Batch 001 completed with 96% success rate",
        time: "2 hours ago",
        status: "success",
      },
      {
        type: "new_registration",
        message: "15 new candidates registered today",
        time: "4 hours ago",
        status: "info",
      },
      {
        type: "alert",
        message: "3 batches approaching capacity",
        time: "6 hours ago",
        status: "warning",
      },
      {
        type: "achievement",
        message: "Monthly completion target achieved",
        time: "1 day ago",
        status: "success",
      },
    ],
    upcomingEvents: [
      {
        title: "Java Batch 005 Starts",
        date: "2024-01-25",
        type: "batch_start",
        candidates: 27,
      },
      {
        title: "Quarterly Assessment",
        date: "2024-01-30",
        type: "assessment",
        batches: 8,
      },
      {
        title: "Trainer Workshop",
        date: "2024-02-05",
        type: "workshop",
        attendees: 12,
      },
    ],
    weeklyProgress: [
      { week: "Week 1", completed: 85, target: 80 },
      { week: "Week 2", completed: 92, target: 85 },
      { week: "Week 3", completed: 78, target: 85 },
      { week: "Week 4", completed: 96, target: 90 },
    ],
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "needs-attention":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "batch_completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "new_registration":
        return <Users className="w-5 h-5 text-blue-500" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "achievement":
        return <Award className="w-5 h-5 text-purple-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Comprehensive insights and performance metrics
            </p>
          </div>

          <div className="flex items-center space-x-4">
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Candidates</p>
                  <p className="text-3xl font-bold">
                    {dashboardData.overview.totalCandidates}
                  </p>
                  <div className="flex items-center mt-2">
                    {getTrendIcon(
                      dashboardData.overview.trends.candidates.direction,
                    )}
                    <span className="text-sm ml-1">
                      +{dashboardData.overview.trends.candidates.value} this
                      month
                    </span>
                  </div>
                </div>
                <Users className="w-12 h-12 text-white/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Batches</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {dashboardData.overview.activeBatches}
                  </p>
                  <div className="flex items-center mt-2">
                    {getTrendIcon(
                      dashboardData.overview.trends.batches.direction,
                    )}
                    <span className="text-sm ml-1 text-gray-600">
                      +{dashboardData.overview.trends.batches.value} new
                    </span>
                  </div>
                </div>
                <BookOpen className="w-12 h-12 text-blue-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold text-green-600">
                    {dashboardData.overview.completionRate}%
                  </p>
                  <div className="flex items-center mt-2">
                    {getTrendIcon(
                      dashboardData.overview.trends.completion.direction,
                    )}
                    <span className="text-sm ml-1 text-gray-600">
                      +{dashboardData.overview.trends.completion.value}%
                    </span>
                  </div>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Average Score</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {dashboardData.overview.averageScore}
                  </p>
                  <div className="flex items-center mt-2">
                    {getTrendIcon(
                      dashboardData.overview.trends.score.direction,
                    )}
                    <span className="text-sm ml-1 text-gray-600">
                      {dashboardData.overview.trends.score.value}
                    </span>
                  </div>
                </div>
                <BarChart3 className="w-12 h-12 text-purple-600/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {dashboardData.performanceMetrics.map((metric, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{metric.title}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-blue-600">
                              {metric.value}
                            </span>
                            <Badge
                              variant={
                                metric.trend === "up" ? "default" : "secondary"
                              }
                            >
                              {metric.change}
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={(metric.current / metric.target) * 100}
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Target: {metric.target}
                          {typeof metric.target === "number" &&
                          metric.target < 50
                            ? ""
                            : "%"}{" "}
                          • {metric.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50"
                      >
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skill Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                  Skill Distribution
                </CardTitle>
                <CardDescription>
                  Current distribution of candidates across different
                  technologies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {dashboardData.skillDistribution.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{skill.skill}</span>
                          <span className="text-sm text-gray-600">
                            {skill.candidates} candidates ({skill.percentage}%)
                          </span>
                        </div>
                        <Progress value={skill.percentage} className="h-3" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-64 h-64 relative">
                      {/* Placeholder for actual chart */}
                      <div className="w-full h-full bg-blue-50 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <PieChart className="w-16 h-16 text-blue-600 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            Interactive Pie Chart
                          </p>
                          <p className="text-xs text-gray-500">
                            {dashboardData.overview.totalCandidates} Total
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Weekly Progress Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="w-5 h-5 mr-2 text-blue-600" />
                  Weekly Performance Trends
                </CardTitle>
                <CardDescription>
                  Completion rates vs targets over the past month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end space-x-8 justify-center">
                  {dashboardData.weeklyProgress.map((week, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="flex space-x-2 mb-2">
                        <div
                          className="w-8 bg-blue-600 rounded-t"
                          style={{
                            height: `${(week.completed / 100) * 200}px`,
                          }}
                        />
                        <div
                          className="w-8 bg-gray-300 rounded-t"
                          style={{ height: `${(week.target / 100) * 200}px` }}
                        />
                      </div>
                      <p className="text-xs font-medium">{week.week}</p>
                      <p className="text-xs text-gray-500">
                        {week.completed}% / {week.target}%
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded mr-2" />
                    <span className="text-xs">Actual</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded mr-2" />
                    <span className="text-xs">Target</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batches" className="space-y-6">
            {/* Batch Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Batch Performance Overview
                </CardTitle>
                <CardDescription>
                  Real-time performance metrics across all active batches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.batchPerformance.map((batch, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">
                            {batch.name}
                          </h3>
                          <Badge className={getStatusColor(batch.status)}>
                            {batch.status}
                          </Badge>
                          {getTrendIcon(batch.trend)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {batch.candidates} candidates
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Avg Score</div>
                          <div className="font-semibold text-lg">
                            {batch.avgScore}%
                          </div>
                          <Progress
                            value={batch.avgScore}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">
                            Completion
                          </div>
                          <div className="font-semibold text-lg">
                            {batch.completion}%
                          </div>
                          <Progress
                            value={batch.completion}
                            className="h-2 mt-1"
                          />
                        </div>
                        <div className="flex items-center justify-center">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Upcoming Events & Milestones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{event.title}</h3>
                          <p className="text-sm text-gray-500">{event.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {event.candidates && `${event.candidates} candidates`}
                          {event.batches && `${event.batches} batches`}
                          {event.attendees && `${event.attendees} attendees`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* AI Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-blue-600" />
                    AI-Powered Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        🎯 High Success Probability
                      </h4>
                      <p className="text-sm text-green-700">
                        Java Batch 005 has 95% likelihood of exceeding
                        completion targets based on candidate profiles
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        📈 Trending Skills
                      </h4>
                      <p className="text-sm text-blue-700">
                        Cloud and AI skills showing 40% demand increase.
                        Consider expanding these programs
                      </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">
                        ⚡ Optimal Scheduling
                      </h4>
                      <p className="text-sm text-purple-700">
                        Morning sessions (9-11 AM) show 23% better engagement
                        rates
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    Predictive Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Next Quarter Forecast
                      </h4>
                      <div className="text-lg font-bold text-blue-600">
                        127 new candidates expected
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on historical enrollment patterns
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Resource Planning</h4>
                      <div className="text-lg font-bold text-blue-600">
                        2 additional trainers needed
                      </div>
                      <p className="text-sm text-gray-600">
                        To maintain current quality standards
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Success Rate Prediction
                      </h4>
                      <div className="text-lg font-bold text-blue-600">
                        91% completion rate
                      </div>
                      <p className="text-sm text-gray-600">
                        With current optimization strategies
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions Footer */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
