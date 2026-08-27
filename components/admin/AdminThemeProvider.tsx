"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";
import WebGLBackground from "@/components/WebGLBackground";

const AdminThemeContext = createContext<{ isDark: boolean }>({ isDark: true });

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}

export default function AdminThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useLayoutEffect(() => {
    const syncTheme = () => {
      const saved = localStorage.getItem("theme");
      const prefersDark = saved === "dark";
      const root = document.documentElement;

      root.classList.toggle("dark", prefersDark);
      root.style.colorScheme = prefersDark ? "dark" : "light";
      setIsDark(prefersDark);
    };

    syncTheme();

    const observer = new MutationObserver(() => {
      const root = document.documentElement;
      setIsDark(root.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <AdminThemeContext.Provider value={{ isDark }}>
      <WebGLBackground src="/cd36293b-4b4a-4ade-9193-a9d1757d5f1d.jpg" theme="light" wash={0.08} />
      <WebGLBackground src="/rm373batch2-04.jpg" theme="dark" wash={0.2} />
      {children}
    </AdminThemeContext.Provider>
  );
}
