import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <AppRoutes />
    </div>
  );
}

export default App;
