"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        disabled
        suppressHydrationWarning
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white/80 text-ink/40 shadow-xs transition-colors opacity-80 ${className}`}
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-white text-ink shadow-xs transition-all duration-300 hover:scale-105 hover:border-brand-blue/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand-blue ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 rotate-0 scale-100 group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-ink transition-transform duration-300 rotate-0 scale-100 group-hover:-rotate-12" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
