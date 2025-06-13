import Navigation from "@/components/Navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Download,
  Users,
  Trophy,
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
  Eye,
  FileDown,
  GraduationCap,
  Award,
  Target,
  Clock,
  MessageSquare,
  CheckCircle,
  FileCheck,
  History,
} from "lucide-react";

const Reports = () => {
  const reportTypes = [
    {
      id: "individual",
      title: "Individual Candidate Report",
      description:
        "Detailed performance report for each candidate including scores, progress, and recommendations",
      icon: Users,
      features: [
        "Candidate Information",
        "Certification Details",
        "Course Completion %",
        "MCQ & Project Scores",
        "AI Recommendations",
        "Feedback History",
      ],
      format: "PDF/Excel",
      estimatedTime: "2-3 minutes",
      sampleData: {
        candidate: "John Doe",
        batch: "Java Batch 001",
        overallScore: "85%",
        completion: "78%",
        rank: "3rd",
      },
    },
    {
      id: "batch",
      title: "Batch-wise Score Card",
      description:
        "Performance overview for each training batch with comparative analysis",
      icon: GraduationCap,
      features: [
        "Candidate List",
        "Average Scores",
        "Completion Rates",
        "Performance Trends",
        "Batch Comparison",
        "Success Metrics",
      ],
      format: "PDF/Excel",
      estimatedTime: "3-5 minutes",
      sampleData: {
        batch: "Java Batch 001",
        candidates: 28,
        avgScore: "82%",
        completion: "89%",
        rank: "2nd",
      },
    },
    {
      id: "college",
      title: "College-wise Score Card",
      description:
        "Compare performance of candidates from different educational institutions",
      icon: Award,
      features: [
        "College Rankings",
        "Student Performance",
        "Average Scores",
        "Completion Rates",
        "Top Performers",
        "Institutional Analysis",
      ],
      format: "PDF/Excel",
      estimatedTime: "4-6 minutes",
      sampleData: {
        college: "ABC Engineering College",
        students: 45,
        avgScore: "87%",
        completion: "92%",
        rank: "1st",
      },
    },
    {
      id: "topper",
      title: "Topper List",
      description:
        "List of top-performing candidates, especially first-attempt clearances",
      icon: Trophy,
      features: [
        "Top Performers",
        "First Attempt Clearances",
        "Score Rankings",
        "Certification Details",
        "Achievement Timeline",
        "Success Stories",
      ],
      format: "PDF/Excel",
      estimatedTime: "1-2 minutes",
      sampleData: {
        topCandidate: "Alice Johnson",
        score: "96%",
        firstAttempt: "Yes",
        batch: "Data Engineering",
        achievements: 5,
      },
    },
    {
      id: "trainer",
      title: "Trainer Feedback Analysis",
      description:
        "Analyze feedback provided for trainers and identify improvement areas",
      icon: MessageSquare,
      features: [
        "Trainer Ratings",
        "Feedback Analytics",
        "Improvement Areas",
        "Batch Comparisons",
        "Performance Trends",
        "Action Items",
      ],
      format: "PDF/Excel",
      estimatedTime: "3-4 minutes",
      sampleData: {
        trainer: "Dr. Smith",
        rating: "4.8/5",
        feedback: 156,
        satisfaction: "94%",
        batches: 3,
      },
    },
    {
      id: "comparison",
      title: "Batch Comparison Report",
      description:
        "Compare performance across different batches and training programs",
      icon: BarChart3,
      features: [
        "Cross-batch Analysis",
        "Performance Metrics",
        "Success Rates",
        "Improvement Areas",
        "Best Practices",
        "Recommendations",
      ],
      format: "PDF/Excel",
      estimatedTime: "5-7 minutes",
      sampleData: {
        totalBatches: 15,
        topBatch: "Data Engineering 003",
        avgImprovement: "23%",
        successRate: "88%",
        trends: "Positive",
      },
    },
  ];

  const recentReports = [
    {
      name: "Java Batch 001 - Performance Report",
      type: "Batch Report",
      date: "2024-01-15",
      status: "completed",
      size: "2.3 MB",
      format: "PDF",
      requestedBy: "Admin",
    },
    {
      name: "College Comparison Analysis",
      type: "College Report",
      date: "2024-01-14",
      status: "completed",
      size: "1.8 MB",
      format: "Excel",
      requestedBy: "HR Manager",
    },
    {
      name: "Top Performers Q1 2024",
      type: "Topper List",
      date: "2024-01-13",
      status: "completed",
      size: "956 KB",
      format: "PDF",
      requestedBy: "Training Head",
    },
    {
      name: "Trainer Feedback Summary",
      type: "Trainer Report",
      date: "2024-01-12",
      status: "processing",
      size: "1.2 MB",
      format: "PDF",
      requestedBy: "Quality Team",
    },
    {
      name: "Monthly Batch Comparison",
      type: "Comparison Report",
      date: "2024-01-11",
      status: "failed",
      size: "0 KB",
      format: "Excel",
      requestedBy: "Analytics Team",
    },
  ];

  const handleDownloadReport = (reportType: string, format: string) => {
    console.log(`Downloading ${reportType} report in ${format} format`);
  };

  const handlePreviewReport = (reportType: string) => {
    console.log(`Previewing ${reportType} report`);
  };

  const handleGenerateReport = () => {
    console.log("Generating custom report...");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800">
            <Target className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Reports Center
          </h1>
          <p className="text-gray-600">
            Generate, download, and manage comprehensive training reports
          </p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="custom">Custom Generator</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            <TabsTrigger value="history">Report History</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <Card
                    key={report.id}
                    className="hover:shadow-lg transition-shadow duration-300 border-skillguide-200"
                  >
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-skillguide-gradient p-2 rounded-lg">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {report.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">{report.format}</Badge>
                            <Badge variant="secondary">
                              <Clock className="w-3 h-3 mr-1" />
                              {report.estimatedTime}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <CardDescription>{report.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">
                            Includes:
                          </h4>
                          <div className="grid grid-cols-2 gap-1">
                            {report.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center text-xs text-gray-600"
                              >
                                <div className="w-1 h-1 bg-skillguide-primary rounded-full mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-skillguide-50 p-3 rounded-lg">
                          <h5 className="font-semibold text-xs mb-1">
                            Sample Data:
                          </h5>
                          <div className="text-xs text-gray-600 space-y-1">
                            {Object.entries(report.sampleData).map(
                              ([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="capitalize">
                                    {key.replace(/([A-Z])/g, " $1")}:
                                  </span>
                                  <span className="font-medium">{value}</span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePreviewReport(report.id)}
                            className="flex-1"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleDownloadReport(report.id, "PDF")
                            }
                            className="flex-1 bg-skillguide-gradient hover:bg-skillguide-gradient-dark"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileDown className="w-5 h-5 mr-2 text-skillguide-primary" />
                  Custom Report Generator
                </CardTitle>
                <CardDescription>
                  Create customized reports with specific parameters and filters
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="reportType">Report Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          {reportTypes.map((report) => (
                            <SelectItem key={report.id} value={report.id}>
                              {report.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="batch">Batch/Group Selection</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch or group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Batches</SelectItem>
                          <SelectItem value="java001">
                            Java Batch 001
                          </SelectItem>
                          <SelectItem value="net002">.NET Batch 002</SelectItem>
                          <SelectItem value="data003">
                            Data Engineering 003
                          </SelectItem>
                          <SelectItem value="active">
                            Active Batches Only
                          </SelectItem>
                          <SelectItem value="completed">
                            Completed Batches Only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Input type="date" placeholder="Start date" />
                          <Label className="text-xs text-gray-500">
                            From Date
                          </Label>
                        </div>
                        <div>
                          <Input type="date" placeholder="End date" />
                          <Label className="text-xs text-gray-500">
                            To Date
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="format">Export Format</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">
                            PDF - Formatted Report
                          </SelectItem>
                          <SelectItem value="excel">
                            Excel - Data Spreadsheet
                          </SelectItem>
                          <SelectItem value="csv">CSV - Raw Data</SelectItem>
                          <SelectItem value="json">
                            JSON - API Format
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <Label>Advanced Filters</Label>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="completed" />
                          <label htmlFor="completed" className="text-sm">
                            Only completed candidates
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="firstAttempt" />
                          <label htmlFor="firstAttempt" className="text-sm">
                            First attempt clearances only
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="certified" />
                          <label htmlFor="certified" className="text-sm">
                            Certified candidates only
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="highPerformers" />
                          <label htmlFor="highPerformers" className="text-sm">
                            Top 10% performers
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="includeDropouts" />
                          <label htmlFor="includeDropouts" className="text-sm">
                            Include dropout analysis
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="minScore">Performance Criteria</Label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div>
                          <Input
                            type="number"
                            placeholder="Min Score"
                            min="0"
                            max="100"
                          />
                          <Label className="text-xs text-gray-500">
                            Minimum Score (%)
                          </Label>
                        </div>
                        <div>
                          <Input
                            type="number"
                            placeholder="Min Completion"
                            min="0"
                            max="100"
                          />
                          <Label className="text-xs text-gray-500">
                            Min Completion (%)
                          </Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>Report Delivery</Label>
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="instant"
                            name="delivery"
                            defaultChecked
                          />
                          <label htmlFor="instant" className="text-sm">
                            Instant download
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="email" name="delivery" />
                          <label htmlFor="email" className="text-sm">
                            Send via email
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="schedule" name="delivery" />
                          <label htmlFor="schedule" className="text-sm">
                            Schedule for later
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleGenerateReport}
                        className="w-full bg-skillguide-gradient hover:bg-skillguide-gradient-dark text-lg py-6"
                      >
                        <FileDown className="w-5 h-5 mr-2" />
                        Generate Custom Report
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-skillguide-primary" />
                  Scheduled Reports
                </CardTitle>
                <CardDescription>
                  Manage automated report generation schedules
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No Scheduled Reports
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Create automated reports that generate at regular intervals
                  </p>
                  <Button className="bg-skillguide-gradient hover:bg-skillguide-gradient-dark">
                    Create Schedule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <History className="w-5 h-5 mr-2 text-skillguide-primary" />
                    Report History
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </CardTitle>
                <CardDescription>
                  View and download previously generated reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <FileCheck className="w-8 h-8 text-skillguide-primary" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {report.name}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{report.type}</span>
                            <span>{report.date}</span>
                            <span>{report.size}</span>
                            <span>by {report.requestedBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(report.status)}
                        {report.status === "completed" && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                        {report.status === "failed" && (
                          <Button size="sm" variant="outline">
                            Retry
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
