import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { X } from "lucide-react";
import { UploadDocumentStepTabs } from "./uploadDocumentStepTabs";

const DocumentUpload = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card
        className="
          w-full 
          max-w-4xl 
          max-h-[85vh]
          flex 
          flex-col
        "
      >
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>
              <h1 className="text-lg font-bold">Add Document</h1>
            </CardTitle>
            <CardDescription>
              Upload a document to your knowledge base. Support formats: PDF,
              DOCX, and Text files.
            </CardDescription>
          </div>

          <CardAction>
            <X className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" />
          </CardAction>
        </CardHeader>

        <CardContent
          className="
            flex-1 
            overflow-y-auto 
            w-full
          "
        >
          <UploadDocumentStepTabs />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
