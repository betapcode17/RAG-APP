import { FileText, Settings, Upload } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import React from "react";

export const UploadDocumentStepTabs = () => {
  return (
    <Tabs
      defaultValue="upload"
      className="w-full flex flex-row justify-between"
    >
      <TabsList>
        <TabsTrigger value="upload" className="rounded-full">
          <div className="flex flex-col">
            <Upload />
          </div>
        </TabsTrigger>

        <TabsTrigger value="preview" className="rounded-full">
          <FileText />
        </TabsTrigger>
        <TabsTrigger value="process" className="rounded-full">
          <Settings />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
};
