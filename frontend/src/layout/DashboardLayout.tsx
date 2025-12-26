import React from "react";
import StatCard from "../components/dashboard/StatCard";
import { SidebarInset, SidebarProvider } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import { HowItWorks } from "../components/dashboard/HowItWorks";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <ChatHeader />

          <div className="flex-1 overflow-y-auto px-8 py-5 gap-6 flex flex-col">
            <StatCard />
            <QuickActionCard />
            <HowItWorks />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
