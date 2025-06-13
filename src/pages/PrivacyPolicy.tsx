import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Eye,
  Users,
  FileText,
  Download,
  Mail,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2024";

  const privacySections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: FileText,
      content: [
        {
          subtitle: "Personal Information",
          details: [
            "Name, email address, and contact information",
            "Educational background and professional experience",
            "Assessment responses and performance data",
            "User preferences and settings",
          ],
        },
        {
          subtitle: "Technical Information",
          details: [
            "IP address and device information",
            "Browser type and operating system",
            "Usage patterns and interaction data",
            "Cookies and similar tracking technologies",
          ],
        },
        {
          subtitle: "Assessment Data",
          details: [
            "Test responses and scores",
            "Time spent on assessments",
            "Proctoring data (video, audio, screen recording)",
            "Biometric data for identity verification",
          ],
        },
      ],
    },
    {
      id: "information-usage",
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Platform Services",
          details: [
            "Provide and maintain our assessment platform",
            "Process your test submissions and generate results",
            "Authenticate your identity and prevent fraud",
            "Customize your learning experience",
          ],
        },
        {
          subtitle: "Communication",
          details: [
            "Send assessment notifications and reminders",
            "Provide customer support and assistance",
            "Share important platform updates",
            "Deliver marketing communications (with consent)",
          ],
        },
        {
          subtitle: "Analytics and Improvement",
          details: [
            "Analyze platform usage and performance",
            "Improve our assessment algorithms",
            "Conduct research for educational purposes",
            "Generate anonymized reports and insights",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
      content: [
        {
          subtitle: "With Your Consent",
          details: [
            "Share results with employers or educational institutions",
            "Provide data to authorized third parties",
            "Include information in testimonials or case studies",
            "Transfer data for business partnerships",
          ],
        },
        {
          subtitle: "Service Providers",
          details: [
            "Cloud hosting and infrastructure providers",
            "Analytics and monitoring services",
            "Customer support platforms",
            "Payment processing services",
          ],
        },
        {
          subtitle: "Legal Requirements",
          details: [
            "Comply with applicable laws and regulations",
            "Respond to legal requests and court orders",
            "Protect our rights and property",
            "Ensure platform security and integrity",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Technical Safeguards",
          details: [
            "End-to-end encryption for sensitive data",
            "Secure data transmission using TLS/SSL",
            "Regular security audits and penetration testing",
            "Multi-factor authentication for accounts",
          ],
        },
        {
          subtitle: "Operational Safeguards",
          details: [
            "Limited access to personal data on need-to-know basis",
            "Employee training on privacy and security",
            "Incident response and breach notification procedures",
            "Regular backup and disaster recovery processes",
          ],
        },
        {
          subtitle: "Compliance",
          details: [
            "GDPR compliance for European users",
            "FERPA compliance for educational records",
            "SOC 2 Type II certification",
            "ISO 27001 information security standards",
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Control",
          details: [
            "Access your personal data and assessment history",
            "Update or correct inaccurate information",
            "Delete your account and associated data",
            "Export your data in a portable format",
          ],
        },
        {
          subtitle: "Privacy Preferences",
          details: [
            "Opt-out of marketing communications",
            "Control cookie and tracking preferences",
            "Manage data sharing settings",
            "Request restriction of data processing",
          ],
        },
        {
          subtitle: "Legal Rights (GDPR)",
          details: [
            "Right to be forgotten (data erasure)",
            "Right to data portability",
            "Right to object to processing",
            "Right to lodge a complaint with supervisory authority",
          ],
        },
      ],
    },
  ];

  const dataRetentionPolicies = [
    {
      type: "Assessment Data",
      duration: "7 years",
      reason: "Educational and legal compliance requirements",
    },
    {
      type: "Personal Information",
      duration: "As long as account is active",
      reason: "Platform functionality and user experience",
    },
    {
      type: "Marketing Data",
      duration: "Until consent is withdrawn",
      reason: "Marketing and communication purposes",
    },
    {
      type: "Technical Logs",
      duration: "90 days",
      reason: "Security monitoring and troubleshooting",
    },
  ];

  const contactInfo = [
    {
      title: "Data Protection Officer",
      email: "privacy@skillguide.com",
      description: "For privacy-related questions and requests",
    },
    {
      title: "Security Team",
      email: "security@skillguide.com",
      description: "For security incidents and concerns",
    },
    {
      title: "General Support",
      email: "support@skillguide.com",
      description: "For general platform support",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="px-3 py-1">
              <Calendar className="w-4 h-4 mr-2" />
              Last Updated: {lastUpdated}
            </Badge>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Quick Summary */}
        <Card className="mb-8 border-skillguide-purple">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              Privacy at a Glance
            </CardTitle>
            <CardDescription>
              Key points about how we handle your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">We Collect:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Personal and assessment information</li>
                  <li>• Technical data for platform improvement</li>
                  <li>• Usage patterns for personalization</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Your Rights:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Access and control your data</li>
                  <li>• Delete your account anytime</li>
                  <li>• Opt-out of marketing communications</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {privacySections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Icon className="w-6 h-6 mr-3 text-skillguide-purple" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {item.subtitle}
                      </h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, detailIndex) => (
                          <li
                            key={detailIndex}
                            className="flex items-start text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      {itemIndex < section.content.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Data Retention */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-6 h-6 mr-3 text-amber-500" />
              Data Retention
            </CardTitle>
            <CardDescription>
              How long we keep different types of information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dataRetentionPolicies.map((policy, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">
                      {policy.type}
                    </h4>
                    <p className="text-sm text-gray-600">{policy.reason}</p>
                  </div>
                  <Badge variant="outline" className="font-medium">
                    {policy.duration}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-6 h-6 mr-3 text-skillguide-purple" />
              Contact Us About Privacy
            </CardTitle>
            <CardDescription>
              Reach out if you have questions or concerns about your privacy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-gray-50 rounded-lg"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {contact.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    {contact.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    {contact.email}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Changes to Policy */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Changes to This Policy</CardTitle>
            <CardDescription>
              How we handle updates to our privacy practices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              We may update this privacy policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. When we make significant changes, we will:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Send you an email notification at least 30 days before changes
                  take effect
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Display a prominent notice on our platform
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Update the "Last Updated" date at the top of this policy
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Provide an opportunity to review and accept the changes
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
