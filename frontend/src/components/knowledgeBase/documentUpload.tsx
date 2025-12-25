import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { X } from "lucide-react";
import { UploadDocumentStepTabs } from "./uploadDocumentStepTabs";
const DocumentUpload = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-lg font-bold">Add Document</h1>
          </CardTitle>
          <CardDescription>
            Upload a document to your knowledge base. Support formats: PDF,
            DOCX, and Text files.
          </CardDescription>
          <CardAction>
            <X className="h-4 w-4" />
          </CardAction>
        </CardHeader>
        <CardContent className="w-full">
          <UploadDocumentStepTabs></UploadDocumentStepTabs>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DocumentUpload;
