import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Palette,
  Brain,
  Target,
  Clock,
  Bell,
  Shield,
  Zap,
  Settings,
  Eye,
  Volume2,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Languages,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Save,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

interface PersonalizationData {
  profile: {
    displayName: string;
    avatar: string;
    timezone: string;
    language: string;
    learningGoals: string[];
    skillLevel: string;
    preferredLearningStyle: string;
  };
  dashboard: {
    layout: string;
    widgets: string[];
    defaultView: string;
    refreshInterval: number;
    showAnimations: boolean;
    compactMode: boolean;
  };
  testing: {
    difficulty: string;
    timePreference: string;
    feedbackLevel: string;
    questionDisplay: string;
    autoSave: boolean;
    reviewMode: string;
    practiceReminders: boolean;
    adaptiveDifficulty: boolean;
  };
  ui: {
    theme: string;
    colorScheme: string;
    fontSize: string;
    navigationStyle: string;
    sidebarPosition: string;
    showTooltips: boolean;
    reduceMotion: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    frequency: string;
    types: string[];
    quietHours: {
      enabled: boolean;
      start: string;
      end: string;
    };
  };
  privacy: {
    profileVisibility: string;
    shareProgress: boolean;
    analyticsTracking: boolean;
    personalizedContent: boolean;
    dataRetention: string;
  };
}

export default function PersonalizationSettings() {
  const [settings, setSettings] = useState<PersonalizationData>({
    profile: {
      displayName: "John Doe",
      avatar: "",
      timezone: "UTC",
      language: "en",
      learningGoals: ["Backend Development", "Cloud Computing"],
      skillLevel: "intermediate",
      preferredLearningStyle: "visual",
    },
    dashboard: {
      layout: "grid",
      widgets: ["progress", "upcoming", "achievements", "analytics"],
      defaultView: "overview",
      refreshInterval: 30,
      showAnimations: true,
      compactMode: false,
    },
    testing: {
      difficulty: "adaptive",
      timePreference: "morning",
      feedbackLevel: "detailed",
      questionDisplay: "single",
      autoSave: true,
      reviewMode: "immediate",
      practiceReminders: true,
      adaptiveDifficulty: true,
    },
    ui: {
      theme: "system",
      colorScheme: "blue",
      fontSize: "medium",
      navigationStyle: "sidebar",
      sidebarPosition: "left",
      showTooltips: true,
      reduceMotion: false,
    },
    notifications: {
      email: true,
      push: true,
      sms: false,
      frequency: "daily",
      types: ["test-reminders", "achievements", "progress-updates"],
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00",
      },
    },
    privacy: {
      profileVisibility: "batch-only",
      shareProgress: true,
      analyticsTracking: true,
      personalizedContent: true,
      dataRetention: "2-years",
    },
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const updateSettings = (
    section: keyof PersonalizationData,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
    setHasChanges(true);
  };

  const updateNestedSettings = (
    section: keyof PersonalizationData,
    nestedKey: string,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedKey]: {
          ...(prev[section] as any)[nestedKey],
          [key]: value,
        },
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSaving(false);
    setHasChanges(false);
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false);
  };

  const learningGoalOptions = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
    "DevOps",
    "Mobile Development",
    "AI/ML",
    "Cybersecurity",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Personalization Settings
            </h1>
            <p className="text-gray-600">
              Customize your SkillGuide experience to match your learning style
              and preferences
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {hasChanges && (
              <Badge
                variant="outline"
                className="bg-yellow-50 text-yellow-700 border-yellow-200"
              >
                <Zap className="w-3 h-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={!hasChanges}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges || saving}>
              {saving ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="dashboard">
              <Monitor className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="testing">
              <Brain className="w-4 h-4 mr-2" />
              Testing
            </TabsTrigger>
            <TabsTrigger value="ui">
              <Palette className="w-4 h-4 mr-2" />
              Interface
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="w-4 h-4 mr-2" />
              Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Basic profile settings and learning preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.profile.displayName}
                      onChange={(e) =>
                        updateSettings("profile", "displayName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.profile.timezone}
                      onValueChange={(value) =>
                        updateSettings("profile", "timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="IST">India Standard Time</SelectItem>
                        <SelectItem value="GMT">Greenwich Mean Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={settings.profile.language}
                      onValueChange={(value) =>
                        updateSettings("profile", "language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="hi">हिन्दी</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skillLevel">Current Skill Level</Label>
                    <Select
                      value={settings.profile.skillLevel}
                      onValueChange={(value) =>
                        updateSettings("profile", "skillLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Learning Goals</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {learningGoalOptions.map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Switch
                          checked={settings.profile.learningGoals.includes(
                            goal,
                          )}
                          onCheckedChange={(checked) => {
                            const newGoals = checked
                              ? [...settings.profile.learningGoals, goal]
                              : settings.profile.learningGoals.filter(
                                  (g) => g !== goal,
                                );
                            updateSettings(
                              "profile",
                              "learningGoals",
                              newGoals,
                            );
                          }}
                        />
                        <Label className="text-sm">{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningStyle">
                    Preferred Learning Style
                  </Label>
                  <Select
                    value={settings.profile.preferredLearningStyle}
                    onValueChange={(value) =>
                      updateSettings("profile", "preferredLearningStyle", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visual">
                        Visual (Videos, Diagrams)
                      </SelectItem>
                      <SelectItem value="auditory">
                        Auditory (Lectures, Discussions)
                      </SelectItem>
                      <SelectItem value="kinesthetic">
                        Hands-on (Practice, Labs)
                      </SelectItem>
                      <SelectItem value="reading">Reading/Writing</SelectItem>
                      <SelectItem value="mixed">Mixed Approach</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dashboard Settings */}
          <TabsContent value="dashboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Monitor className="w-5 h-5 mr-2" />
                  Dashboard Customization
                </CardTitle>
                <CardDescription>
                  Personalize your dashboard layout and content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="layout">Layout Style</Label>
                    <Select
                      value={settings.dashboard.layout}
                      onValueChange={(value) =>
                        updateSettings("dashboard", "layout", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid Layout</SelectItem>
                        <SelectItem value="list">List Layout</SelectItem>
                        <SelectItem value="cards">Card Layout</SelectItem>
                        <SelectItem value="compact">Compact Layout</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="defaultView">Default View</Label>
                    <Select
                      value={settings.dashboard.defaultView}
                      onValueChange={(value) =>
                        updateSettings("dashboard", "defaultView", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="overview">Overview</SelectItem>
                        <SelectItem value="progress">Progress</SelectItem>
                        <SelectItem value="tests">Tests</SelectItem>
                        <SelectItem value="analytics">Analytics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Dashboard Widgets</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      {
                        id: "progress",
                        label: "Progress Overview",
                        icon: TrendingUp,
                      },
                      {
                        id: "upcoming",
                        label: "Upcoming Tests",
                        icon: Calendar,
                      },
                      {
                        id: "achievements",
                        label: "Achievements",
                        icon: Award,
                      },
                      { id: "analytics", label: "Analytics", icon: Target },
                      { id: "schedule", label: "Schedule", icon: Clock },
                      {
                        id: "recommendations",
                        label: "AI Recommendations",
                        icon: Brain,
                      },
                    ].map((widget) => {
                      const Icon = widget.icon;
                      return (
                        <div
                          key={widget.id}
                          className="flex items-center space-x-2 p-2 border rounded"
                        >
                          <Switch
                            checked={settings.dashboard.widgets.includes(
                              widget.id,
                            )}
                            onCheckedChange={(checked) => {
                              const newWidgets = checked
                                ? [...settings.dashboard.widgets, widget.id]
                                : settings.dashboard.widgets.filter(
                                    (w) => w !== widget.id,
                                  );
                              updateSettings(
                                "dashboard",
                                "widgets",
                                newWidgets,
                              );
                            }}
                          />
                          <Icon className="w-4 h-4" />
                          <Label className="text-sm">{widget.label}</Label>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Refresh Interval (seconds)</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[settings.dashboard.refreshInterval]}
                      onValueChange={(value) =>
                        updateSettings("dashboard", "refreshInterval", value[0])
                      }
                      max={300}
                      min={10}
                      step={10}
                      className="w-full"
                    />
                    <div className="text-sm text-gray-500">
                      Current: {settings.dashboard.refreshInterval} seconds
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showAnimations">Enable Animations</Label>
                    <p className="text-sm text-gray-500">
                      Show smooth transitions and animations
                    </p>
                  </div>
                  <Switch
                    id="showAnimations"
                    checked={settings.dashboard.showAnimations}
                    onCheckedChange={(checked) =>
                      updateSettings("dashboard", "showAnimations", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="compactMode">Compact Mode</Label>
                    <p className="text-sm text-gray-500">
                      Use smaller spacing and condensed layout
                    </p>
                  </div>
                  <Switch
                    id="compactMode"
                    checked={settings.dashboard.compactMode}
                    onCheckedChange={(checked) =>
                      updateSettings("dashboard", "compactMode", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testing Settings */}
          <TabsContent value="testing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  Test Experience Personalization
                </CardTitle>
                <CardDescription>
                  Customize your testing experience for optimal performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Preference</Label>
                    <Select
                      value={settings.testing.difficulty}
                      onValueChange={(value) =>
                        updateSettings("testing", "difficulty", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="adaptive">
                          Adaptive (AI-Driven)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timePreference">Preferred Test Time</Label>
                    <Select
                      value={settings.testing.timePreference}
                      onValueChange={(value) =>
                        updateSettings("testing", "timePreference", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">
                          Morning (8AM - 12PM)
                        </SelectItem>
                        <SelectItem value="afternoon">
                          Afternoon (12PM - 6PM)
                        </SelectItem>
                        <SelectItem value="evening">
                          Evening (6PM - 10PM)
                        </SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="feedbackLevel">Feedback Detail Level</Label>
                    <Select
                      value={settings.testing.feedbackLevel}
                      onValueChange={(value) =>
                        updateSettings("testing", "feedbackLevel", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">
                          Minimal (Score Only)
                        </SelectItem>
                        <SelectItem value="standard">
                          Standard (Correct/Incorrect)
                        </SelectItem>
                        <SelectItem value="detailed">
                          Detailed (Explanations)
                        </SelectItem>
                        <SelectItem value="comprehensive">
                          Comprehensive (Tips & Resources)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="questionDisplay">Question Display</Label>
                    <Select
                      value={settings.testing.questionDisplay}
                      onValueChange={(value) =>
                        updateSettings("testing", "questionDisplay", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">One at a Time</SelectItem>
                        <SelectItem value="paginated">
                          Paginated (5 per page)
                        </SelectItem>
                        <SelectItem value="all">All Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewMode">Review Mode</Label>
                    <Select
                      value={settings.testing.reviewMode}
                      onValueChange={(value) =>
                        updateSettings("testing", "reviewMode", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">
                          Immediate After Each Question
                        </SelectItem>
                        <SelectItem value="section">
                          After Each Section
                        </SelectItem>
                        <SelectItem value="end">At Test End</SelectItem>
                        <SelectItem value="never">No Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="autoSave">Auto-Save Progress</Label>
                      <p className="text-sm text-gray-500">
                        Automatically save answers as you progress
                      </p>
                    </div>
                    <Switch
                      id="autoSave"
                      checked={settings.testing.autoSave}
                      onCheckedChange={(checked) =>
                        updateSettings("testing", "autoSave", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="practiceReminders">
                        Practice Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get notifications to practice regularly
                      </p>
                    </div>
                    <Switch
                      id="practiceReminders"
                      checked={settings.testing.practiceReminders}
                      onCheckedChange={(checked) =>
                        updateSettings("testing", "practiceReminders", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="adaptiveDifficulty">
                        Adaptive Difficulty
                      </Label>
                      <p className="text-sm text-gray-500">
                        AI adjusts question difficulty based on performance
                      </p>
                    </div>
                    <Switch
                      id="adaptiveDifficulty"
                      checked={settings.testing.adaptiveDifficulty}
                      onCheckedChange={(checked) =>
                        updateSettings("testing", "adaptiveDifficulty", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* UI Settings */}
          <TabsContent value="ui" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Interface Customization
                </CardTitle>
                <CardDescription>
                  Personalize the look and feel of your interface
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select
                      value={settings.ui.theme}
                      onValueChange={(value) =>
                        updateSettings("ui", "theme", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">
                          <div className="flex items-center">
                            <Sun className="w-4 h-4 mr-2" />
                            Light
                          </div>
                        </SelectItem>
                        <SelectItem value="dark">
                          <div className="flex items-center">
                            <Moon className="w-4 h-4 mr-2" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center">
                            <Monitor className="w-4 h-4 mr-2" />
                            System
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colorScheme">Color Scheme</Label>
                    <Select
                      value={settings.ui.colorScheme}
                      onValueChange={(value) =>
                        updateSettings("ui", "colorScheme", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">Font Size</Label>
                    <Select
                      value={settings.ui.fontSize}
                      onValueChange={(value) =>
                        updateSettings("ui", "fontSize", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                        <SelectItem value="extra-large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="navigationStyle">Navigation Style</Label>
                    <Select
                      value={settings.ui.navigationStyle}
                      onValueChange={(value) =>
                        updateSettings("ui", "navigationStyle", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sidebar">Sidebar</SelectItem>
                        <SelectItem value="topbar">Top Bar</SelectItem>
                        <SelectItem value="tabs">Tabs</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="showTooltips">Show Tooltips</Label>
                    <p className="text-sm text-gray-500">
                      Display helpful tooltips and hints
                    </p>
                  </div>
                  <Switch
                    id="showTooltips"
                    checked={settings.ui.showTooltips}
                    onCheckedChange={(checked) =>
                      updateSettings("ui", "showTooltips", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="reduceMotion">Reduce Motion</Label>
                    <p className="text-sm text-gray-500">
                      Minimize animations for accessibility
                    </p>
                  </div>
                  <Switch
                    id="reduceMotion"
                    checked={settings.ui.reduceMotion}
                    onCheckedChange={(checked) =>
                      updateSettings("ui", "reduceMotion", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Receive notifications via email
                      </p>
                    </div>
                    <Switch
                      id="email"
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) =>
                        updateSettings("notifications", "email", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="push">Push Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Browser push notifications
                      </p>
                    </div>
                    <Switch
                      id="push"
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) =>
                        updateSettings("notifications", "push", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="sms">SMS Notifications</Label>
                      <p className="text-sm text-gray-500">
                        Text message notifications
                      </p>
                    </div>
                    <Switch
                      id="sms"
                      checked={settings.notifications.sms}
                      onCheckedChange={(checked) =>
                        updateSettings("notifications", "sms", checked)
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Notification Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "test-reminders",
                      "achievements",
                      "progress-updates",
                      "batch-announcements",
                      "deadlines",
                      "new-features",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Switch
                          checked={settings.notifications.types.includes(type)}
                          onCheckedChange={(checked) => {
                            const newTypes = checked
                              ? [...settings.notifications.types, type]
                              : settings.notifications.types.filter(
                                  (t) => t !== type,
                                );
                            updateSettings("notifications", "types", newTypes);
                          }}
                        />
                        <Label className="text-sm capitalize">
                          {type.replace("-", " ")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quietHours">Quiet Hours</Label>
                    <Switch
                      id="quietHours"
                      checked={settings.notifications.quietHours.enabled}
                      onCheckedChange={(checked) =>
                        updateNestedSettings(
                          "notifications",
                          "quietHours",
                          "enabled",
                          checked,
                        )
                      }
                    />
                  </div>
                  {settings.notifications.quietHours.enabled && (
                    <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-gray-200">
                      <div className="space-y-2">
                        <Label htmlFor="quietStart">Start Time</Label>
                        <Input
                          id="quietStart"
                          type="time"
                          value={settings.notifications.quietHours.start}
                          onChange={(e) =>
                            updateNestedSettings(
                              "notifications",
                              "quietHours",
                              "start",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quietEnd">End Time</Label>
                        <Input
                          id="quietEnd"
                          type="time"
                          value={settings.notifications.quietHours.end}
                          onChange={(e) =>
                            updateNestedSettings(
                              "notifications",
                              "quietHours",
                              "end",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Settings */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Data Control
                </CardTitle>
                <CardDescription>
                  Manage your privacy settings and data preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">
                      Profile Visibility
                    </Label>
                    <Select
                      value={settings.privacy.profileVisibility}
                      onValueChange={(value) =>
                        updateSettings("privacy", "profileVisibility", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="batch-only">
                          Batch Members Only
                        </SelectItem>
                        <SelectItem value="trainers-only">
                          Trainers Only
                        </SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="shareProgress">Share Progress</Label>
                      <p className="text-sm text-gray-500">
                        Allow others to see your learning progress
                      </p>
                    </div>
                    <Switch
                      id="shareProgress"
                      checked={settings.privacy.shareProgress}
                      onCheckedChange={(checked) =>
                        updateSettings("privacy", "shareProgress", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="analyticsTracking">
                        Analytics Tracking
                      </Label>
                      <p className="text-sm text-gray-500">
                        Help improve the platform with usage analytics
                      </p>
                    </div>
                    <Switch
                      id="analyticsTracking"
                      checked={settings.privacy.analyticsTracking}
                      onCheckedChange={(checked) =>
                        updateSettings("privacy", "analyticsTracking", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="personalizedContent">
                        Personalized Content
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive AI-powered personalized recommendations
                      </p>
                    </div>
                    <Switch
                      id="personalizedContent"
                      checked={settings.privacy.personalizedContent}
                      onCheckedChange={(checked) =>
                        updateSettings(
                          "privacy",
                          "personalizedContent",
                          checked,
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dataRetention">Data Retention Period</Label>
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) =>
                        updateSettings("privacy", "dataRetention", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="5-years">5 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions Card */}
        <Card className="mt-8 border-skillguide-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2 text-skillguide-600" />
              Personalization Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="font-semibold text-green-800">
                  Adaptive Learning
                </div>
                <div className="text-sm text-green-600">
                  {settings.testing.adaptiveDifficulty ? "Enabled" : "Disabled"}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold text-blue-800">
                  AI Recommendations
                </div>
                <div className="text-sm text-blue-600">
                  {settings.privacy.personalizedContent ? "Active" : "Inactive"}
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="font-semibold text-purple-800">
                  Goal Tracking
                </div>
                <div className="text-sm text-purple-600">
                  {settings.profile.learningGoals.length} goals set
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
