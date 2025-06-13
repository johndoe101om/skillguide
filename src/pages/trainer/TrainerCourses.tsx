import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Users,
  Clock,
  Play,
  Edit,
  Plus,
  Search,
  BarChart3,
  FileText,
  Video,
  Download,
  Settings,
  Eye,
  Calendar,
  Award,
} from "lucide-react";
import Footer from "@/components/Footer";

const TrainerCourses = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: "1",
      title: "React Fundamentals",
      description:
        "Complete introduction to React including components, state, and props",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      students: 28,
      modules: 12,
      completedModules: 8,
      duration: "6 weeks",
      status: "active",
      progress: 67,
      lastUpdated: "2 days ago",
      startDate: "2024-01-15",
      endDate: "2024-02-28",
      category: "Frontend",
      difficulty: "Beginner",
      rating: 4.7,
      reviews: 24,
    },
    {
      id: "2",
      title: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js and Express",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      students: 22,
      modules: 15,
      completedModules: 12,
      duration: "8 weeks",
      status: "active",
      progress: 80,
      lastUpdated: "1 day ago",
      startDate: "2024-02-01",
      endDate: "2024-03-26",
      category: "Backend",
      difficulty: "Intermediate",
      rating: 4.8,
      reviews: 18,
    },
    {
      id: "3",
      title: "Database Design & SQL",
      description: "Learn database design principles and advanced SQL queries",
      thumbnail:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=200&fit=crop",
      students: 25,
      modules: 10,
      completedModules: 10,
      duration: "4 weeks",
      status: "completed",
      progress: 100,
      lastUpdated: "1 week ago",
      startDate: "2024-01-08",
      endDate: "2024-02-05",
      category: "Database",
      difficulty: "Intermediate",
      rating: 4.9,
      reviews: 25,
    },
    {
      id: "4",
      title: "Advanced JavaScript Concepts",
      description:
        "Deep dive into closures, prototypes, async programming, and more",
      thumbnail:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=300&h=200&fit=crop",
      students: 0,
      modules: 8,
      completedModules: 0,
      duration: "5 weeks",
      status: "draft",
      progress: 0,
      lastUpdated: "3 days ago",
      startDate: "2024-03-15",
      endDate: "2024-04-19",
      category: "Frontend",
      difficulty: "Advanced",
      rating: 0,
      reviews: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeCourses = courses.filter((course) => course.status === "active");
  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0,
  );
  const averageRating =
    courses
      .filter((course) => course.rating > 0)
      .reduce((sum, course) => sum + course.rating, 0) /
    courses.filter((course) => course.rating > 0).length;

  const stats = [
    {
      title: "Active Courses",
      value: activeCourses.length.toString(),
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Total Students",
      value: totalStudents.toString(),
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(1),
      icon: Award,
      color: "text-yellow-600",
    },
    {
      title: "Total Courses",
      value: courses.length.toString(),
      icon: BarChart3,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">
              Manage your courses, track progress, and engage with students.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create New Course
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Search and Filter */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(course.status)}>
                    {course.status}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {course.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Course Progress */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Course Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="text-xs text-gray-500 mt-1">
                    {course.completedModules}/{course.modules} modules completed
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {new Date(course.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-gray-400" />
                    <span>
                      {course.rating > 0
                        ? `${course.rating} (${course.reviews})`
                        : "No ratings"}
                    </span>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="text-xs text-gray-500">
                  Last updated: {course.lastUpdated}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  {course.status === "active" && (
                    <Button size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Teach
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for managing your courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Plus className="w-6 h-6 mb-2" />
                Create New Course
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Video className="w-6 h-6 mb-2" />
                Record Lecture
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default TrainerCourses;
