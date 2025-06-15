import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Target,
  Zap,
  Play,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-skillguide-gradient overflow-hidden min-h-screen flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
          }
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-3/4 w-16 h-16 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Training Platform
            </Badge>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="block">SkillGuide</span>
              <span className="block text-white/90 text-4xl md:text-5xl lg:text-6xl mt-2">
                Navigator
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-2xl">
              Transform your training programs with intelligent candidate
              allocation, real-time progress tracking, and comprehensive
              analytics. Built for the future of education.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center text-white/80">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm">25,000+ Candidates Trained</span>
              </div>
              <div className="flex items-center text-white/80">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm">95% Success Rate</span>
              </div>
              <div className="flex items-center text-white/80">
                <CheckCircle className="w-5 h-5 mr-2 text-green-300" />
                <span className="text-sm">50+ Partner Institutes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-skillguide-primary hover:bg-white/90 text-lg px-10 py-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 text-lg px-10 py-6 rounded-xl backdrop-blur-sm shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 font-semibold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Key Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      AI-Powered
                    </div>
                    <div className="text-white/70 text-sm">
                      Smart allocation & insights
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      Real-time Analytics
                    </div>
                    <div className="text-white/70 text-sm">
                      Live performance tracking
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      Comprehensive Reports
                    </div>
                    <div className="text-white/70 text-sm">
                      Detailed analytics & insights
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      Smart Batching
                    </div>
                    <div className="text-white/70 text-sm">
                      Automated grouping by skills
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Dashboard Preview */}
          <div className="lg:pl-8 animate-fade-in">
            <div className="relative">
              {/* Main dashboard container */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-white font-semibold">
                      Live Dashboard
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                    Online
                  </Badge>
                </div>

                {/* Main metrics display */}
                <div className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden">
                  <div className="text-center z-10">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                    <div className="text-white font-semibold text-2xl mb-2">
                      Professional Training
                    </div>
                    <div className="text-white/70 text-lg">
                      Modern Learning Environment
                    </div>
                  </div>

                  {/* Animated background circles */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full animate-float"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-4 left-4 w-12 h-12 bg-white/5 rounded-full animate-float"
                      style={{ animationDelay: "3s" }}
                    ></div>
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors duration-300">
                    <div className="text-2xl font-bold text-white mb-1">
                      25-30
                    </div>
                    <div className="text-xs text-white/70">Batch Size</div>
                    <div className="mt-2 w-full bg-white/20 rounded-full h-1">
                      <div
                        className="bg-green-400 h-1 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors duration-300">
                    <div className="text-2xl font-bold text-white mb-1">3</div>
                    <div className="text-xs text-white/70">Specializations</div>
                    <div className="flex justify-center mt-2 space-x-1">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors duration-300">
                    <div className="text-2xl font-bold text-white mb-1">AI</div>
                    <div className="text-xs text-white/70">Powered</div>
                    <div className="flex justify-center mt-2">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white text-sm font-medium">
                      Platform Usage
                    </span>
                    <span className="text-green-300 text-sm font-semibold">
                      98%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full animate-pulse-slow"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Floating elements with improved animations */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-2xl shadow-xl animate-float hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8" />
              </div>
              <div
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-400 to-blue-500 text-white p-4 rounded-2xl shadow-xl animate-float hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: "2s" }}
              >
                <TrendingUp className="w-8 h-8" />
              </div>

              {/* Additional floating metrics */}
              <div
                className="absolute top-1/4 -left-4 bg-white text-skillguide-primary p-3 rounded-xl shadow-lg animate-pulse-slow hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: "1s" }}
              >
                <div className="text-sm font-bold">95%</div>
                <div className="text-xs">Success</div>
              </div>
              <div
                className="absolute bottom-1/4 -right-4 bg-white text-skillguide-primary p-3 rounded-xl shadow-lg animate-pulse-slow hover:shadow-xl transition-shadow duration-300"
                style={{ animationDelay: "3s" }}
              >
                <div className="text-sm font-bold">1200+</div>
                <div className="text-xs">Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
