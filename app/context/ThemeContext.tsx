"use client";
import { createContext, useEffect, useState, ReactNode, ChangeEvent } from "react";

interface ThemeContextType {
  theme: string;
  changeTheme: (event?: ChangeEvent<HTMLInputElement>) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "light", // Default theme value
  changeTheme: () => {}, // Default function to avoid undefined checks
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem("theme") || "light";
    }
    return "light"; // Default theme if window is undefined
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const changeTheme = (event?: ChangeEvent<HTMLInputElement>) => {
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
