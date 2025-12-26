// src/components/HowItWorks.tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { HelpCircle, Plus, Upload, MessageCircle } from "lucide-react";

interface Step {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    icon: <Plus className="h-4 w-4" />,
    title: "Create a Knowledge Base",
    description:
      "Build a new AI-powered knowledge repository to organize your data.",
  },
  {
    number: 2,
    icon: <Upload className="h-4 w-4" />,
    title: "Upload Documents",
    description:
      "Add PDF, DOCX, MD, or TXT files to your knowledge bases securely.",
  },
  {
    number: 3,
    icon: <MessageCircle className="h-4 w-4" />,
    title: "Start Chatting",
    description:
      "Get instant answers from your knowledge through natural conversations with AI.",
  },
];

export const HowItWorks = () => {
  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center space-x-2 pb-4">
        <HelpCircle className="h-5 w-5 text-primary" />
        <CardTitle className="text-lg">How It Works</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start space-x-4 group">
            {/* Numbered Circle Icon */}
            <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
              {step.number}
            </div>
            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <div className="p-1 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
