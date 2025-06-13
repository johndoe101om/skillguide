import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Settings,
  Database,
  Mail,
  Shield,
  Globe,
  Bell,
  Palette,
  Key,
  Cloud,
  Server,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  RefreshCw,
} from "lucide-react";
import Footer from "@/components/Footer";

const AdminSystem = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [debugMode, setDebugMode] = useState(false);

  const systemHealth = [
    {
      component: "Application Server",
      status: "healthy",
      uptime: "99.9%",
      cpu: 45,
      memory: 62,
      lastUpdate: "2 minutes ago",
    },
    {
      component: "Database Server",
      status: "healthy",
      uptime: "99.8%",
      cpu: 32,
      memory: 71,
      lastUpdate: "1 minute ago",
    },
    {
      component: "File Storage",
      status: "warning",
      uptime: "98.5%",
      cpu: 78,
      memory: 85,
      lastUpdate: "5 minutes ago",
    },
    {
      component: "Cache Server",
      status: "healthy",
      uptime: "100%",
      cpu: 25,
      memory: 45,
      lastUpdate: "30 seconds ago",
    },
  ];

  const configSections = [
    {
      title: "General Settings",
      icon: Settings,
      settings: [
        {
          key: "site_name",
          label: "Site Name",
          value: "SkillGuide Platform",
          type: "text",
        },
        {
          key: "site_description",
          label: "Site Description",
          value: "Advanced Learning Management System",
          type: "text",
        },
        {
          key: "timezone",
          label: "Default Timezone",
          value: "UTC",
          type: "select",
          options: ["UTC", "EST", "PST", "GMT"],
        },
        {
          key: "max_upload_size",
          label: "Max Upload Size (MB)",
          value: "100",
          type: "number",
        },
      ],
    },
    {
      title: "Authentication",
      icon: Shield,
      settings: [
        {
          key: "password_min_length",
          label: "Minimum Password Length",
          value: "8",
          type: "number",
        },
        {
          key: "session_timeout",
          label: "Session Timeout (minutes)",
          value: "30",
          type: "number",
        },
        {
          key: "max_login_attempts",
          label: "Max Login Attempts",
          value: "5",
          type: "number",
        },
        {
          key: "two_factor_required",
          label: "Require Two-Factor Auth",
          value: false,
          type: "boolean",
        },
      ],
    },
    {
      title: "Email Configuration",
      icon: Mail,
      settings: [
        {
          key: "smtp_host",
          label: "SMTP Host",
          value: "smtp.skillguide.com",
          type: "text",
        },
        {
          key: "smtp_port",
          label: "SMTP Port",
          value: "587",
          type: "number",
        },
        {
          key: "smtp_username",
          label: "SMTP Username",
          value: "noreply@skillguide.com",
          type: "text",
        },
        {
          key: "from_email",
          label: "From Email",
          value: "noreply@skillguide.com",
          type: "email",
        },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "error":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCpuColor = (cpu: number) => {
    if (cpu > 80) return "bg-red-500";
    if (cpu > 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getMemoryColor = (memory: number) => {
    if (memory > 85) return "bg-red-500";
    if (memory > 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure platform settings, monitor system health, and manage
            integrations.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Monitor className="w-5 h-5 mr-2" />
                      System Health Monitor
                    </CardTitle>
                    <CardDescription>
                      Real-time monitoring of system components
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {systemHealth.map((component, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(component.status)}
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {component.component}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Last update: {component.lastUpdate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(component.status)}>
                          {component.status}
                        </Badge>
                        <div className="text-sm text-gray-600">
                          {component.uptime} uptime
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>CPU Usage</span>
                          <span>{component.cpu}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getCpuColor(
                              component.cpu,
                            )}`}
                            style={{ width: `${component.cpu}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Memory Usage</span>
                          <span>{component.memory}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getMemoryColor(
                              component.memory,
                            )}`}
                            style={{ width: `${component.memory}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Maintenance Mode
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maintenance">Enable Maintenance</Label>
                    <Switch
                      id="maintenance"
                      checked={maintenanceMode}
                      onCheckedChange={setMaintenanceMode}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Temporarily disable user access for system maintenance.
                  </p>
                  {maintenanceMode && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚠️ Maintenance mode is currently active
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    Database Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="w-4 h-4 mr-2" />
                    Optimize Database
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Export Backup
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Firewall</span>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Scan</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      2 days ago
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Run Security Scan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6">
            {configSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon className="w-5 h-5 mr-2" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.settings.map((setting, settingIndex) => (
                        <div key={settingIndex} className="space-y-2">
                          <Label htmlFor={setting.key}>{setting.label}</Label>
                          {setting.type === "text" ||
                          setting.type === "email" ||
                          setting.type === "number" ? (
                            <Input
                              id={setting.key}
                              type={setting.type}
                              defaultValue={setting.value.toString()}
                            />
                          ) : setting.type === "select" ? (
                            <Select defaultValue={setting.value.toString()}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {setting.options?.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : setting.type === "boolean" ? (
                            <div className="flex items-center space-x-2">
                              <Switch
                                id={setting.key}
                                defaultChecked={setting.value as boolean}
                              />
                              <Label htmlFor={setting.key}>
                                {setting.value ? "Enabled" : "Disabled"}
                              </Label>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                      <Button>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enforce-https">Enforce HTTPS</Label>
                    <Switch id="enforce-https" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rate-limiting">Enable Rate Limiting</Label>
                    <Switch id="rate-limiting" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="ip-whitelist">IP Whitelist</Label>
                    <Switch id="ip-whitelist" />
                  </div>
                  <div className="space-y-2">
                    <Label>Allowed Origins</Label>
                    <Textarea
                      placeholder="Enter allowed origins (one per line)"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>API Rate Limit (requests/minute)</Label>
                    <Input type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label>JWT Secret Key</Label>
                    <div className="flex space-x-2">
                      <Input type="password" defaultValue="••••••••••••" />
                      <Button variant="outline" size="sm">
                        <Key className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Token Expiry (hours)</Label>
                    <Input type="number" defaultValue="24" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>User Registration</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Course Completion</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>System Alerts</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Weekly Reports</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>New Messages</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Assessment Reminders</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>System Maintenance</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Security Alerts</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Email Templates</h3>
                  <div className="space-y-2">
                    <Label>Welcome Email Template</Label>
                    <Textarea
                      placeholder="Customize the welcome email template..."
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password Reset Template</Label>
                    <Textarea
                      placeholder="Customize the password reset template..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Preview</Button>
                  <Button>Save Templates</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cloud Storage</CardTitle>
                  <CardDescription>
                    Configure cloud storage providers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Provider</Label>
                    <Select defaultValue="aws">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aws">Amazon S3</SelectItem>
                        <SelectItem value="gcp">
                          Google Cloud Storage
                        </SelectItem>
                        <SelectItem value="azure">
                          Azure Blob Storage
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Bucket Name</Label>
                    <Input defaultValue="skillguide-storage" />
                  </div>
                  <div className="space-y-2">
                    <Label>Access Key</Label>
                    <Input type="password" defaultValue="••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <Input type="password" defaultValue="••••••••••••" />
                  </div>
                  <Button className="w-full">Test Connection</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Gateway</CardTitle>
                  <CardDescription>
                    Configure payment processing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Payment Provider</Label>
                    <Select defaultValue="stripe">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stripe">Stripe</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Public Key</Label>
                    <Input defaultValue="pk_test_..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Secret Key</Label>
                    <Input type="password" defaultValue="••••••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input defaultValue="https://skillguide.com/webhooks/stripe" />
                  </div>
                  <Button className="w-full">Verify Setup</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Backup Tab */}
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Backup Configuration
                </CardTitle>
                <CardDescription>
                  Configure automated backups and restore points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Backup Settings</h3>
                    <div className="flex items-center justify-between">
                      <Label>Auto Backup</Label>
                      <Switch
                        checked={autoBackup}
                        onCheckedChange={setAutoBackup}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Retention Period (days)</Label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Backup Location</Label>
                      <Select defaultValue="cloud">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="local">Local Storage</SelectItem>
                          <SelectItem value="cloud">Cloud Storage</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Recent Backups</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">
                            Full System Backup
                          </div>
                          <div className="text-xs text-gray-500">
                            2024-01-20 03:00 AM
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">
                            Database Backup
                          </div>
                          <div className="text-xs text-gray-500">
                            2024-01-19 03:00 AM
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </Button>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Restore from Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default AdminSystem;
