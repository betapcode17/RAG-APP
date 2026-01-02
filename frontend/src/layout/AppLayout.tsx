import AppSidebar from "../components/sidebar/AppSidebar";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import ChatHeader from "../components/chat/ChatHeader";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />

        {/* PHẢI cho SidebarInset full height */}
        <SidebarInset className="flex flex-col flex-1 min-h-0">
          <ChatHeader />

          {/* Outlet phải chiếm phần còn lại */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
