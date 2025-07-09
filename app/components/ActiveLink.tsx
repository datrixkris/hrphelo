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
  const isActive = pathname.includes(href);

  return (
    <Link href={href}>
      <div
        className={
          isActive
            ? "rounded-lg bg-neutral px-3 py-2 text-neutral-content transition-all duration-200"
            : "rounded-lg px-3 py-2 text-neutral-500 transition-all duration-200 hover:bg-neutral/20 hover:text-base-content"
        }
      >
        {children}
      </div>
    </Link>
  );
};

export default ActiveLink;
