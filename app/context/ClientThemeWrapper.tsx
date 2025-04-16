"use client";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ClientThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useContext(ThemeContext);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null; 
  }

  return <div data-theme={theme}>{children}</div>;
}
