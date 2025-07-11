"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "@/app/stores/auth-store";
import { ThemeContext } from "@/app/context/ThemeContext";
import { themes } from "./Setting";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const CompanyLogo = ({
  className = "",
  height = 100,
  width = 40,
}: LogoProps) => {
  const [isDark, setIsDark] = useState(false);
  const user = useAuthStore((state) => state.user);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setIsDark(themes.darkThemes.includes(theme));
  }, [theme]);

  const hasLogoImages =
    user?.company?.company_dark_theme_logo ||
    user?.company.company_light_theme_logo;

  let logoSrc = null;

  const darkLogo = user?.company?.company_dark_theme_logo;
  const lightLogo = user?.company?.company_light_theme_logo;

  if (darkLogo && lightLogo) {
    logoSrc = isDark ? darkLogo : lightLogo;
  } else {
    logoSrc = darkLogo || lightLogo || null;
  }

  return (
    <div>
      {hasLogoImages ? (
        <div className="flex h-14 w-[150px] items-center justify-center overflow-hidden">
          <Image
            className={`${className} max-h-full max-w-full object-contain`}
            src={logoSrc ?? "/default-logo.png"}
            alt="logo"
            width={height}
            height={width}
            priority
          />
        </div>
      ) : (
        <div className="flex size-14 items-center justify-center rounded-full border">
          <Icon icon="heroicons:building-office-2" className="text-4xl" />
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
