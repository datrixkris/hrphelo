"use client";

import React from "react";
import Image from "next/image";
import { useLogoStore } from "../stores/logo-store";

const Logo = () => {
  const isDark = useLogoStore((state) => state.isDark);
  return (
    <div className="">
      <Image
        className="h-auto w-auto object-contain"
        src={isDark ? "/images/hrphelo_white.png" : "/images/hrphelo.png"}
        alt="logo"
        width={100}
        height={40}
        priority={true}
      />
    </div>
  );
};

export default Logo;
