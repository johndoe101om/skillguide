import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-skillguide-gradient overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-30'
          }
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Skill Navigator
              <span className="block text-white/90 text-3xl md:text-4xl lg:text-5xl mt-2">
                Application
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Streamline your training programs with intelligent candidate
              allocation, progress tracking, and comprehensive analytics powered
              by AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-white text-skillguide-primary hover:bg-white/90 text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Start Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white/20 hover:border-white/70 text-lg px-8 py-6 rounded-lg backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Smart Allocation
                  </div>
                  <div className="text-white/70 text-sm">
                    Automated batch assignment
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Progress Tracking
                  </div>
                  <div className="text-white/70 text-sm">
                    Real-time monitoring
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    AI Recommendations
                  </div>
                  <div className="text-white/70 text-sm">
                    Personalized insights
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">
                    Detailed Reports
                  </div>
                  <div className="text-white/70 text-sm">
                    Comprehensive analytics
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Professional Image Placeholder */}
          <div className="lg:pl-8 animate-fade-in">
            <div className="relative">
              {/* Main image container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="aspect-square bg-white/5 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-white font-semibold text-lg">
                      Professional Training
                    </div>
                    <div className="text-white/70">
                      Modern Learning Environment
                    </div>
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">25-30</div>
                    <div className="text-xs text-white/70">Batch Size</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-xs text-white/70">Specializations</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="text-2xl font-bold text-white">AI</div>
                    <div className="text-xs text-white/70">Powered</div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white text-skillguide-primary p-3 rounded-lg shadow-lg animate-pulse-slow">
                <Award className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-skillguide-primary p-3 rounded-lg shadow-lg animate-pulse-slow">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
