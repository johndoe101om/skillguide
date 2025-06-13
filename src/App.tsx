import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";

// Public Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import HelpCenter from "./pages/HelpCenter";
import Documentation from "./pages/Documentation";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

// User Pages
import CandidateRegistration from "./pages/CandidateRegistration";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Test from "./pages/Test";

// Trainer Pages
import TrainerDashboard from "./pages/trainer/TrainerDashboard";
import TrainerStudents from "./pages/trainer/TrainerStudents";
import TrainerCourses from "./pages/trainer/TrainerCourses";
import TrainerAssessments from "./pages/trainer/TrainerAssessments";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminTrainers from "./pages/admin/AdminTrainers";
import AdminSystem from "./pages/admin/AdminSystem";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Index />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout forceNavigation="none">
                    <Login />
                  </Layout>
                }
              />
              <Route
                path="/help"
                element={
                  <Layout>
                    <HelpCenter />
                  </Layout>
                }
              />
              <Route
                path="/documentation"
                element={
                  <Layout>
                    <Documentation />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <ContactUs />
                  </Layout>
                }
              />
              <Route
                path="/privacy"
                element={
                  <Layout>
                    <PrivacyPolicy />
                  </Layout>
                }
              />

              {/* User Protected Routes */}
              <Route
                path="/register"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <CandidateRegistration />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <Dashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/candidates"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <Candidates />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <Reports />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <Analytics />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/test"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <Test />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowedRoles={["user"]}>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Trainer Protected Routes */}
              <Route
                path="/trainer/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <TrainerDashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/students"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <TrainerStudents />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/courses"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <TrainerCourses />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/assessments"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <TrainerAssessments />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/analytics"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <Analytics />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/reports"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <Reports />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/profile"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/trainer/settings"
                element={
                  <ProtectedRoute allowedRoles={["trainer"]}>
                    <Layout>
                      <div className="min-h-screen bg-gray-50 p-8">
                        <h1 className="text-3xl font-bold">Trainer Settings</h1>
                        <p>
                          Configure your trainer preferences and account
                          settings.
                        </p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Admin Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <AdminDashboard />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <AdminUsers />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/trainers"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <AdminTrainers />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/system"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <AdminSystem />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/analytics"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <Analytics />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/database"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <div className="min-h-screen bg-gray-50 p-8">
                        <h1 className="text-3xl font-bold">
                          Database Management
                        </h1>
                        <p>
                          Monitor and manage database operations, queries, and
                          performance.
                        </p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <Reports />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <Profile />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Layout>
                      <div className="min-h-screen bg-gray-50 p-8">
                        <h1 className="text-3xl font-bold">Admin Settings</h1>
                        <p>
                          Configure admin account preferences and notification
                          settings.
                        </p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                }
              />

              {/* Catch-all route */}
              <Route
                path="*"
                element={
                  <Layout>
                    <NotFound />
                  </Layout>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
