import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${isDark ? "bg-[#1e3a5f]" : "bg-[#60a5fa]"}`}
      data-testid="button-theme-toggle"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
          isDark 
            ? "right-0.5 bg-[#3b82f6]" 
            : "left-0.5 bg-white"
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-white" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-[#60a5fa]" />
        )}
      </div>
    </button>
  );
}
