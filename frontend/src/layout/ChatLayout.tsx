import AppSidebar from "../components/AppSidebar";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";

import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import { ChatView } from "../components/chat/ChatView";

export const ChatLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />

        <SidebarInset className="flex flex-col">
          <ChatHeader />
          <ChatView />
          <ChatInput />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
