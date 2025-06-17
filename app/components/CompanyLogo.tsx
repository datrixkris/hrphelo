"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "@/app/stores/auth-store";

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

  useEffect(() => {
    const theme = localStorage?.getItem("theme") || "light";
    setIsDark(theme === "dark" || theme === "black");
  }, []);

  const hasLogoImages =
    user?.company?.company_dark_theme_logo ||
    user?.company.company_light_theme_logo;

  let logoSrc = null;

  if (
    user?.company?.company_dark_theme_logo &&
    user?.company?.company_light_theme_logo
  ) {
    // Both themes exist, set based on current theme
    logoSrc = isDark
      ? user?.company?.company_dark_theme_logo
      : user?.company?.company_light_theme_logo;
  } else if (user?.company?.company_dark_theme_logo) {
    // Only dark theme exists
    logoSrc = user?.company?.company_dark_theme_logo;
  } else if (user?.company?.company_light_theme_logo) {
    // Only light theme exists
    logoSrc = user?.company?.company_light_theme_logo;
  }
  // If neither exists, logoSrc remains null

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
