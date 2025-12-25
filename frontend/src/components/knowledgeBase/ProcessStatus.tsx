"use client";

import { Settings } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

export function ProcessStatus() {
  return (
    <Card className="p-4 space-y-4">
      <div className="p-3 border rounded-md space-y-1">
        <p className="text-sm font-medium">example.pdf</p>
        <p className="text-xs text-muted-foreground">Status: Processing</p>
        <Progress value={50} />
      </div>

      <Button className="w-full h-9">
        <Settings className="w-4 h-4 mr-2" />
        Process
      </Button>
    </Card>
  );
}
