"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useLogoStore } from "../stores/logo-store";

const Theme = () => {
  const { setIsDark } = useLogoStore();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem("isDark");

    if (storedTheme === null) {
      // If no theme is stored, check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDarkMode(prefersDark);
      localStorage.setItem("isDark", JSON.stringify(prefersDark));
    } else {
      setIsDarkMode(JSON.parse(storedTheme));
    }
  }, []);
  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input
        // if  isDarkMode is true set pass trure to setIsDark
        onChange={(e) => setIsDark()}
        // onChange={setIsDark}
        type="checkbox"
        className="theme-controller"
        value={isDarkMode ? "lofi" : "black"}
      />

      {/* sun and moon icons */}
      <Icon className="swap-on text-2xl" icon="hugeicons:moon-02" />
      <Icon className="swap-off text-2xl" icon="hugeicons:sun-03" />
    </label>
  );
};

export default Theme;
