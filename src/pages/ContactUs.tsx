import Footer from "@/components/Footer";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Users,
  HeadphonesIcon,
  Globe,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  priority: z.string().min(1, "Please select a priority level"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactUs = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const contactMethods = [
    {
      title: "General Support",
      description: "For general questions and assistance",
      icon: HeadphonesIcon,
      contact: "support@skillguide.com",
      phone: "+1 (555) 123-4567",
      hours: "24/7 Support",
    },
    {
      title: "Technical Support",
      description: "For technical issues and platform problems",
      icon: MessageCircle,
      contact: "tech@skillguide.com",
      phone: "+1 (555) 123-4568",
      hours: "Mon-Fri 9AM-6PM EST",
    },
    {
      title: "Sales & Partnerships",
      description: "For business inquiries and partnerships",
      icon: Users,
      contact: "sales@skillguide.com",
      phone: "+1 (555) 123-4569",
      hours: "Mon-Fri 9AM-6PM EST",
    },
  ];

  const officeLocations = [
    {
      city: "New York",
      address: "123 Tech Avenue, Suite 500",
      zipCode: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      timezone: "EST",
    },
    {
      city: "San Francisco",
      address: "456 Innovation Drive, Floor 12",
      zipCode: "San Francisco, CA 94105",
      phone: "+1 (555) 987-6543",
      timezone: "PST",
    },
    {
      city: "London",
      address: "789 Business Street, Level 8",
      zipCode: "London, EC1A 1BB, UK",
      phone: "+44 20 7123 4567",
      timezone: "GMT",
    },
  ];

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    setIsSubmitted(true);
    reset();
    // Here you would typically send the data to your backend
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Message Sent Successfully!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for contacting us. We'll get back to you within 24
              hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get in touch with our team. We're here to help you succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-600">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        {...register("phone")}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Select
                        onValueChange={(value) => setValue("subject", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                          <SelectItem value="technical">
                            Technical Support
                          </SelectItem>
                          <SelectItem value="billing">
                            Billing Question
                          </SelectItem>
                          <SelectItem value="assessment">
                            Assessment Issue
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Inquiry
                          </SelectItem>
                          <SelectItem value="feature">
                            Feature Request
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-red-600">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level *</Label>
                    <Select
                      onValueChange={(value) => setValue("priority", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          Low - General Question
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium - Needs Attention
                        </SelectItem>
                        <SelectItem value="high">
                          High - Urgent Issue
                        </SelectItem>
                        <SelectItem value="critical">
                          Critical - System Down
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.priority && (
                      <p className="text-sm text-red-600">
                        {errors.priority.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Please describe your question or issue in detail..."
                      rows={6}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Choose the best way to reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactMethods.map((method, index) => {
                  const Icon = method.icon;
                  return (
                    <div key={index}>
                      <div className="flex items-start space-x-4">
                        <Icon className="w-6 h-6 text-skillguide-purple flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {method.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {method.description}
                          </p>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm">
                              <Mail className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{method.contact}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Phone className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{method.phone}</span>
                            </div>
                            <div className="flex items-center text-sm">
                              <Clock className="w-4 h-4 mr-2 text-gray-400" />
                              <span>{method.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index < contactMethods.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Office Locations */}
            <Card>
              <CardHeader>
                <CardTitle>Office Locations</CardTitle>
                <CardDescription>
                  Visit us at one of our global offices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index}>
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-skillguide-purple flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {office.city}
                        </h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>{office.address}</p>
                          <p>{office.zipCode}</p>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{office.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-2 text-gray-400" />
                            <span>Timezone: {office.timezone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < officeLocations.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle>Response Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email Support</span>
                  <span className="text-sm font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Live Chat</span>
                  <span className="text-sm font-medium">Immediate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Phone Support</span>
                  <span className="text-sm font-medium">Within 4 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Critical Issues</span>
                  <span className="text-sm font-medium">Within 1 hour</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
