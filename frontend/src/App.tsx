import { useEffect } from "react";
import { ChatLayout } from "./layout/ChatLayout";
import { useThemeStore } from "./store/themeStore";
function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <ChatLayout></ChatLayout>;
    </div>
  );
}

export default App;
