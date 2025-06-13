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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ClipboardList,
  Users,
  Calendar,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Play,
  Pause,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";
import Footer from "@/components/Footer";

const TrainerAssessments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const assessments = [
    {
      id: "1",
      title: "React Fundamentals Quiz",
      type: "quiz",
      course: "React Fundamentals",
      status: "active",
      students: 28,
      submitted: 24,
      pending: 4,
      duration: 45,
      totalQuestions: 20,
      averageScore: 78,
      createdDate: "2024-01-15",
      dueDate: "2024-01-22",
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      title: "Node.js Project Assessment",
      type: "project",
      course: "Node.js Backend Development",
      status: "grading",
      students: 22,
      submitted: 18,
      pending: 4,
      duration: 120,
      totalQuestions: 1,
      averageScore: 85,
      createdDate: "2024-02-01",
      dueDate: "2024-02-14",
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      title: "Database Design Final Exam",
      type: "exam",
      course: "Database Design & SQL",
      status: "completed",
      students: 25,
      submitted: 25,
      pending: 0,
      duration: 90,
      totalQuestions: 35,
      averageScore: 92,
      createdDate: "2024-01-25",
      dueDate: "2024-02-05",
      lastActivity: "1 week ago",
    },
    {
      id: "4",
      title: "JavaScript Advanced Concepts Test",
      type: "quiz",
      course: "Advanced JavaScript Concepts",
      status: "draft",
      students: 0,
      submitted: 0,
      pending: 0,
      duration: 60,
      totalQuestions: 25,
      averageScore: 0,
      createdDate: "2024-02-10",
      dueDate: "2024-03-15",
      lastActivity: "3 days ago",
    },
    {
      id: "5",
      title: "Mid-term Practical Assessment",
      type: "practical",
      course: "React Fundamentals",
      status: "scheduled",
      students: 28,
      submitted: 0,
      pending: 28,
      duration: 180,
      totalQuestions: 3,
      averageScore: 0,
      createdDate: "2024-02-12",
      dueDate: "2024-02-20",
      lastActivity: "5 hours ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "grading":
        return "bg-yellow-100 text-yellow-800";
      case "scheduled":
        return "bg-purple-100 text-purple-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "quiz":
        return "bg-blue-100 text-blue-800";
      case "exam":
        return "bg-red-100 text-red-800";
      case "project":
        return "bg-green-100 text-green-800";
      case "practical":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4 text-green-600" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "grading":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case "scheduled":
        return <Clock className="w-4 h-4 text-purple-600" />;
      case "draft":
        return <Pause className="w-4 h-4 text-gray-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch = assessment.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "all" || assessment.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || assessment.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = [
    {
      title: "Total Assessments",
      value: assessments.length.toString(),
      icon: ClipboardList,
      color: "text-blue-600",
    },
    {
      title: "Active Assessments",
      value: assessments.filter((a) => a.status === "active").length.toString(),
      icon: Play,
      color: "text-green-600",
    },
    {
      title: "Pending Grading",
      value: assessments
        .filter((a) => a.status === "grading")
        .length.toString(),
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    {
      title: "Total Submissions",
      value: assessments.reduce((sum, a) => sum + a.submitted, 0).toString(),
      icon: FileText,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Assessments</h1>
            <p className="text-gray-600 mt-2">
              Create, manage, and grade assessments for your courses.
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Assessment
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

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search and Filter Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Assessment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="exam">Exam</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="practical">Practical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="grading">Grading</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assessments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Assessment Overview</CardTitle>
            <CardDescription>
              Manage all your assessments and track student progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Average Score</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssessments.map((assessment) => (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">
                          {assessment.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assessment.totalQuestions} questions •{" "}
                          {assessment.duration} min
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{assessment.course}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(assessment.type)}>
                        {assessment.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(assessment.status)}
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{assessment.students}</div>
                        <div className="text-xs text-gray-500">enrolled</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">
                            {assessment.submitted}
                          </span>{" "}
                          submitted
                        </div>
                        <div className="text-sm">
                          <span className="text-orange-600 font-medium">
                            {assessment.pending}
                          </span>{" "}
                          pending
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">
                          {assessment.averageScore > 0
                            ? `${assessment.averageScore}%`
                            : "—"}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(assessment.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {assessment.lastActivity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Create New Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Start creating a new quiz, exam, or project assessment for your
                students.
              </p>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Create Assessment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Pending Grading
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                You have submissions waiting for grading. Review and provide
                feedback.
              </p>
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Review Submissions
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Assessment Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                View detailed analytics and insights about your assessments and
                student performance.
              </p>
              <Button variant="outline" className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrainerAssessments;
