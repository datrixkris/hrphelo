"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSettingsStore } from "../(client)/(dashboard)/settings/setting-store";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const { company, loading } = useSettingsStore();

  useEffect(() => {
    const theme = localStorage?.getItem("theme") || "light";
    setIsDark(theme === "dark" || theme === "black");
  }, []);

  if (loading) {
    return null;
  }

  const hasLogoImages =
    company?.company_dark_theme_logo && company.company_light_theme_logo;
  const logoSrc = isDark
    ? company?.company_dark_theme_logo
    : company?.company_light_theme_logo;

  return (
    <div>
      {hasLogoImages ? (
        <div className="flex size-14 items-center justify-center rounded-full border">
          <Image
            className={`${className} h-auto w-auto object-contain`}
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
