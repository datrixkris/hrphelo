"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SidebarLink } from "../types/link-types";
import { usePathname } from "next/navigation";

interface DropdownProps {
  links: SidebarLink;
}

const LinkWithDropdown = ({ links }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Check if any dropdown item is active
  const isAnyChildActive =
    links.dropdown?.some((item) => pathname.includes(item.link)) || false;

  return (
    <div className="">
      {/* top */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-all duration-200 ${
          isAnyChildActive
            ? "bg-neutral text-neutral-content"
            : "text-neutral-500 hover:bg-neutral/20 hover:text-base-content"
        }`}
      >
        {/* Icon and name */}
        <div className="flex items-center gap-2">
          <Icon icon={links.icon} />
          <span className="truncate text-ellipsis text-sm lg:text-[15px]">
            {links.name}
          </span>
        </div>

        {/* icon chevi */}
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon icon="heroicons:chevron-right" />
        </motion.div>
      </div>

      {/* dropdown */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="mt-2 space-y-1 rounded-lg bg-base-200 p-2">
          {links?.dropdown?.map((link, index) => {
            const isChildActive = pathname.includes(link.link);
            return (
              <div className="" key={index}>
                <Link href={link.link}>
                  <div
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                      isChildActive
                        ? "bg-neutral/20 text-base-content"
                        : "text-neutral-500 hover:bg-neutral/20 hover:text-base-content"
                    }`}
                  >
                    {link.icon && <Icon icon={link.icon} />}
                    <span className="">{link.name}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default LinkWithDropdown;
