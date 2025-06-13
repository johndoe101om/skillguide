import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Users,
  GitBranch,
  TrendingUp,
  Brain,
  MessageSquare,
  FileText,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: Users,
      title: "Candidate Management",
      description:
        "Comprehensive candidate information collection and profile management system.",
      features: [
        "Detailed candidate profiles with personal and professional information",
        "Certification and skill tracking (AWS, Azure, NPTEL, etc.)",
        "LinkedIn and GitHub profile integration",
        "Document upload for certificates and credentials",
      ],
    },
    {
      icon: GitBranch,
      title: "Smart Batch Allocation",
      description:
        "Automated batch assignment based on candidate skills and certifications.",
      features: [
        "Java Batch: AWS certification or Java certifications",
        ".NET Batch: Azure certification or .NET certifications",
        "Data Engineering: Python certification",
        "Optimal batch sizes (25-30 candidates)",
      ],
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Real-time monitoring of candidate learning progress and performance.",
      features: [
        "Self-reported course completion percentages",
        "MCQ scores and project evaluation tracking",
        "Performance analytics and trends",
        "Individual and batch progress monitoring",
      ],
    },
    {
      icon: Brain,
      title: "AI Recommendations",
      description:
        "Intelligent recommendations for personalized learning paths.",
      features: [
        "Analyze candidate scores for focused topic recommendations",
        "Personalized learning paths based on performance",
        "Batch-specific improvement strategies for trainers",
        "Key areas identification for future training programs",
      ],
    },
    {
      icon: MessageSquare,
      title: "Feedback Collection",
      description:
        "Automated feedback collection and sentiment analysis system.",
      features: [
        "Automated feedback links after topic completion",
        "NLP-powered sentiment analysis",
        "Trainer performance insights",
        "Training content effectiveness evaluation",
      ],
    },
    {
      icon: FileText,
      title: "Comprehensive Reports",
      description:
        "Detailed reporting system with multiple report types and formats.",
      features: [
        "Individual candidate performance reports",
        "Batch-wise and college-wise scorecards",
        "Trainer feedback analysis reports",
        "Topper lists and comparison reports",
      ],
    },
  ];

  const batchTypes = [
    {
      name: "Java Batch",
      description: "For candidates with AWS or Java certifications",
      requirements: ["AWS Certification", "Java Certification"],
      color: "bg-orange-500",
    },
    {
      name: ".NET Batch",
      description: "For candidates with Azure or .NET certifications",
      requirements: ["Azure Certification", ".NET Certification"],
      color: "bg-blue-500",
    },
    {
      name: "Data Engineering",
      description: "For candidates with Python certifications",
      requirements: ["Python Certification"],
      color: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Training Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our Skill Navigator Application provides end-to-end training
              program management with intelligent automation and detailed
              analytics.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="animate-fade-in">
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Allocation Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Intelligent Batch Allocation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Candidates are automatically allocated to specialized training
              batches based on their certifications and skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {batchTypes.map((batch, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-4 h-4 rounded-full ${batch.color} mr-3`} />
                  <h3 className="text-xl font-bold text-gray-900">
                    {batch.name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{batch.description}</p>
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-gray-700">
                    Requirements:
                  </div>
                  {batch.requirements.map((req, reqIndex) => (
                    <div
                      key={reqIndex}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                      {req}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Batch Size: 25-30 candidates
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Reports Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Advanced Analytics & Reporting
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get comprehensive insights into training performance with our
                AI-powered analytics and detailed reporting system.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Performance Trends
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Track candidate performance across batches and identify
                      improvement areas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Multiple Report Types
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Individual, batch-wise, college-wise reports and topper
                      lists in PDF/Excel formats.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg flex-shrink-0">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Data Security
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Enterprise-grade security with encryption and role-based
                      access control.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/reports">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    View Sample Reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">95%</div>
                    <div className="text-xs text-gray-600">Completion Rate</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">
                      4.8/5
                    </div>
                    <div className="text-xs text-gray-600">Avg Rating</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">85%</div>
                    <div className="text-xs text-gray-600">First Attempt</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">
                      1200+
                    </div>
                    <div className="text-xs text-gray-600">Candidates</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    Real-time Analytics Dashboard
                  </div>
                  <div className="text-sm text-gray-600">
                    Monitor training metrics and performance indicators
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Training Programs?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the future of training management with our AI-powered Skill
            Navigator Application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-white/90 text-lg px-8 py-6"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 text-lg px-8 py-6 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
