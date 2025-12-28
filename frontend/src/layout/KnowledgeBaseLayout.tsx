"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { DocumentsList } from "../components/knowledgeBase/documentList";

import { Button } from "../components/ui/button";
import { Plus, X } from "lucide-react";

import { UploadDocumentStepTabs } from "../components/knowledgeBase/uploadDocumentStepTabs";

const KnowledgeBaseLayout = () => {
  return (
    <div className="m-4">
      <div className="flex items-center justify-between py-5">
        <div className="text-2xl font-bold">Knowledge Base</div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent className="max-w-4xl p-0">
            <AlertDialogHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
              <AlertDialogTitle className="text-lg font-semibold">
                Add Document
              </AlertDialogTitle>

              <AlertDialogCancel className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </AlertDialogCancel>
            </AlertDialogHeader>

            <div className="px-6 py-4">
              <UploadDocumentStepTabs />
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <DocumentsList />
    </div>
  );
};

export default KnowledgeBaseLayout;
