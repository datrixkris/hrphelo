"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className, height = 100, width = 40 }: LogoProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const theme = localStorage.getItem("theme") || "light";
      // Check if the theme is dark or black
      if (theme === "dark" || theme === "black") {
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    }
  }, []);

  return (
    <div>
      <Image
        className={`${className} h-auto w-auto object-contain`}
        src={isDark ? "/images/hrphelo_white.png" : "/images/hrphelo.png"}
        alt="logo"
        width={height}
        height={width}
        priority={true}
      />
    </div>
  );
};

export default Logo;
