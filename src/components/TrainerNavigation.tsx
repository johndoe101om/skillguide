import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  FileText,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

export default function TrainerNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/trainer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/trainer/students", label: "Students", icon: Users },
    { path: "/trainer/courses", label: "Courses", icon: BookOpen },
    { path: "/trainer/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/trainer/reports", label: "Reports", icon: FileText },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 shadow-xl sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="text-white font-bold text-xl tracking-wide bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                SKILLGUIDE
              </div>
              <div className="ml-3 px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300 font-semibold flex items-center">
                <GraduationCap className="w-3 h-3 mr-1" />
                TRAINER
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    isActive(item.path)
                      ? "bg-white/15 text-white shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden lg:inline">{item.label}</span>
                </Link>
              );
            })}

            <div className="ml-4 flex items-center space-x-4">
              <span className="text-white text-sm">{user?.name}</span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-indigo-900/95 border-t border-white/10">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-white/15 text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white",
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-white/20">
              <div className="text-white px-4 py-2 text-sm">{user?.name}</div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-3 rounded-lg text-base font-medium text-red-300 hover:bg-red-500/20 w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
