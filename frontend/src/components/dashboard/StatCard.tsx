import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Book, MessageSquare, MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";

const StatCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {" "}
      <Card className="w-full hover:shadow-md transition-shadow">
        {" "}
        <CardHeader className="flex flex-row items-center space-x-4 pb-3">
          {" "}
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Book className="h-4 w-4" />{" "}
          </Button>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground">
              3
            </CardTitle>{" "}
            <CardDescription className="text-sm font-medium">
              Knowledge Bases
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between pt-0">
          {" "}
          <p className="text-sm text-muted-foreground">
            View all knowledge bases
          </p>
          <MoveUpRight className="h-4 w-4 text-primary" />{" "}
        </CardContent>
      </Card>
      {/* Card 2: Chat Sessions */}
      <Card className="w-full hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center space-x-4 pb-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground">
              2
            </CardTitle>
            <CardDescription className="text-sm font-medium">
              Chat Sessions
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-row items-center justify-between pt-0">
          <p className="text-sm text-muted-foreground">View chat sessions</p>
          <MoveUpRight className="h-4 w-4 text-primary" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCard;
