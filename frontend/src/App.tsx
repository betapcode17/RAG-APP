import { useEffect } from "react";
// import { ChatLayout } from "./layout/ChatLayout";
import { useThemeStore } from "./store/themeStore";
import DashboardLayout from "./layout/DashboardLayout";
// import KnowledgeBaseLayout from "./layout/KnowledgeBaseLayout";
function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className="h-screen w-screen overflow-hidden">
      {/* <ChatLayout></ChatLayout>; */}
      {/* <KnowledgeBaseLayout></KnowledgeBaseLayout> */}
      <DashboardLayout></DashboardLayout>
    </div>
  );
}

export default App;
