import { LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  features,
}: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-skillguide-200 hover:border-skillguide-400 bg-gradient-to-br from-white to-skillguide-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-skillguide-gradient p-3 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl text-skillguide-700 group-hover:text-skillguide-600 transition-colors">
              {title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-skillguide-primary rounded-full mt-2 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
