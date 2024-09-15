"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
}

const ActiveLink = ({ href, children }: ActiveLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={
          isActive
            ? "text-base-content transition"
            : "text-neutral-500 hover:text-base-content transition"
        }
      >
        {children}
      </div>
    </Link>
  );
};

export default ActiveLink;
