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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  Settings,
  User,
  Lightbulb,
  Timer,
  Eye,
  RotateCcw,
  Gauge,
  Flame,
  Heart,
  Sparkles,
  ArrowRight,
  BookmarkPlus,
} from "lucide-react";
import { useState, useEffect } from "react";

const Test = () => {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [personalizedMode, setPersonalizedMode] = useState(true);
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(true);
  const [showPersonalization, setShowPersonalization] = useState(false);

  // User personalization data
  const [userPreferences, setUserPreferences] = useState({
    difficulty: "adaptive",
    timePreference: "morning",
    feedbackLevel: "detailed",
    questionDisplay: "single",
    learningStyle: "visual",
    streakGoal: 7,
    practiceReminders: true,
    adaptiveTiming: true,
    personalizedRecommendations: true,
  });

  // User performance data for personalization
  const [userAnalytics, setUserAnalytics] = useState({
    totalTests: 24,
    averageScore: 82,
    streakDays: 5,
    preferredTime: "morning",
    strongSubjects: ["React.js", "JavaScript"],
    weakSubjects: ["Node.js", "Testing"],
    learningVelocity: "fast",
    confidenceLevel: 0.78,
    lastActive: "2024-01-20",
  });

  const batches = [
    {
      id: "batch-2024-01",
      name: "January 2024 - Frontend Development",
      participants: 45,
      personalMatch: 95, // How well this batch matches user preferences
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
      personalMatch: 78,
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
      personalMatch: 45,
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
      personalMatch: 67,
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
      duration: userPreferences.adaptiveTiming ? "25-35 minutes" : "30 minutes",
      questions: 20,
      icon: BookOpen,
      difficulty: "All Levels",
      personalizedFeatures: [
        "Adaptive Difficulty",
        "Instant AI Feedback",
        "Progress Tracking",
      ],
      features: ["Instant Results", "Detailed Explanations", "Retake Anytime"],
      recommendation: getUserRecommendation("practice"),
    },
    {
      id: "assessment",
      title: "Formal Assessment",
      description: "Proctored exam with certification",
      duration: "90 minutes",
      questions: 50,
      icon: Award,
      difficulty: "Intermediate",
      personalizedFeatures: [
        "Performance Prediction",
        "Optimal Timing",
        "Confidence Boost",
      ],
      features: ["Proctored", "Certificate", "Official Score"],
      recommendation: getUserRecommendation("assessment"),
    },
    {
      id: "mock",
      title: "Mock Interview",
      description: "Simulated interview experience",
      duration: "45 minutes",
      questions: 15,
      icon: Users,
      difficulty: "Advanced",
      personalizedFeatures: [
        "Industry Simulation",
        "Behavioral Analysis",
        "Improvement Plan",
      ],
      features: ["AI Evaluation", "Video Recording", "Feedback Report"],
      recommendation: getUserRecommendation("mock"),
    },
  ];

  const upcomingTests = [
    {
      subject: "React.js Advanced Concepts",
      date: "2024-01-25",
      time: "10:00 AM",
      type: "Formal Assessment",
      registered: true,
      personalScore: 88, // Predicted score based on user data
      difficulty: "optimal", // Difficulty level for this user
      preparedness: "high",
    },
    {
      subject: "JavaScript ES6+ Features",
      date: "2024-01-28",
      time: "2:00 PM",
      type: "Practice Test",
      registered: false,
      personalScore: 92,
      difficulty: "optimal",
      preparedness: "very-high",
    },
    {
      subject: "Node.js Backend Development",
      date: "2024-02-02",
      time: "9:00 AM",
      type: "Mock Interview",
      registered: true,
      personalScore: 65,
      difficulty: "challenging",
      preparedness: "low",
    },
  ];

  const recentResults = [
    {
      subject: "CSS Grid & Flexbox",
      score: 92,
      maxScore: 100,
      date: "2024-01-20",
      type: "Practice Test",
      status: "Excellent",
      improvement: "+15%",
      personalInsights: "Strong visual learning pattern detected",
    },
    {
      subject: "React Hooks",
      score: 78,
      maxScore: 100,
      date: "2024-01-18",
      type: "Formal Assessment",
      status: "Good",
      improvement: "+8%",
      personalInsights: "Consider more practice with useEffect",
    },
    {
      subject: "Web APIs Integration",
      score: 65,
      maxScore: 100,
      date: "2024-01-15",
      type: "Mock Interview",
      status: "Needs Focus",
      improvement: "-3%",
      personalInsights: "Recommend additional API practice sessions",
    },
  ];

  // Personalized recommendations based on user data
  const personalizedRecommendations = [
    {
      type: "practice",
      title: "Morning Practice Session",
      description: "You perform 23% better in morning sessions",
      action: "Schedule 9 AM practice",
      priority: "high",
      icon: Clock,
    },
    {
      type: "subject",
      title: "Focus on Node.js",
      description: "Improve weak area with targeted practice",
      action: "Take Node.js practice test",
      priority: "medium",
      icon: Target,
    },
    {
      type: "streak",
      title: "Maintain Learning Streak",
      description: "You're 2 days away from your 7-day goal",
      action: "Take any practice test today",
      priority: "high",
      icon: Flame,
    },
    {
      type: "difficulty",
      title: "Try Advanced Level",
      description: "Your scores suggest you're ready for harder challenges",
      action: "Enable advanced difficulty",
      priority: "low",
      icon: TrendingUp,
    },
  ];

  function getUserRecommendation(testType: string) {
    if (!personalizedMode) return "";

    switch (testType) {
      case "practice":
        if (userAnalytics.averageScore > 85) {
          return "Perfect for maintaining your excellent streak!";
        }
        return "Great choice to build confidence and skills";
      case "assessment":
        if (userAnalytics.streakDays >= 5) {
          return "You're well-prepared! Predicted success rate: 89%";
        }
        return "Consider more practice before attempting";
      case "mock":
        if (userAnalytics.strongSubjects.length >= 2) {
          return "Excellent way to showcase your strong skills";
        }
        return "Challenge yourself and identify growth areas";
      default:
        return "";
    }
  }

  const currentBatch = batches.find((batch) => batch.id === selectedBatch);
  const availableSubjects = currentBatch ? currentBatch.subjects : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Good":
        return "bg-blue-100 text-blue-800";
      case "Needs Focus":
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

  const getPreparednessColor = (preparedness: string) => {
    switch (preparedness) {
      case "very-high":
        return "bg-green-100 text-green-800";
      case "high":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Sort batches by personal match when personalized mode is on
  const sortedBatches = personalizedMode
    ? [...batches].sort((a, b) => b.personalMatch - a.personalMatch)
    : batches;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Personalization Toggle */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mr-4">
              Knowledge Assessment
            </h1>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPersonalization(!showPersonalization)}
              className="ml-4"
            >
              <Settings className="w-4 h-4 mr-2" />
              Personalize
            </Button>
          </div>

          {/* Personalization Panel */}
          {showPersonalization && (
            <Card className="max-w-4xl mx-auto mb-8 border-skillguide-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-skillguide-600" />
                  Personalization Settings
                </CardTitle>
                <CardDescription>
                  Customize your testing experience for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="personalizedMode">
                        Personalized Experience
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get AI-powered recommendations and adaptive content
                      </p>
                    </div>
                    <Switch
                      id="personalizedMode"
                      checked={personalizedMode}
                      onCheckedChange={setPersonalizedMode}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="adaptiveDifficulty">
                        Adaptive Difficulty
                      </Label>
                      <p className="text-sm text-gray-500">
                        Questions adjust based on your performance
                      </p>
                    </div>
                    <Switch
                      id="adaptiveDifficulty"
                      checked={adaptiveDifficulty}
                      onCheckedChange={setAdaptiveDifficulty}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <p className="text-xl text-gray-600 mb-8">
            Test your knowledge and track your learning progress
            {personalizedMode && (
              <span className="block text-skillguide-600 text-lg mt-2">
                ✨ Personalized for your learning style and goals
              </span>
            )}
          </p>

          {/* User Performance Overview */}
          {personalizedMode && (
            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="w-5 h-5 text-blue-600 mr-1" />
                    <span className="text-2xl font-bold text-blue-700">
                      {userAnalytics.averageScore}%
                    </span>
                  </div>
                  <p className="text-xs text-blue-600">Average Score</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Flame className="w-5 h-5 text-orange-600 mr-1" />
                    <span className="text-2xl font-bold text-orange-700">
                      {userAnalytics.streakDays}
                    </span>
                  </div>
                  <p className="text-xs text-orange-600">Day Streak</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-50 to-green-100">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-green-600 mr-1" />
                    <span className="text-2xl font-bold text-green-700">
                      {Math.round(userAnalytics.confidenceLevel * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-green-600">Confidence</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <BookOpen className="w-5 h-5 text-purple-600 mr-1" />
                    <span className="text-2xl font-bold text-purple-700">
                      {userAnalytics.totalTests}
                    </span>
                  </div>
                  <p className="text-xs text-purple-600">Tests Taken</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Batch and Subject Selection */}
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Select Your Batch
                {personalizedMode && (
                  <span className="text-skillguide-600 text-xs ml-1">
                    (Sorted by match)
                  </span>
                )}
              </label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your batch" />
                </SelectTrigger>
                <SelectContent>
                  {sortedBatches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{batch.name}</span>
                        {personalizedMode && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {batch.personalMatch}% match
                          </Badge>
                        )}
                      </div>
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
                      <div className="flex items-center">
                        <span>{subject}</span>
                        {personalizedMode &&
                          userAnalytics.strongSubjects.includes(subject) && (
                            <Star className="w-3 h-3 text-yellow-500 ml-2" />
                          )}
                        {personalizedMode &&
                          userAnalytics.weakSubjects.includes(subject) && (
                            <Target className="w-3 h-3 text-red-500 ml-2" />
                          )}
                      </div>
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
              {personalizedMode && (
                <Badge
                  className={`px-3 py-1 ${
                    currentBatch.personalMatch >= 80
                      ? "bg-green-100 text-green-800"
                      : currentBatch.personalMatch >= 60
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {currentBatch.personalMatch}% personal match
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Personalized Recommendations */}
        {personalizedMode && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-skillguide-600" />
                AI-Powered Recommendations
              </CardTitle>
              <CardDescription>
                Personalized suggestions based on your learning patterns and
                goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {personalizedRecommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
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
                      <Button size="sm" variant="outline" className="w-full">
                        {rec.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

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
                  {personalizedMode && (
                    <span className="block text-lg text-skillguide-600 font-normal mt-1">
                      Optimized for your skill level and preferences
                    </span>
                  )}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {testTypes.map((test) => {
                    const Icon = test.icon;
                    return (
                      <Card
                        key={test.id}
                        className="hover:shadow-lg transition-all duration-300 border-2 hover:border-skillguide-300"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <Icon className="w-8 h-8 text-skillguide-600" />
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

                          {/* Personalized Recommendation */}
                          {personalizedMode && test.recommendation && (
                            <div className="bg-skillguide-50 border border-skillguide-200 rounded-lg p-3 mt-2">
                              <div className="flex items-center">
                                <Lightbulb className="w-4 h-4 text-skillguide-600 mr-2" />
                                <span className="text-sm text-skillguide-700 font-medium">
                                  AI Insight
                                </span>
                              </div>
                              <p className="text-sm text-skillguide-600 mt-1">
                                {test.recommendation}
                              </p>
                            </div>
                          )}
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

                          {/* Standard Features */}
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

                          {/* Personalized Features */}
                          {personalizedMode && (
                            <>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="font-medium text-skillguide-700 flex items-center">
                                  <Sparkles className="w-4 h-4 mr-1" />
                                  Personalized Features:
                                </h4>
                                <ul className="space-y-1">
                                  {test.personalizedFeatures.map(
                                    (feature, index) => (
                                      <li
                                        key={index}
                                        className="flex items-center text-sm text-skillguide-600"
                                      >
                                        <Zap className="w-3 h-3 mr-2 text-skillguide-500" />
                                        {feature}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </>
                          )}

                          <Button
                            className="w-full bg-skillguide-gradient hover:bg-skillguide-gradient-dark"
                            size="lg"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start Test
                            {personalizedMode && (
                              <Sparkles className="w-4 h-4 ml-2" />
                            )}
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
                    {personalizedMode && (
                      <span className="block text-skillguide-600 mt-1">
                        We'll show personalized recommendations for you
                      </span>
                    )}
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
                <Card
                  key={index}
                  className="border-l-4 border-l-skillguide-500"
                >
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
                          {personalizedMode && (
                            <Badge
                              className={getPreparednessColor(
                                test.preparedness,
                              )}
                            >
                              {test.preparedness.replace("-", " ")} ready
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{test.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{test.time}</span>
                          </div>
                          {personalizedMode && (
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-2 text-skillguide-600" />
                              <span className="text-skillguide-600 font-medium">
                                Predicted: {test.personalScore}%
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Personalized preparedness bar */}
                        {personalizedMode && (
                          <div className="mb-2">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs text-gray-600">
                                Preparedness Level
                              </span>
                              <span className="text-xs text-skillguide-600 font-medium">
                                {test.preparedness.replace("-", " ")}
                              </span>
                            </div>
                            <Progress
                              value={
                                test.preparedness === "very-high"
                                  ? 95
                                  : test.preparedness === "high"
                                    ? 80
                                    : test.preparedness === "medium"
                                      ? 60
                                      : 30
                              }
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {!test.registered && (
                          <Button variant="outline" size="sm">
                            Register
                          </Button>
                        )}
                        {personalizedMode && test.preparedness === "low" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-skillguide-600 border-skillguide-300"
                          >
                            <BookmarkPlus className="w-4 h-4 mr-1" />
                            Prep Plan
                          </Button>
                        )}
                        <Button size="sm" className="bg-skillguide-gradient">
                          View Details
                        </Button>
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
                <Card key={index} className="border-l-4 border-l-blue-500">
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
                          {personalizedMode && result.improvement && (
                            <Badge
                              className={
                                result.improvement.startsWith("+")
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }
                            >
                              {result.improvement}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{result.date}</span>
                          </div>
                          <div className="flex items-center text-lg font-semibold">
                            <Target className="w-5 h-5 mr-2 text-skillguide-600" />
                            <span>
                              {result.score}/{result.maxScore}
                            </span>
                          </div>
                        </div>
                        <div className="w-full max-w-md mb-3">
                          <Progress
                            value={(result.score / result.maxScore) * 100}
                            className="h-2"
                          />
                        </div>

                        {/* Personalized Insights */}
                        {personalizedMode && result.personalInsights && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center">
                              <Brain className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm text-blue-700 font-medium">
                                Personal Insight
                              </span>
                            </div>
                            <p className="text-sm text-blue-600 mt-1">
                              {result.personalInsights}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          View Report
                        </Button>
                        <Button size="sm" className="bg-skillguide-gradient">
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Retake
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Performance Analytics
              </h2>
              {personalizedMode && (
                <Badge className="bg-skillguide-100 text-skillguide-700">
                  <Sparkles className="w-4 h-4 mr-1" />
                  AI-Enhanced
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Tests Completed</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userAnalytics.totalTests}
                      </p>
                      {personalizedMode && (
                        <p className="text-xs text-skillguide-600 mt-1">
                          Above average pace
                        </p>
                      )}
                    </div>
                    <FileText className="w-8 h-8 text-skillguide-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userAnalytics.averageScore}%
                      </p>
                      {personalizedMode && (
                        <p className="text-xs text-green-600 mt-1">
                          +12% this month
                        </p>
                      )}
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
                      {personalizedMode && (
                        <p className="text-xs text-skillguide-600 mt-1">
                          2 more achievable
                        </p>
                      )}
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
                      <p className="text-2xl font-bold text-gray-900">
                        {userAnalytics.streakDays}
                      </p>
                      {personalizedMode && (
                        <p className="text-xs text-orange-600 mt-1">
                          2 days to goal
                        </p>
                      )}
                    </div>
                    <Flame className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Subject Performance
                  {personalizedMode && (
                    <Badge variant="outline" className="ml-2">
                      Personalized Insights
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Your performance across different subjects
                  {personalizedMode && " with AI-powered recommendations"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["React.js", "JavaScript", "CSS", "Node.js", "Testing"].map(
                    (subject, index) => {
                      const scores = [95, 87, 92, 58, 73];
                      const isStrong =
                        personalizedMode &&
                        userAnalytics.strongSubjects.includes(subject);
                      const isWeak =
                        personalizedMode &&
                        userAnalytics.weakSubjects.includes(subject);

                      return (
                        <div key={subject} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-900">
                                {subject}
                              </span>
                              {isStrong && (
                                <Star className="w-4 h-4 text-yellow-500 ml-2" />
                              )}
                              {isWeak && (
                                <Target className="w-4 h-4 text-red-500 ml-2" />
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">
                                {scores[index]}%
                              </span>
                              {personalizedMode && isWeak && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <ArrowRight className="w-3 h-3 mr-1" />
                                  Practice
                                </Button>
                              )}
                            </div>
                          </div>
                          <Progress value={scores[index]} className="h-3" />
                          {personalizedMode && isWeak && (
                            <p className="text-xs text-red-600">
                              Focus area: Consider additional practice sessions
                            </p>
                          )}
                          {personalizedMode && isStrong && (
                            <p className="text-xs text-green-600">
                              Strength: Ready for advanced challenges
                            </p>
                          )}
                        </div>
                      );
                    },
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Learning Pattern Analysis (Personalized) */}
            {personalizedMode && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-skillguide-600" />
                    Learning Pattern Analysis
                  </CardTitle>
                  <CardDescription>
                    AI insights into your learning behavior and optimization
                    suggestions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Optimal Performance Time
                        </h4>
                        <p className="text-sm text-green-700">
                          You score 23% higher during{" "}
                          {userAnalytics.preferredTime} sessions (8-11 AM)
                        </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                          <Gauge className="w-4 h-4 mr-2" />
                          Learning Velocity
                        </h4>
                        <p className="text-sm text-blue-700">
                          {userAnalytics.learningVelocity} learner - you grasp
                          concepts quickly
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                          <Heart className="w-4 h-4 mr-2" />
                          Confidence Level
                        </h4>
                        <p className="text-sm text-purple-700">
                          {Math.round(userAnalytics.confidenceLevel * 100)}%
                          confidence - you're on the right track!
                        </p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2" />
                          Next Recommendation
                        </h4>
                        <p className="text-sm text-orange-700">
                          Focus on Node.js for 1 week to boost overall score by
                          ~8%
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Test;
