"use client";

import { Upload, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export function UploadForm() {
  return (
    <Card className="p-4 space-y-4">
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
        <p className="mt-2 text-sm font-medium">
          Drop files or click to upload
        </p>
        <p className="text-xs text-muted-foreground">PDF, DOCX, TXT, MD</p>
      </div>

      <div className="flex items-center justify-between p-3 border rounded-md">
        <div>
          <p className="text-sm font-medium">example.pdf</p>
          <p className="text-xs text-muted-foreground">1.2 MB</p>
        </div>
        <Button size="icon" variant="ghost">
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Button className="w-full h-9">Upload Files</Button>
    </Card>
  );
}
