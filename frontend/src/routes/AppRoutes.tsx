import { Routes, Route, Navigate } from "react-router-dom";
import { ChatLayout } from "../layout/ChatLayout";
import KnowledgeBaseLayout from "../layout/KnowledgeBaseLayout";
import DashboardLayout from "../layout/DashboardLayout";
import { AppLayout } from "../layout/AppLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" />} />

      <Route element={<AppLayout />}>
        <Route path="/chat" element={<ChatLayout />} />
        <Route path="/chat/:chatId" element={<ChatLayout />} />
        <Route path="/knowledge" element={<KnowledgeBaseLayout />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
