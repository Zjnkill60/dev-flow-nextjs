"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<
  { mode: string; setMode: (mode: string) => void } | undefined
>(undefined);

var themeDefault: string;
if (typeof window !== "undefined") {
  themeDefault = localStorage?.theme ? localStorage.theme : "light";
}
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState(themeDefault);

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a  ThemeProvider");
  }

  return context;
}
