"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import ActiveLink from "./ActiveLink";
import { motion } from "framer-motion";
import { SidebarLink } from "../types/link-types";

interface DropdownProps {
  links: SidebarLink;
}

const LinkWithDropdown = ({ links }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="">
      {/* top */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex cursor-pointer items-center justify-between text-neutral-500 transition hover:text-base-content"
      >
        {/* Icon and name */}
        <div className="flex items-center gap-2">
          <Icon icon={links.icon} />
          <span>{links.name}</span>
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
        <div className="mt-2 space-y-2 rounded-lg bg-base-200 p-3">
          {links?.dropdown?.map((link, index) => {
            return (
              <div className="" key={index}>
                <ActiveLink href={link.link}>
                  <div className="flex items-center gap-2 text-sm">
                    <li className="">{link.name}</li>
                  </div>
                </ActiveLink>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default LinkWithDropdown;
