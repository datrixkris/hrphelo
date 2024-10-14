"use client";
import { createContext, useEffect, useState } from "react";

interface ThemeContextType {
  theme?: string;
  changeTheme?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}
export const ThemeContext = createContext<ThemeContextType>({});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const changeTheme = (event?: React.ChangeEvent<HTMLInputElement>) => {
    const nextTheme: string | null = event?.target.value || null;
    if (nextTheme) {
      setTheme(nextTheme);
    } else {
      setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }
  };
  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
