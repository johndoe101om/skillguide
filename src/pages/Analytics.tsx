import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Target,
  Clock,
  Brain,
  Filter,
  Calendar,
  PieChart,
  LineChart,
  Activity,
  Zap,
  Star,
  AlertTriangle,
} from "lucide-react";

const Analytics = () => {
  const performanceMetrics = [
    {
      title: "Overall Success Rate",
      value: "88%",
      change: "+5.2%",
      trend: "up",
      description: "Candidates completing training successfully",
    },
    {
      title: "Average Score",
      value: "84.2",
      change: "+2.1",
      trend: "up",
      description: "Mean score across all assessments",
    },
    {
      title: "Completion Time",
      value: "12.5 weeks",
      change: "-0.8 weeks",
      trend: "down",
      description: "Average time to complete training",
    },
    {
      title: "Retention Rate",
      value: "92%",
      change: "+3.8%",
      trend: "up",
      description: "Candidates staying until completion",
    },
  ];

  const batchAnalytics = [
    {
      name: "Java Batch 001",
      candidates: 28,
      avgScore: 87.5,
      completion: 96,
      satisfaction: 4.8,
      trend: "excellent",
    },
    {
      name: "Data Engineering 002",
      candidates: 25,
      avgScore: 91.2,
      completion: 100,
      satisfaction: 4.9,
      trend: "excellent",
    },
    {
      name: ".NET Batch 003",
      candidates: 30,
      avgScore: 78.9,
      completion: 87,
      satisfaction: 4.2,
      trend: "good",
    },
    {
      name: "Java Batch 004",
      candidates: 27,
      avgScore: 82.1,
      completion: 89,
      satisfaction: 4.5,
      trend: "good",
    },
  ];

  const skillAnalytics = [
    { skill: "Java Programming", proficiency: 85, demand: 92, growth: "+12%" },
    {
      skill: "Python Development",
      proficiency: 89,
      demand: 96,
      growth: "+18%",
    },
    {
      skill: "Cloud Technologies",
      proficiency: 78,
      demand: 94,
      growth: "+25%",
    },
    { skill: "Data Science", proficiency: 82, demand: 88, growth: "+15%" },
    { skill: ".NET Framework", proficiency: 80, demand: 85, growth: "+8%" },
    { skill: "Machine Learning", proficiency: 74, demand: 90, growth: "+22%" },
  ];

  const learningPatterns = [
    {
      pattern: "Peak Learning Hours",
      value: "10 AM - 12 PM",
      insight: "Higher engagement and completion rates",
    },
    {
      pattern: "Preferred Content Type",
      value: "Interactive Labs",
      insight: "75% better retention than video-only",
    },
    {
      pattern: "Optimal Batch Size",
      value: "25-28 candidates",
      insight: "Best balance of collaboration and attention",
    },
    {
      pattern: "Success Predictor",
      value: "Prior Certification",
      insight: "85% completion rate vs 72% without",
    },
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up")
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down")
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Activity className="w-4 h-4 text-blue-500" />;
  };

  const getBatchTrendColor = (trend: string) => {
    switch (trend) {
      case "excellent":
        return "bg-green-100 text-green-800";
      case "good":
        return "bg-blue-100 text-blue-800";
      case "needs-improvement":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600">
              Advanced insights and performance analytics
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Select defaultValue="30days">
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
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="skills">Skills Analysis</TabsTrigger>
            <TabsTrigger value="patterns">Learning Patterns</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {metric.title}
                        </p>
                        <p className="text-3xl font-bold text-skillguide-primary">
                          {metric.value}
                        </p>
                      </div>
                      {getTrendIcon(metric.trend)}
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <span
                          className={`text-sm font-medium ${
                            metric.trend === "up"
                              ? "text-green-600"
                              : metric.trend === "down"
                                ? "text-red-600"
                                : "text-gray-600"
                          }`}
                        >
                          {metric.change}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          vs last period
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {metric.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Batch Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-skillguide-primary" />
                  Batch Performance Analytics
                </CardTitle>
                <CardDescription>
                  Real-time performance metrics across all active batches
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batchAnalytics.map((batch, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-gray-900">
                            {batch.name}
                          </h3>
                          <Badge className={getBatchTrendColor(batch.trend)}>
                            {batch.trend}
                          </Badge>
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
                        <div>
                          <div className="text-sm text-gray-600">
                            Satisfaction
                          </div>
                          <div className="font-semibold text-lg flex items-center">
                            {batch.satisfaction}/5
                            <Star className="w-4 h-4 ml-1 text-yellow-500" />
                          </div>
                          <Progress
                            value={(batch.satisfaction / 5) * 100}
                            className="h-2 mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-skillguide-gradient-light rounded-lg p-4">
                      <h3 className="font-semibold text-skillguide-800 mb-2">
                        Monthly Progress
                      </h3>
                      <div className="text-2xl font-bold text-skillguide-primary">
                        +15.2%
                      </div>
                      <p className="text-sm text-gray-600">
                        Improvement in overall performance
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">First Attempt Success</span>
                        <span className="font-semibold">85%</span>
                      </div>
                      <Progress value={85} />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Time to Completion</span>
                        <span className="font-semibold">-12%</span>
                      </div>
                      <Progress value={88} />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Knowledge Retention</span>
                        <span className="font-semibold">92%</span>
                      </div>
                      <Progress value={92} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-red-400 pl-4">
                      <h4 className="font-semibold text-red-800">
                        Low Engagement Topics
                      </h4>
                      <p className="text-sm text-gray-600">
                        Advanced Algorithms (68% completion)
                      </p>
                    </div>
                    <div className="border-l-4 border-yellow-400 pl-4">
                      <h4 className="font-semibold text-yellow-800">
                        Extended Learning Time
                      </h4>
                      <p className="text-sm text-gray-600">
                        Cloud Deployment (+2.5 weeks avg)
                      </p>
                    </div>
                    <div className="border-l-4 border-blue-400 pl-4">
                      <h4 className="font-semibold text-blue-800">
                        Resource Optimization
                      </h4>
                      <p className="text-sm text-gray-600">
                        Lab utilization could increase by 23%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-skillguide-primary" />
                  Skills Proficiency & Market Demand Analysis
                </CardTitle>
                <CardDescription>
                  Compare candidate proficiency with industry demand
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillAnalytics.map((skill, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">{skill.skill}</h3>
                        <Badge
                          variant={
                            parseFloat(skill.growth.slice(1)) > 15
                              ? "default"
                              : "secondary"
                          }
                        >
                          {skill.growth} growth
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Candidate Proficiency
                            </span>
                            <span className="text-sm font-medium">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <Progress value={skill.proficiency} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-gray-600">
                              Market Demand
                            </span>
                            <span className="text-sm font-medium">
                              {skill.demand}%
                            </span>
                          </div>
                          <Progress value={skill.demand} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {learningPatterns.map((pattern, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-skillguide-primary" />
                      {pattern.pattern}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-skillguide-primary mb-2">
                      {pattern.value}
                    </div>
                    <p className="text-gray-600">{pattern.insight}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-skillguide-primary" />
                    AI-Powered Predictions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800">
                        High Success Probability
                      </h4>
                      <p className="text-sm text-green-700">
                        95% likelihood of Java Batch 005 exceeding targets
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800">
                        Trending Skills
                      </h4>
                      <p className="text-sm text-blue-700">
                        Cloud and AI skills showing 40% demand increase
                      </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800">
                        Optimal Scheduling
                      </h4>
                      <p className="text-sm text-purple-700">
                        Morning sessions show 23% better engagement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Future Projections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        Next Quarter Forecast
                      </h4>
                      <div className="text-lg font-bold text-skillguide-primary">
                        127 new candidates expected
                      </div>
                      <p className="text-sm text-gray-600">
                        Based on historical enrollment patterns
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Resource Planning</h4>
                      <div className="text-lg font-bold text-skillguide-primary">
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
                      <div className="text-lg font-bold text-skillguide-primary">
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
      </div>
    </div>
  );
};

export default Analytics;
