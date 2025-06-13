import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  BookOpen,
  Code,
  Zap,
  Users,
  Settings,
  FileText,
  Download,
  ExternalLink,
  Clock,
  Star,
} from "lucide-react";
import { useState } from "react";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const documentationSections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Zap,
      description: "Quick start guides and basic setup",
      articles: [
        {
          title: "Platform Overview",
          description: "Understanding the SkillGuide ecosystem",
          difficulty: "Beginner",
          readTime: "5 min",
          featured: true,
        },
        {
          title: "Account Setup & Profile",
          description: "Creating and configuring your account",
          difficulty: "Beginner",
          readTime: "3 min",
          featured: false,
        },
        {
          title: "First Assessment Walkthrough",
          description: "Step-by-step guide to your first test",
          difficulty: "Beginner",
          readTime: "8 min",
          featured: true,
        },
        {
          title: "Navigation & Interface",
          description: "Using the platform effectively",
          difficulty: "Beginner",
          readTime: "4 min",
          featured: false,
        },
      ],
    },
    {
      id: "assessments",
      title: "Assessments & Tests",
      icon: FileText,
      description: "Everything about taking and managing assessments",
      articles: [
        {
          title: "Assessment Types & Formats",
          description: "Understanding different test formats",
          difficulty: "Intermediate",
          readTime: "6 min",
          featured: true,
        },
        {
          title: "Proctoring Guidelines",
          description: "What to expect during proctored exams",
          difficulty: "Beginner",
          readTime: "7 min",
          featured: false,
        },
        {
          title: "Technical Requirements",
          description: "System requirements for assessments",
          difficulty: "Beginner",
          readTime: "3 min",
          featured: true,
        },
        {
          title: "Scoring & Results",
          description: "How assessments are scored and reported",
          difficulty: "Intermediate",
          readTime: "5 min",
          featured: false,
        },
      ],
    },
    {
      id: "batch-management",
      title: "Batch Management",
      icon: Users,
      description: "Managing batches and group assessments",
      articles: [
        {
          title: "Joining a Batch",
          description: "How to join and participate in batches",
          difficulty: "Beginner",
          readTime: "4 min",
          featured: false,
        },
        {
          title: "Batch-specific Assessments",
          description: "Understanding batch-based testing",
          difficulty: "Intermediate",
          readTime: "6 min",
          featured: true,
        },
        {
          title: "Group Analytics",
          description: "Viewing batch performance metrics",
          difficulty: "Advanced",
          readTime: "8 min",
          featured: false,
        },
        {
          title: "Collaborative Features",
          description: "Working with peers in your batch",
          difficulty: "Intermediate",
          readTime: "5 min",
          featured: false,
        },
      ],
    },
    {
      id: "api-integration",
      title: "API & Integration",
      icon: Code,
      description: "Technical documentation for developers",
      articles: [
        {
          title: "Authentication API",
          description: "Implementing OAuth and API keys",
          difficulty: "Advanced",
          readTime: "12 min",
          featured: true,
        },
        {
          title: "Assessment API",
          description: "Programmatic access to assessments",
          difficulty: "Advanced",
          readTime: "15 min",
          featured: false,
        },
        {
          title: "Webhook Configuration",
          description: "Setting up real-time notifications",
          difficulty: "Advanced",
          readTime: "10 min",
          featured: true,
        },
        {
          title: "Data Export APIs",
          description: "Exporting results and analytics",
          difficulty: "Advanced",
          readTime: "8 min",
          featured: false,
        },
      ],
    },
  ];

  const quickStartGuides = [
    {
      title: "5-Minute Quick Start",
      description: "Get up and running in 5 minutes",
      steps: 5,
      time: "5 min",
    },
    {
      title: "Complete Setup Guide",
      description: "Comprehensive platform configuration",
      steps: 12,
      time: "15 min",
    },
    {
      title: "Assessment Best Practices",
      description: "Tips for optimal test performance",
      steps: 8,
      time: "10 min",
    },
  ];

  const resources = [
    {
      title: "API Reference",
      description: "Complete API documentation",
      type: "External",
      icon: ExternalLink,
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      type: "Video",
      icon: Download,
    },
    {
      title: "PDF Guides",
      description: "Downloadable documentation",
      type: "Download",
      icon: Download,
    },
    {
      title: "Code Examples",
      description: "Implementation examples",
      type: "Code",
      icon: Code,
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Comprehensive guides and technical documentation for SkillGuide
            platform
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Quick Start Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Quick Start Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickStartGuides.map((guide, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <BookOpen className="w-8 h-8 text-skillguide-purple" />
                    <Badge variant="outline">{guide.time}</Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {guide.steps} steps
                    </span>
                    <Button variant="outline" size="sm">
                      Start Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Documentation */}
        <Tabs defaultValue="getting-started" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            {documentationSections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {documentationSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {section.title}
                    </h2>
                    <p className="text-gray-600">{section.description}</p>
                  </div>

                  <div className="space-y-4">
                    {section.articles.map((article, index) => (
                      <Card
                        key={index}
                        className={`hover:shadow-md transition-shadow cursor-pointer ${
                          article.featured
                            ? "ring-2 ring-skillguide-purple"
                            : ""
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {article.title}
                                </h3>
                                {article.featured && (
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <p className="text-gray-600 mb-3">
                                {article.description}
                              </p>
                              <div className="flex items-center space-x-4">
                                <Badge
                                  className={getDifficultyColor(
                                    article.difficulty,
                                  )}
                                >
                                  {article.difficulty}
                                </Badge>
                                <span className="flex items-center text-sm text-gray-500">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {article.readTime}
                                </span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Read
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {resources.map((resource, index) => {
                        const Icon = resource.icon;
                        return (
                          <div key={index}>
                            <div className="flex items-start space-x-3">
                              <Icon className="w-5 h-5 text-skillguide-purple flex-shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {resource.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {resource.description}
                                </p>
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-xs"
                                >
                                  {resource.type}
                                </Badge>
                              </div>
                            </div>
                            {index < resources.length - 1 && (
                              <Separator className="mt-4" />
                            )}
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Need Help?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Help Center
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Community Forum
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Contact Support
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Documentation;
