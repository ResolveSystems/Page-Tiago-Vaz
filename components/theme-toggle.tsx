"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema claro/escuro"
      className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border border-border/10 bg-background-soft transition-colors hover:border-primary/30"
    >
      {theme === "light" ? (
        <Sun className="h-[18px] w-[18px] stroke-[1.8] text-primary" />
      ) : (
        <Moon className="h-[18px] w-[18px] stroke-[1.8] text-primary" />
      )}
    </button>
  );
}
