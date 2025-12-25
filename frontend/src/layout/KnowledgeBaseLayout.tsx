"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { DocumentsList } from "../components/knowledgeBase/documentList";
import ChatHeader from "../components/chat/ChatHeader";
import { Button } from "../components/ui/button";
import { Plus, X } from "lucide-react";

import { UploadDocumentStepTabs } from "../components/knowledgeBase/uploadDocumentStepTabs";

const KnowledgeBaseLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />

        <SidebarInset className="flex flex-col p-4">
          <ChatHeader />

          {/* ===== Header ===== */}
          <div className="flex items-center justify-between py-5">
            <div className="text-2xl font-bold">Knowledge Base</div>

            {/* ===== ADD DOCUMENT DIALOG ===== */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Document
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="max-w-4xl p-0">
                {/* Header */}
                <AlertDialogHeader className="border-b px-6 py-4 flex flex-row items-center justify-between">
                  <AlertDialogTitle className="text-lg font-semibold">
                    Add Document
                  </AlertDialogTitle>

                  <AlertDialogCancel className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </AlertDialogCancel>
                </AlertDialogHeader>

                {/* Body */}
                <div className="px-6 py-4">
                  <UploadDocumentStepTabs />
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* ===== Document List ===== */}
          <DocumentsList />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default KnowledgeBaseLayout;
