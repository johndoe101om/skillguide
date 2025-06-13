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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserCheck,
  Users,
  BookOpen,
  Award,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Star,
  Calendar,
  TrendingUp,
  MessageSquare,
  FileText,
  BarChart3,
} from "lucide-react";
import Footer from "@/components/Footer";

const AdminTrainers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const trainers = [
    {
      id: "1",
      name: "Sarah Wilson",
      email: "sarah.wilson@skillguide.com",
      phone: "+1 (555) 234-5678",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b287?w=32&h=32&fit=crop&crop=face",
      status: "active",
      specialty: "Frontend Development",
      experience: "5 years",
      rating: 4.8,
      reviews: 142,
      studentsCount: 89,
      coursesCount: 6,
      completionRate: 92,
      joinDate: "2023-06-15",
      lastActive: "2 hours ago",
      certifications: [
        "React Certified",
        "JavaScript Expert",
        "AWS Solutions Architect",
      ],
      totalEarnings: "$45,280",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.chen@skillguide.com",
      phone: "+1 (555) 345-6789",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      status: "active",
      specialty: "Backend Development",
      experience: "7 years",
      rating: 4.9,
      reviews: 98,
      studentsCount: 67,
      coursesCount: 4,
      completionRate: 88,
      joinDate: "2023-03-20",
      lastActive: "1 day ago",
      certifications: [
        "Node.js Expert",
        "Docker Certified",
        "Kubernetes Admin",
      ],
      totalEarnings: "$38,750",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@skillguide.com",
      phone: "+1 (555) 456-7890",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      status: "pending",
      specialty: "Data Science",
      experience: "4 years",
      rating: 0,
      reviews: 0,
      studentsCount: 0,
      coursesCount: 0,
      completionRate: 0,
      joinDate: "2024-01-18",
      lastActive: "5 hours ago",
      certifications: [
        "Python Certified",
        "Machine Learning Expert",
        "Data Analytics",
      ],
      totalEarnings: "$0",
    },
    {
      id: "4",
      name: "David Thompson",
      email: "david.thompson@skillguide.com",
      phone: "+1 (555) 567-8901",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      status: "suspended",
      specialty: "DevOps",
      experience: "6 years",
      rating: 4.2,
      reviews: 76,
      studentsCount: 34,
      coursesCount: 3,
      completionRate: 75,
      joinDate: "2023-09-10",
      lastActive: "1 week ago",
      certifications: ["AWS DevOps", "Jenkins Expert", "Terraform Certified"],
      totalEarnings: "$22,150",
    },
    {
      id: "5",
      name: "Lisa Chang",
      email: "lisa.chang@skillguide.com",
      phone: "+1 (555) 678-9012",
      avatar:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=32&h=32&fit=crop&crop=face",
      status: "active",
      specialty: "Mobile Development",
      experience: "3 years",
      rating: 4.7,
      reviews: 54,
      studentsCount: 45,
      coursesCount: 2,
      completionRate: 94,
      joinDate: "2023-11-05",
      lastActive: "3 hours ago",
      certifications: ["React Native", "Flutter Expert", "iOS Development"],
      totalEarnings: "$18,900",
    },
  ];

  const pendingApplications = [
    {
      id: "app1",
      name: "Jessica Martinez",
      email: "jessica.martinez@email.com",
      specialty: "UI/UX Design",
      experience: "4 years",
      appliedDate: "2024-01-15",
      documents: ["Resume", "Portfolio", "Certifications"],
    },
    {
      id: "app2",
      name: "Robert Kim",
      email: "robert.kim@email.com",
      specialty: "Cybersecurity",
      experience: "8 years",
      appliedDate: "2024-01-12",
      documents: ["Resume", "Security Clearance", "Certifications"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "suspended":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesSearch =
      trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || trainer.status === selectedStatus;
    const matchesSpecialty =
      selectedSpecialty === "all" || trainer.specialty === selectedSpecialty;

    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  const stats = [
    {
      title: "Total Trainers",
      value: trainers.length.toString(),
      icon: UserCheck,
      color: "text-blue-600",
      description: "Registered trainers",
    },
    {
      title: "Active Trainers",
      value: trainers.filter((t) => t.status === "active").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      description: "Currently teaching",
    },
    {
      title: "Pending Applications",
      value: pendingApplications.length.toString(),
      icon: Clock,
      color: "text-yellow-600",
      description: "Awaiting review",
    },
    {
      title: "Average Rating",
      value: "4.7",
      icon: Star,
      color: "text-purple-600",
      description: "Overall trainer rating",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Trainer Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage trainer applications, performance, and platform access.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Trainer
            </Button>
          </div>
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
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.description}
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="trainers" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trainers">Active Trainers</TabsTrigger>
            <TabsTrigger value="applications">
              Pending Applications ({pendingApplications.length})
            </TabsTrigger>
          </TabsList>

          {/* Active Trainers Tab */}
          <TabsContent value="trainers" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Search and Filter Trainers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search trainers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedSpecialty}
                    onValueChange={setSelectedSpecialty}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="Frontend Development">
                        Frontend Development
                      </SelectItem>
                      <SelectItem value="Backend Development">
                        Backend Development
                      </SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                      <SelectItem value="Mobile Development">
                        Mobile Development
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trainers Table */}
            <Card>
              <CardHeader>
                <CardTitle>Trainer Overview</CardTitle>
                <CardDescription>
                  Comprehensive view of all platform trainers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Trainer</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Students</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Earnings</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrainers.map((trainer) => (
                      <TableRow key={trainer.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={trainer.avatar} />
                              <AvatarFallback>
                                {trainer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900">
                                {trainer.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {trainer.email}
                              </div>
                              <div className="text-xs text-gray-400">
                                {trainer.experience} experience
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm font-medium">
                              {trainer.specialty}
                            </div>
                            <div className="text-xs text-gray-500">
                              {trainer.certifications.length} certifications
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(trainer.status)}
                            <Badge className={getStatusColor(trainer.status)}>
                              {trainer.status}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {trainer.lastActive}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {trainer.coursesCount} courses
                            </div>
                            <div className="text-sm text-gray-500">
                              {trainer.completionRate}% completion
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-center">
                            <div className="font-medium">
                              {trainer.studentsCount}
                            </div>
                            <div className="text-xs text-gray-500">
                              students
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-medium">
                              {trainer.rating > 0 ? trainer.rating : "—"}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {trainer.reviews > 0
                              ? `${trainer.reviews} reviews`
                              : "No reviews"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-green-600">
                            {trainer.totalEarnings}
                          </div>
                          <div className="text-xs text-gray-500">total</div>
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
                              <MessageSquare className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pending Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pendingApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {application.name}
                        </CardTitle>
                        <CardDescription>{application.email}</CardDescription>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Pending Review
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Specialty:</span>
                        <br />
                        {application.specialty}
                      </div>
                      <div>
                        <span className="font-medium">Experience:</span>
                        <br />
                        {application.experience}
                      </div>
                    </div>

                    <div>
                      <span className="font-medium text-sm">Documents:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {application.documents.map((doc, index) => (
                          <Badge key={index} variant="outline">
                            <FileText className="w-3 h-3 mr-1" />
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-gray-500">
                      Applied:{" "}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button size="sm" className="flex-1">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2" />
                Trainer Operations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Manage trainer accounts and permissions.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Bulk Invite Trainers
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Performance Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Training
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Analytics & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                View trainer performance and platform analytics.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Performance Dashboard
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="w-4 h-4 mr-2" />
                  Recognition Program
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Support & Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Handle trainer support requests and platform issues.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Support Tickets
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Issue Resolution
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Account Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminTrainers;
