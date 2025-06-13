import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  UserCheck,
  BookOpen,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Database,
  Server,
  Globe,
  Shield,
  BarChart3,
  Calendar,
  Clock,
  Award,
  Settings,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";

const AdminDashboard = () => {
  const { user } = useAuth();

  const systemStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12% from last month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "up",
    },
    {
      title: "Active Trainers",
      value: "43",
      change: "+3 new this week",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "up",
    },
    {
      title: "Total Courses",
      value: "187",
      change: "+8 added this month",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: "up",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Last 30 days",
      icon: Activity,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100",
      trend: "up",
    },
  ];

  const recentActivities = [
    {
      type: "user",
      title: "New user registration",
      description: "Sarah Johnson joined as a student",
      time: "5 minutes ago",
      status: "success",
    },
    {
      type: "trainer",
      title: "Trainer account approved",
      description: "Mark Wilson's trainer application approved",
      time: "1 hour ago",
      status: "success",
    },
    {
      type: "system",
      title: "Database backup completed",
      description: "Automated backup finished successfully",
      time: "2 hours ago",
      status: "success",
    },
    {
      type: "alert",
      title: "High server load detected",
      description: "Server CPU usage exceeded 80%",
      time: "3 hours ago",
      status: "warning",
    },
    {
      type: "security",
      title: "Security scan completed",
      description: "No vulnerabilities detected",
      time: "6 hours ago",
      status: "success",
    },
  ];

  const systemHealth = [
    {
      component: "Web Server",
      status: "healthy",
      uptime: "99.9%",
      lastCheck: "1 min ago",
    },
    {
      component: "Database",
      status: "healthy",
      uptime: "99.8%",
      lastCheck: "2 min ago",
    },
    {
      component: "File Storage",
      status: "healthy",
      uptime: "100%",
      lastCheck: "1 min ago",
    },
    {
      component: "Email Service",
      status: "warning",
      uptime: "98.5%",
      lastCheck: "5 min ago",
    },
    {
      component: "Backup System",
      status: "healthy",
      uptime: "99.7%",
      lastCheck: "30 min ago",
    },
  ];

  const pendingActions = [
    {
      task: "Review trainer applications",
      count: 5,
      priority: "high",
      due: "Today",
    },
    {
      task: "System maintenance window",
      count: 1,
      priority: "medium",
      due: "This weekend",
    },
    {
      task: "Security audit review",
      count: 3,
      priority: "high",
      due: "Tomorrow",
    },
    {
      task: "Database optimization",
      count: 1,
      priority: "low",
      due: "Next week",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            System overview and platform management for {user?.name}
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-1">
                        {getTrendIcon(stat.trend)}
                        <p className="text-xs text-gray-500 ml-1">
                          {stat.change}
                        </p>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* System Health */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      System Health
                    </CardTitle>
                    <CardDescription>
                      Real-time status of all system components
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemHealth.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          component.status === "healthy"
                            ? "bg-green-500"
                            : component.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {component.component}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Last check: {component.lastCheck}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(component.status)}>
                        {component.status}
                      </Badge>
                      <div className="text-sm text-gray-600 mt-1">
                        {component.uptime} uptime
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activities
                </CardTitle>
                <CardDescription>
                  Latest system events and user activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="mt-1">{getStatusIcon(activity.status)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Pending Actions
                </CardTitle>
                <CardDescription>
                  Tasks requiring admin attention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pendingActions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {action.task}
                      </h4>
                      <p className="text-sm text-gray-600">Due: {action.due}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={getPriorityColor(action.priority)}>
                        {action.priority}
                      </Badge>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        {action.count}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Review Trainers
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Database Status
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Audit
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  System Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Resource Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Resource Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU Usage</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory Usage</span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Storage Usage</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Bandwidth Usage</span>
                    <span>34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Platform Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Platform Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Sessions</span>
                  <span className="font-medium">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Total Assessments
                  </span>
                  <span className="font-medium">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Certificates Issued
                  </span>
                  <span className="font-medium">2,156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <span className="font-medium">2.3 TB</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
