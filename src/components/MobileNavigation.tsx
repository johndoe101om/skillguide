import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Menu,
  X,
  Home,
  UserPlus,
  LayoutDashboard,
  FileText,
  BarChart3,
  Users,
  Settings,
  Bell,
  Search,
  ChevronRight,
  Zap,
  Star,
  Trophy,
  Clock,
  Activity,
  BookOpen,
  Target,
  MessageSquare,
  WiFi,
  WifiOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavigationProps {
  userRole?: "candidate" | "trainer" | "admin";
  userName?: string;
  userProgress?: number;
  notifications?: number;
}

const MobileNavigation = ({
  userRole = "candidate",
  userName = "User",
  userProgress = 75,
  notifications = 3,
}: MobileNavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [quickStats, setQuickStats] = useState({
    studyStreak: 12,
    skillPoints: 1250,
    rank: 3,
    todayTime: 45,
  });

  const location = useLocation();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const navItems = [
    {
      path: "/",
      label: "Home",
      icon: Home,
      description: "Dashboard overview",
      badge: null,
    },
    {
      path: "/register",
      label: "Register",
      icon: UserPlus,
      description: "New candidate registration",
      badge: null,
    },
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Personal dashboard",
      badge: userRole === "candidate" ? "Updated" : null,
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "Performance insights",
      badge: null,
    },
    {
      path: "/reports",
      label: "Reports",
      icon: FileText,
      description: "Generate reports",
      badge: null,
    },
    {
      path: "/candidates",
      label: "Candidates",
      icon: Users,
      description: "Manage candidates",
      badge: userRole === "admin" ? "15 New" : null,
    },
  ];

  const quickActions = [
    {
      label: "Study Today",
      icon: BookOpen,
      action: () => console.log("Start studying"),
      primary: true,
    },
    {
      label: "Take Quiz",
      icon: Target,
      action: () => console.log("Take quiz"),
      primary: false,
    },
    {
      label: "View Progress",
      icon: Activity,
      action: () => console.log("View progress"),
      primary: false,
    },
    {
      label: "Give Feedback",
      icon: MessageSquare,
      action: () => console.log("Give feedback"),
      primary: false,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    // Add analytics tracking for mobile navigation
    console.log(`Mobile nav: ${path}`);
  };

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case "candidate":
        return "👨‍🎓";
      case "trainer":
        return "👩‍🏫";
      case "admin":
        return "👨‍💼";
      default:
        return "👤";
    }
  };

  const getUserGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <nav className="bg-skillguide-gradient shadow-lg sticky top-0 z-50 lg:hidden">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-white font-bold text-lg tracking-wide">
                SKILLGUIDE
              </div>
              {!isOnline && (
                <WifiOff className="w-4 h-4 text-white/60" title="Offline" />
              )}
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <Button variant="ghost" size="sm" className="text-white p-2">
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white p-2 relative"
              >
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] rounded-full p-0 flex items-center justify-center">
                    {notifications > 9 ? "9+" : notifications}
                  </Badge>
                )}
              </Button>

              {/* Mobile Menu Trigger */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white p-2">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-full sm:w-96 p-0 bg-white"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <SheetHeader className="bg-skillguide-gradient text-white p-6 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                            {getRoleEmoji(userRole)}
                          </div>
                          <div>
                            <SheetTitle className="text-white text-lg">
                              {getUserGreeting()}, {userName}!
                            </SheetTitle>
                            <SheetDescription className="text-white/80 text-sm">
                              {userRole.charAt(0).toUpperCase() +
                                userRole.slice(1)}{" "}
                              Dashboard
                            </SheetDescription>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats for Candidate */}
                      {userRole === "candidate" && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-white/80">
                                Overall Progress
                              </span>
                              <span className="text-white font-medium">
                                {userProgress}%
                              </span>
                            </div>
                            <Progress
                              value={userProgress}
                              className="h-2 bg-white/20"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="flex items-center justify-center mb-1">
                                <Zap className="w-4 h-4 mr-1" />
                                <span className="text-sm font-semibold">
                                  {quickStats.studyStreak}
                                </span>
                              </div>
                              <div className="text-xs text-white/70">
                                Day Streak
                              </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="flex items-center justify-center mb-1">
                                <Star className="w-4 h-4 mr-1" />
                                <span className="text-sm font-semibold">
                                  {quickStats.skillPoints}
                                </span>
                              </div>
                              <div className="text-xs text-white/70">
                                Points
                              </div>
                            </div>
                            <div className="bg-white/10 rounded-lg p-2">
                              <div className="flex items-center justify-center mb-1">
                                <Trophy className="w-4 h-4 mr-1" />
                                <span className="text-sm font-semibold">
                                  #{quickStats.rank}
                                </span>
                              </div>
                              <div className="text-xs text-white/70">Rank</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-center bg-white/10 rounded-lg p-2">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              <span className="font-semibold">
                                {quickStats.todayTime}min
                              </span>{" "}
                              studied today
                            </span>
                          </div>
                        </div>
                      )}
                    </SheetHeader>

                    {/* Navigation Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Quick Actions */}
                      {userRole === "candidate" && (
                        <div className="p-4 border-b">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Quick Actions
                          </h3>
                          <div className="grid grid-cols-2 gap-2">
                            {quickActions.map((action, index) => (
                              <Button
                                key={index}
                                variant={action.primary ? "default" : "outline"}
                                size="sm"
                                onClick={action.action}
                                className={cn(
                                  "flex flex-col items-center justify-center h-16 text-xs",
                                  action.primary &&
                                    "bg-skillguide-gradient hover:bg-skillguide-gradient-dark",
                                )}
                              >
                                <action.icon className="w-5 h-5 mb-1" />
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Navigation Items */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Navigation
                        </h3>
                        <div className="space-y-1">
                          {navItems.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.path);

                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => handleNavigation(item.path)}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-lg transition-colors duration-200",
                                  active
                                    ? "bg-skillguide-gradient-light text-skillguide-700"
                                    : "text-gray-600 hover:bg-gray-50",
                                )}
                              >
                                <div className="flex items-center space-x-3">
                                  <Icon
                                    className={cn(
                                      "w-5 h-5",
                                      active
                                        ? "text-skillguide-600"
                                        : "text-gray-400",
                                    )}
                                  />
                                  <div>
                                    <div className="font-medium">
                                      {item.label}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {item.description}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {item.badge && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                  <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>

                      {/* Connection Status */}
                      <div className="p-4 border-t">
                        <div
                          className={cn(
                            "flex items-center justify-center p-2 rounded-lg text-sm",
                            isOnline
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700",
                          )}
                        >
                          {isOnline ? (
                            <>
                              <WiFi className="w-4 h-4 mr-2" />
                              Connected
                            </>
                          ) : (
                            <>
                              <WifiOff className="w-4 h-4 mr-2" />
                              Offline Mode
                            </>
                          )}
                        </div>
                      </div>

                      {/* Settings */}
                      <div className="p-4">
                        <Button
                          variant="outline"
                          className="w-full flex items-center justify-center"
                          onClick={() => {
                            setIsOpen(false);
                            console.log("Open settings");
                          }}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings & Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile (Optional) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-lg transition-colors",
                  active
                    ? "text-skillguide-600 bg-skillguide-50"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.badge && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[16px] h-[16px] rounded-full p-0 flex items-center justify-center">
                    !
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;
