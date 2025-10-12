"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "orange";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  theme: _theme,
}: {
  children: ReactNode;
  theme?: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(_theme ?? "light");

  const toggleTheme = () => {
    setThemeState((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "orange" : "light"
    );
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
