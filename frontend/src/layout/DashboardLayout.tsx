import React from "react";
import StatCard from "../components/dashboard/StatCard";
import QuickActionCard from "../components/dashboard/QuickActionCard";
import { HowItWorks } from "../components/dashboard/HowItWorks";

const DashboardLayout = () => {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-5 gap-6 flex flex-col">
      <StatCard />
      <QuickActionCard />
      <HowItWorks />
    </div>
  );
};

export default DashboardLayout;
