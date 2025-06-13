import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  Users,
  BookOpen,
  HelpCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpCategories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      articles: 8,
      description: "Learn the basics of SkillGuide platform",
    },
    {
      title: "Account Management",
      icon: Users,
      articles: 12,
      description: "Manage your profile and settings",
    },
    {
      title: "Tests & Assessments",
      icon: FileText,
      articles: 15,
      description: "Everything about taking and managing tests",
    },
    {
      title: "Reports & Analytics",
      icon: CheckCircle,
      articles: 10,
      description: "Understanding your performance data",
    },
  ];

  const popularArticles = [
    {
      title: "How to take your first assessment",
      views: 2450,
      category: "Getting Started",
      readTime: "3 min",
    },
    {
      title: "Understanding your test results",
      views: 1890,
      category: "Tests & Assessments",
      readTime: "5 min",
    },
    {
      title: "Setting up your candidate profile",
      views: 1650,
      category: "Account Management",
      readTime: "4 min",
    },
    {
      title: "Accessing your certificates",
      views: 1420,
      category: "Reports & Analytics",
      readTime: "2 min",
    },
  ];

  const faqs = [
    {
      question: "How do I register for an assessment?",
      answer:
        "To register for an assessment, navigate to the 'Register' section from the profile menu, select your batch, fill in your details, and choose your preferred assessment schedule. You'll receive a confirmation email with further instructions.",
    },
    {
      question: "What happens if I miss my scheduled test?",
      answer:
        "If you miss your scheduled test, please contact your batch coordinator immediately. Depending on the circumstances, you may be able to reschedule for the next available slot. Late arrivals beyond 15 minutes are typically not permitted.",
    },
    {
      question: "How are test results calculated?",
      answer:
        "Test results are calculated based on correct answers, time taken, and difficulty level of questions. Our AI-powered system provides personalized feedback and recommendations for improvement based on your performance patterns.",
    },
    {
      question: "Can I retake an assessment?",
      answer:
        "Retake policies vary by assessment type and batch requirements. Generally, you can retake assessments after a cooling-off period. Check with your coordinator or view the specific assessment guidelines for details.",
    },
    {
      question: "How do I access my certificates?",
      answer:
        "Certificates are automatically generated upon successful completion of assessments. You can download them from the 'Profile' section under 'Certificates' or from the 'Reports' page. All certificates are digitally signed and verifiable.",
    },
    {
      question: "What technical requirements do I need?",
      answer:
        "You need a stable internet connection, a modern web browser (Chrome, Firefox, Safari, or Edge), webcam and microphone for proctored exams, and a quiet environment. Mobile devices are supported for some assessments.",
    },
  ];

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      available: "24/7",
      action: "Start Chat",
    },
    {
      title: "Phone Support",
      description: "Speak directly with a support specialist",
      icon: Phone,
      available: "Mon-Fri 9AM-6PM",
      action: "Call Now",
    },
    {
      title: "Email Support",
      description: "Send us your questions via email",
      icon: Mail,
      available: "Response within 24hrs",
      action: "Send Email",
    },
  ];

  const filteredArticles = popularArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to your questions and get the support you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardHeader className="text-center">
                  <Icon className="w-12 h-12 text-skillguide-purple mx-auto mb-2" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary">
                    {category.articles} articles
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Articles */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {searchQuery ? "Search Results" : "Popular Articles"}
            </h2>
            <div className="space-y-4">
              {filteredArticles.map((article, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </span>
                          <span>{article.views} views</span>
                        </div>
                      </div>
                      <HelpCircle className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Support Options */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Need More Help?
            </h2>
            <div className="space-y-4">
              {supportOptions.map((option, index) => {
                const Icon = option.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Icon className="w-6 h-6 text-skillguide-purple flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {option.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {option.description}
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Available: {option.available}
                          </p>
                          <Button size="sm" className="w-full">
                            {option.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Documentation
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Community Forum
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Training Videos
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;
