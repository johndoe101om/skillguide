import HeroSection from "@/components/HeroSection";
import FeatureCard from "@/components/FeatureCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  CheckCircle,
  Star,
  Globe,
  Award,
  Target,
  Zap,
  Clock,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const features = [
    {
      icon: Users,
      title: "Smart Candidate Management",
      description:
        "Comprehensive candidate information collection and profile management system with intelligent insights.",
      features: [
        "Detailed candidate profiles with personal and professional information",
        "Certification and skill tracking (AWS, Azure, NPTEL, etc.)",
        "LinkedIn and GitHub profile integration",
        "Document upload for certificates and credentials",
      ],
    },
    {
      icon: GitBranch,
      title: "Intelligent Batch Allocation",
      description:
        "AI-powered automated batch assignment based on candidate skills and certifications for optimal learning outcomes.",
      features: [
        "Java Batch: AWS certification or Java certifications",
        ".NET Batch: Azure certification or .NET certifications",
        "Data Engineering: Python certification",
        "Optimal batch sizes (25-30 candidates)",
      ],
    },
    {
      icon: TrendingUp,
      title: "Real-time Progress Tracking",
      description:
        "Advanced monitoring of candidate learning progress and performance with predictive analytics.",
      features: [
        "Self-reported course completion percentages",
        "MCQ scores and project evaluation tracking",
        "Performance analytics and trends",
        "Individual and batch progress monitoring",
      ],
    },
    {
      icon: Brain,
      title: "AI-Powered Recommendations",
      description:
        "Intelligent recommendations for personalized learning paths powered by machine learning algorithms.",
      features: [
        "Analyze candidate scores for focused topic recommendations",
        "Personalized learning paths based on performance",
        "Batch-specific improvement strategies for trainers",
        "Key areas identification for future training programs",
      ],
    },
    {
      icon: MessageSquare,
      title: "Advanced Feedback Collection",
      description:
        "Automated feedback collection and sentiment analysis system with NLP-powered insights.",
      features: [
        "Automated feedback links after topic completion",
        "NLP-powered sentiment analysis",
        "Trainer performance insights",
        "Training content effectiveness evaluation",
      ],
    },
    {
      icon: FileText,
      title: "Comprehensive Reporting Suite",
      description:
        "Detailed reporting system with multiple report types, formats, and automated delivery options.",
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
      name: "Java Development",
      description: "For candidates with AWS or Java certifications",
      requirements: ["AWS Certification", "Java Certification"],
      color: "bg-orange-500",
      icon: "☕",
      stats: { enrolled: "240+", completion: "92%" },
    },
    {
      name: ".NET Development",
      description: "For candidates with Azure or .NET certifications",
      requirements: ["Azure Certification", ".NET Certification"],
      color: "bg-blue-500",
      icon: "🔷",
      stats: { enrolled: "180+", completion: "89%" },
    },
    {
      name: "Data Engineering",
      description: "For candidates with Python certifications",
      requirements: ["Python Certification"],
      color: "bg-green-500",
      icon: "🐍",
      stats: { enrolled: "160+", completion: "94%" },
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Training Manager",
      company: "TechCorp",
      content:
        "SkillGuide transformed our training process. The AI recommendations are incredibly accurate.",
      rating: 5,
    },
    {
      name: "Raj Patel",
      role: "HR Director",
      company: "Innovation Labs",
      content:
        "The automated batch allocation saved us countless hours and improved training outcomes significantly.",
      rating: 5,
    },
    {
      name: "Dr. Meera Singh",
      role: "Academic Head",
      company: "Engineering College",
      content:
        "Comprehensive reporting gives us insights we never had before. Highly recommended!",
      rating: 5,
    },
  ];

  const stats = [
    { value: "1200+", label: "Candidates Trained", icon: Users },
    { value: "95%", label: "Completion Rate", icon: CheckCircle },
    { value: "4.8/5", label: "Average Rating", icon: Star },
    { value: "50+", label: "Partner Institutes", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-skillguide-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-skillguide-100 text-skillguide-700 hover:bg-skillguide-200">
              <Zap className="w-4 h-4 mr-1" />
              Powered by AI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Training Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our Skill Navigator Application provides end-to-end training
              program management with intelligent automation, real-time
              analytics, and comprehensive insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Batch Allocation Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
              <Target className="w-4 h-4 mr-1" />
              Smart Allocation
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Intelligent Batch Allocation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Candidates are automatically allocated to specialized training
              batches based on their certifications, skills, and career
              aspirations using our AI algorithms.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {batchTypes.map((batch, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col"
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{batch.icon}</div>
                  <div>
                    <div
                      className={`w-4 h-4 rounded-full ${batch.color} mb-2`}
                    />
                    <h3 className="text-xl font-bold text-gray-900">
                      {batch.name}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {batch.description}
                </p>

                <div className="mb-6 flex-grow">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Entry Requirements:
                  </div>
                  {batch.requirements.map((req, reqIndex) => (
                    <div
                      key={reqIndex}
                      className="flex items-center text-sm text-gray-600 mb-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {req}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 mt-auto">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {batch.stats.enrolled}
                    </div>
                    <div className="text-xs text-gray-500">Enrolled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">
                      {batch.stats.completion}
                    </div>
                    <div className="text-xs text-gray-500">Completion</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics & Reports Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">
                <BarChart3 className="w-4 h-4 mr-1" />
                Advanced Analytics
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Data-Driven Insights & Reporting
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Get comprehensive insights into training performance with our
                AI-powered analytics and detailed reporting system. Make
                informed decisions with real-time data.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-skillguide-gradient p-3 rounded-lg flex-shrink-0 shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Real-time Performance Dashboards
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Monitor candidate performance across batches with
                      interactive dashboards that update in real-time with
                      progress indicators and trend analysis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-skillguide-gradient p-3 rounded-lg flex-shrink-0 shadow-lg">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Automated Report Generation
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Generate comprehensive reports in multiple formats
                      including individual performance, batch summaries, and
                      institutional scorecards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-skillguide-gradient p-3 rounded-lg flex-shrink-0 shadow-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Secure Data Management
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Enterprise-grade security with encryption, role-based
                      access control, and comprehensive audit trails for all
                      data operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reports">
                  <Button
                    size="lg"
                    className="bg-skillguide-gradient hover:bg-skillguide-gradient-dark text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4"
                  >
                    View Sample Reports
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button
                    size="lg"
                    className="bg-skillguide-200 text-skillguide-700 hover:bg-skillguide-300 border border-skillguide-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Explore Analytics
                  </Button>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-gradient-to-br from-skillguide-50 to-skillguide-100 rounded-3xl p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-32 flex flex-col justify-between">
                      <div>
                        <div className="text-3xl font-bold text-skillguide-600 mb-1">
                          95%
                        </div>
                        <div className="text-sm text-gray-600">
                          Completion Rate
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-skillguide-gradient h-2 rounded-full"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-32 flex flex-col justify-between">
                      <div>
                        <div className="text-3xl font-bold text-skillguide-600 mb-1">
                          4.8/5
                        </div>
                        <div className="text-sm text-gray-600">Avg Rating</div>
                      </div>
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < 5 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-32 flex flex-col justify-between">
                      <div>
                        <div className="text-3xl font-bold text-skillguide-600 mb-1">
                          85%
                        </div>
                        <div className="text-sm text-gray-600">
                          First Attempt Pass
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500 text-xs ml-1">
                          +12%
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-32 flex flex-col justify-between">
                      <div>
                        <div className="text-3xl font-bold text-skillguide-600 mb-1">
                          1200+
                        </div>
                        <div className="text-sm text-gray-600">
                          Active Candidates
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className="text-blue-500 text-xs ml-1">
                          Growing
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center bg-white rounded-xl p-6 shadow-lg">
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      Real-time Analytics Dashboard
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Monitor training metrics and performance indicators
                    </div>
                    <div className="flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-sm font-medium">
                        Live Updates
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow">
                  <Award className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse-slow">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <Star className="w-4 h-4 mr-1" />
              Customer Success
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Leading Organizations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how SkillGuide has transformed training programs across
              various institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed flex-grow">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center mt-auto">
                  <div className="w-12 h-12 bg-skillguide-gradient rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-sm text-skillguide-600">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-skillguide-gradient relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-black/10">
          <div
            className={
              'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
            }
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Training Programs?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join the future of training management with our AI-powered Skill
            Navigator Application. Experience the difference with intelligent
            automation and comprehensive analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-white text-skillguide-primary hover:bg-white/90 text-lg px-10 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 text-lg px-10 py-6 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                View Live Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center text-white/80 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>
              No credit card required • Free 30-day trial • Cancel anytime
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
