import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import { DocumentsList } from "../components/knowledgeBase/document-list";
import ChatHeader from "../components/chat/ChatHeader";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

const KnowledgeBaseLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />

        <SidebarInset className="flex flex-col p-4">
          <ChatHeader />
          <div className="flex flex-row justify-between py-5">
            <div className="text-2xl       font-bold">Knowledge Base</div>
            <Button variant="outline">
              <Plus />
              Add Document
            </Button>
          </div>
          <DocumentsList></DocumentsList>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default KnowledgeBaseLayout;
