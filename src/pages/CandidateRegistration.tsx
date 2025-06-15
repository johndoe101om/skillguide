import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Briefcase,
  BookOpen,
  Github,
  Linkedin,
  Code,
  Upload,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Personal Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  // Education
  degree: z.string().min(1, "Please select your degree"),
  specialization: z.string().min(1, "Please enter your specialization"),

  // Certifications
  certifications: z
    .array(z.string())
    .min(1, "Please select at least one certification"),

  // Professional Experience
  internshipDetails: z.string().optional(),
  coursesCompleted: z.array(z.string()),

  // Social Profiles
  linkedinProfile: z
    .string()
    .url("Invalid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  githubProfile: z
    .string()
    .url("Invalid GitHub URL")
    .optional()
    .or(z.literal("")),

  // Technical Skills
  programmingLanguages: z
    .array(z.string())
    .min(1, "Please select at least one programming language"),
});

const CandidateRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      degree: "",
      specialization: "",
      certifications: [],
      internshipDetails: "",
      coursesCompleted: [],
      linkedinProfile: "",
      githubProfile: "",
      programmingLanguages: [],
    },
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const certificationOptions = [
    "AWS Cloud Practitioner",
    "AWS Solutions Architect",
    "AWS Developer",
    "Azure Fundamentals",
    "Azure Administrator",
    "Azure Developer",
    "NPTEL Python",
    "NPTEL Data Science",
    "Java SE Certification",
    "Oracle Certified Professional",
    "Python Institute PCAP",
    "Microsoft Certified: Azure Data Engineer",
    "Google Cloud Professional",
    "Other",
  ];

  const courseOptions = [
    "Udemy - Complete Python Bootcamp",
    "Udemy - Java Programming Masterclass",
    "Udemy - AWS Certified Solutions Architect",
    "Coursera - Google Data Analytics",
    "Coursera - IBM Data Science",
    "Coursera - Meta Front-End Developer",
    "edX - Introduction to Computer Science",
    "Pluralsight - .NET Development",
    "LinkedIn Learning - Cloud Computing",
    "Other",
  ];

  const programmingLanguageOptions = [
    "Java",
    "Python",
    "C++",
    "C#",
    "JavaScript",
    "TypeScript",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Kotlin",
    "Swift",
    "Scala",
    "R",
    "SQL",
  ];

  const degreeOptions = [
    "B.Tech/B.E. Computer Science",
    "B.Tech/B.E. Information Technology",
    "B.Tech/B.E. Electronics & Communication",
    "B.Sc Computer Science",
    "BCA (Bachelor of Computer Applications)",
    "MCA (Master of Computer Applications)",
    "M.Tech Computer Science",
    "M.Sc Computer Science",
    "Other Engineering",
    "Other",
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", values);

    // Determine batch allocation based on certifications
    let allocatedBatch = "General";
    if (
      values.certifications.some(
        (cert) => cert.includes("AWS") || cert.includes("Java"),
      )
    ) {
      allocatedBatch = "Java Batch";
    } else if (
      values.certifications.some(
        (cert) => cert.includes("Azure") || cert.includes(".NET"),
      )
    ) {
      allocatedBatch = ".NET Batch";
    } else if (values.certifications.some((cert) => cert.includes("Python"))) {
      allocatedBatch = "Data Engineering Batch";
    }

    toast({
      title: "Registration Successful!",
      description: `You have been allocated to ${allocatedBatch}. You will receive an email confirmation shortly.`,
    });

    setIsSubmitting(false);
    setCurrentStep(5); // Success step
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["name", "email", "phone"];
        break;
      case 2:
        fieldsToValidate = ["degree", "specialization"];
        break;
      case 3:
        fieldsToValidate = ["certifications"];
        break;
      case 4:
        fieldsToValidate = ["programmingLanguages"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-skillguide-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Personal Information
              </h2>
              <p className="text-gray-600">
                Let's start with your basic details
              </p>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Phone Number</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <GraduationCap className="w-16 h-16 text-skillguide-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Education Background
              </h2>
              <p className="text-gray-600">
                Tell us about your educational qualifications
              </p>
            </div>

            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your degree" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {degreeOptions.map((degree) => (
                        <SelectItem key={degree} value={degree}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specialization</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your specialization" {...field} />
                  </FormControl>
                  <FormDescription>
                    e.g., Computer Science, Software Engineering, Data Science
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Award className="w-16 h-16 text-skillguide-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Certifications & Experience
              </h2>
              <p className="text-gray-600">
                Share your certifications and professional experience
              </p>
            </div>

            <FormField
              control={form.control}
              name="certifications"
              render={() => (
                <FormItem>
                  <FormLabel>Certifications</FormLabel>
                  <FormDescription>
                    Select all certifications you have completed (This will
                    determine your batch allocation)
                  </FormDescription>
                  <div className="grid md:grid-cols-2 gap-2 mt-2">
                    {certificationOptions.map((certification) => (
                      <FormField
                        key={certification}
                        control={form.control}
                        name="certifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(certification)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), certification]
                                    : field.value?.filter(
                                        (value) => value !== certification,
                                      ) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {certification}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="internshipDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Briefcase className="w-4 h-4" />
                    <span>Internship Details (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your internship experience, company, duration, and key learnings"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coursesCompleted"
              render={() => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Online Courses Completed</span>
                  </FormLabel>
                  <FormDescription>
                    Select courses you have completed on platforms like Udemy,
                    Coursera, etc.
                  </FormDescription>
                  <div className="grid md:grid-cols-2 gap-2 mt-2">
                    {courseOptions.map((course) => (
                      <FormField
                        key={course}
                        control={form.control}
                        name="coursesCompleted"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(course)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), course]
                                    : field.value?.filter(
                                        (value) => value !== course,
                                      ) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {course}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Code className="w-16 h-16 text-skillguide-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">
                Technical Skills & Profiles
              </h2>
              <p className="text-gray-600">
                Share your programming skills and professional profiles
              </p>
            </div>

            <FormField
              control={form.control}
              name="programmingLanguages"
              render={() => (
                <FormItem>
                  <FormLabel>Programming Languages Known</FormLabel>
                  <FormDescription>
                    Select all programming languages you are familiar with
                  </FormDescription>
                  <div className="grid md:grid-cols-3 gap-2 mt-2">
                    {programmingLanguageOptions.map((language) => (
                      <FormField
                        key={language}
                        control={form.control}
                        name="programmingLanguages"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(language)}
                                onCheckedChange={(checked) => {
                                  const updatedValue = checked
                                    ? [...(field.value || []), language]
                                    : field.value?.filter(
                                        (value) => value !== language,
                                      ) || [];
                                  field.onChange(updatedValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {language}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn Profile (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="githubProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile (Optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://github.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-skillguide-50 p-4 rounded-lg">
              <h3 className="font-semibold text-skillguide-700 mb-2 flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Certificate Upload
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                You can upload your certificates after registration is complete.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Certification completion certificates</div>
                <div>• Internship completion certificates</div>
                <div>
                  • Course completion certificates (Udemy, Coursera, etc.)
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
            <h2 className="text-3xl font-bold text-gray-900">
              Registration Successful!
            </h2>
            <p className="text-lg text-gray-600">
              Thank you for registering with the Skill Navigator Application.
            </p>
            <div className="bg-skillguide-50 p-6 rounded-lg">
              <h3 className="font-semibold text-skillguide-700 mb-2">
                What's Next?
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>✓ You will receive a confirmation email shortly</div>
                <div>
                  ✓ Your batch allocation will be communicated within 24 hours
                </div>
                <div>
                  ✓ You can upload your certificates from your dashboard
                </div>
                <div>✓ Training schedule will be shared via email</div>
              </div>
            </div>
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-skillguide-gradient hover:bg-skillguide-gradient-dark"
            >
              Go to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Candidate Registration
          </h1>
          <p className="text-gray-600">
            Complete your registration to join our training programs
          </p>
        </div>

        {currentStep <= 4 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                {renderStep()}

                {currentStep <= 4 && (
                  <div className="flex justify-between mt-8">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < 4 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-skillguide-gradient hover:bg-skillguide-gradient-dark flex items-center"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-hexaware-gradient hover:bg-hexaware-gradient-dark flex items-center"
                      >
                        {isSubmitting
                          ? "Submitting..."
                          : "Complete Registration"}
                        <CheckCircle className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CandidateRegistration;
