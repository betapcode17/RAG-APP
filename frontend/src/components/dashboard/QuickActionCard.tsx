import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Upload, MessageCircle } from "lucide-react"; // Import icons phù hợp

const QuickActionCard = () => {
  return (
    <div className="flex flex-col space-y-4">
      {" "}
      <h1 className="text-lg font-bold">Quick Actions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {" "}
        {/* Grid: 1 col mobile, 3 col desktop; gap-4 đều */}
        {/* Card 1: Create */}
        <Card className="w-full hover:shadow-md transition-shadow">
          {" "}
          <CardHeader className="flex flex-col items-start space-y-2 pb-3">
            {" "}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">
                Create Knowledge Base
              </CardTitle>
              <CardDescription className="text-sm">
                Build a new AI-powered knowledge repository
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="ghost"
              className="w-full justify-start text-primary"
            >
              Start Creating →
            </Button>
          </CardContent>
        </Card>
        {/* Card 2: Upload */}
        <Card className="w-full hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-col items-start space-y-2 pb-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">
                Upload Documents
              </CardTitle>
              <CardDescription className="text-sm">
                Add PDF, DOCX, MD or TXT files to your knowledge bases
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="ghost"
              className="w-full justify-start text-primary"
            >
              Upload Files →
            </Button>
          </CardContent>
        </Card>
        {/* Card 3: Start Chatting */}
        <Card className="w-full hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-col items-start space-y-2 pb-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold">
                Start Chatting
              </CardTitle>
              <CardDescription className="text-sm">
                Get instant answers from your knowledge with AI
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              variant="ghost"
              className="w-full justify-start text-primary"
            >
              Start Chat →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActionCard;
