"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function AdminThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const sync = () => setIsDark(document.documentElement.classList.contains("dark"));

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  function toggle() {
    const next = !isDark;
    const root = document.documentElement;

    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white/80 text-slate-600 shadow-sm transition hover:border-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:border-brand-700 dark:bg-brand-900/80 dark:text-brand-300 dark:hover:border-brand-500 dark:hover:text-brand-100 dark:hover:bg-brand-800"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
