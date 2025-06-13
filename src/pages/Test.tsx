import Navigation from "@/components/Navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Clock,
  Users,
  Award,
  Play,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  Brain,
  Zap,
  Star,
} from "lucide-react";
import { useState } from "react";

const Test = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const batches = [
    {
      id: "batch-2024-01",
      name: "January 2024 - Frontend Development",
      participants: 45,
      subjects: [
        "JavaScript Fundamentals",
        "React.js",
        "CSS & Styling",
        "Web APIs",
        "Testing",
      ],
    },
    {
      id: "batch-2024-02",
      name: "February 2024 - Full Stack Development",
      participants: 38,
      subjects: [
        "Node.js",
        "Express.js",
        "Database Design",
        "REST APIs",
        "Authentication",
      ],
    },
    {
      id: "batch-2024-03",
      name: "March 2024 - Data Science",
      participants: 32,
      subjects: [
        "Python Programming",
        "Data Analysis",
        "Machine Learning",
        "Statistics",
        "Data Visualization",
      ],
    },
    {
      id: "batch-2024-04",
      name: "April 2024 - DevOps Engineering",
      participants: 28,
      subjects: [
        "Linux Administration",
        "Docker & Containers",
        "CI/CD Pipelines",
        "Cloud Platforms",
        "Monitoring",
      ],
    },
  ];

  const testTypes = [
    {
      id: "practice",
      title: "Practice Test",
      description: "Unlimited attempts, immediate feedback",
      duration: "30 minutes",
      questions: 20,
      icon: BookOpen,
      difficulty: "All Levels",
      features: ["Instant Results", "Detailed Explanations", "Retake Anytime"],
    },
    {
      id: "assessment",
      title: "Formal Assessment",
      description: "Proctored exam with certification",
      duration: "90 minutes",
      questions: 50,
      icon: Award,
      difficulty: "Intermediate",
      features: ["Proctored", "Certificate", "Official Score"],
    },
    {
      id: "mock",
      title: "Mock Interview",
      description: "Simulated interview experience",
      duration: "45 minutes",
      questions: 15,
      icon: Users,
      difficulty: "Advanced",
      features: ["AI Evaluation", "Video Recording", "Feedback Report"],
    },
  ];

  const upcomingTests = [
    {
      subject: "React.js Advanced Concepts",
      date: "2024-01-25",
      time: "10:00 AM",
      type: "Formal Assessment",
      registered: true,
    },
    {
      subject: "JavaScript ES6+ Features",
      date: "2024-01-28",
      time: "2:00 PM",
      type: "Practice Test",
      registered: false,
    },
    {
      subject: "Node.js Backend Development",
      date: "2024-02-02",
      time: "9:00 AM",
      type: "Mock Interview",
      registered: true,
    },
  ];

  const recentResults = [
    {
      subject: "CSS Grid & Flexbox",
      score: 92,
      maxScore: 100,
      date: "2024-01-20",
      type: "Practice Test",
      status: "Passed",
    },
    {
      subject: "React Hooks",
      score: 78,
      maxScore: 100,
      date: "2024-01-18",
      type: "Formal Assessment",
      status: "Passed",
    },
    {
      subject: "Web APIs Integration",
      score: 65,
      maxScore: 100,
      date: "2024-01-15",
      type: "Mock Interview",
      status: "Needs Improvement",
    },
  ];

  const currentBatch = batches.find((batch) => batch.id === selectedBatch);
  const availableSubjects = currentBatch ? currentBatch.subjects : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Passed":
        return "bg-green-100 text-green-800";
      case "Needs Improvement":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "All Levels":
        return "bg-blue-100 text-blue-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Knowledge Assessment
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Test your knowledge and track your learning progress
          </p>

          {/* Batch and Subject Selection */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Your Batch
              </label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      {batch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Subject
              </label>
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                disabled={!selectedBatch}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {currentBatch && (
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                <Users className="w-4 h-4 mr-2" />
                {currentBatch.participants} participants
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                <BookOpen className="w-4 h-4 mr-2" />
                {currentBatch.subjects.length} subjects
              </Badge>
            </div>
          )}
        </div>

        <Tabs defaultValue="take-test" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="take-test"
              className="flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Take Test</span>
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Upcoming</span>
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="flex items-center space-x-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Results</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex items-center space-x-2"
            >
              <Target className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Take Test Tab */}
          <TabsContent value="take-test" className="space-y-8">
            {selectedBatch && selectedSubject ? (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Available Tests for {selectedSubject}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testTypes.map((test) => {
                    const Icon = test.icon;
                    return (
                      <Card
                        key={test.id}
                        className="hover:shadow-lg transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Icon className="w-8 h-8 text-skillguide-purple" />
                            <Badge
                              className={getDifficultyColor(test.difficulty)}
                            >
                              {test.difficulty}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl">
                            {test.title}
                          </CardTitle>
                          <CardDescription>{test.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{test.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{test.questions} questions</span>
                            </div>
                          </div>

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">
                              Features:
                            </h4>
                            <ul className="space-y-1">
                              {test.features.map((feature, index) => (
                                <li
                                  key={index}
                                  className="flex items-center text-sm text-gray-600"
                                >
                                  <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button className="w-full" size="lg">
                            <Play className="w-4 h-4 mr-2" />
                            Start Test
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select Batch and Subject
                  </h3>
                  <p className="text-gray-600">
                    Choose your batch and subject to see available tests
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Upcoming Tests Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Tests</h2>
            <div className="space-y-4">
              {upcomingTests.map((test, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {test.subject}
                          </h3>
                          <Badge variant="outline">{test.type}</Badge>
                          {test.registered && (
                            <Badge className="bg-green-100 text-green-800">
                              Registered
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{test.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{test.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!test.registered && (
                          <Button variant="outline" size="sm">
                            Register
                          </Button>
                        )}
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Results</h2>
            <div className="space-y-4">
              {recentResults.map((result, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-3">
                          <h3 className="font-semibold text-gray-900">
                            {result.subject}
                          </h3>
                          <Badge variant="outline">{result.type}</Badge>
                          <Badge className={getStatusColor(result.status)}>
                            {result.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{result.date}</span>
                          </div>
                          <div className="flex items-center text-lg font-semibold">
                            <Target className="w-5 h-5 mr-2 text-skillguide-purple" />
                            <span>
                              {result.score}/{result.maxScore}
                            </span>
                          </div>
                        </div>
                        <div className="w-full max-w-md">
                          <Progress
                            value={(result.score / result.maxScore) * 100}
                            className="h-2"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Report
                        </Button>
                        <Button size="sm">Retake</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Performance Analytics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tests Completed</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                    <FileText className="w-8 h-8 text-skillguide-purple" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">82%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Certificates</p>
                      <p className="text-2xl font-bold text-gray-900">8</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Streak Days</p>
                      <p className="text-2xl font-bold text-gray-900">15</p>
                    </div>
                    <Zap className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>
                  Your performance across different subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["React.js", "JavaScript", "CSS", "Node.js", "Testing"].map(
                    (subject, index) => {
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
                    },
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Test;
