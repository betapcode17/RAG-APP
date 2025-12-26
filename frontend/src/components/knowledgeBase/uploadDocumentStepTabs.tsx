"use client";

import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Upload, FileText, Settings } from "lucide-react";
import { cn } from "../../lib/utils";

import { UploadForm } from "./UploadForm";
import { PreviewChunks } from "./PreviewChunks";
import { ProcessStatus } from "./ProcessStatus";

export function UploadDocumentStepTabs() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid grid-cols-3 bg-transparent mb-15 place-items-center">
          {[
            { value: "upload", icon: Upload, label: "Upload", step: 1 },
            { value: "preview", icon: FileText, label: "Preview", step: 2 },
            { value: "process", icon: Settings, label: "Process", step: 3 },
          ].map(({ value, icon: Icon, label, step }) => (
            <TabsTrigger
              key={value}
              value={value}
              className={cn(
                "flex flex-col gap-2 bg-transparent",
                "data-[state=active]:bg-transparent"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border flex items-center justify-center",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                  "data-[state=active]:border-primary"
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-medium">
                {step}. {label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="upload">
          <UploadForm />
        </TabsContent>

        <TabsContent value="preview">
          <PreviewChunks />
        </TabsContent>

        <TabsContent value="process">
          <ProcessStatus />
        </TabsContent>
      </Tabs>
    </div>
  );
}
