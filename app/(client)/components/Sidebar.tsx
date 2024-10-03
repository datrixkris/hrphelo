// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";
import LinkWithDropdown from "@/app/components/LinkWithDropdown";

const Sidebar = () => {
  const links = [
    {
      name: "Dashboard",
      icon: "hugeicons:dashboard-square-03",
      link: "/dashboard",
    },
    {
      name: "Departments",
      icon: "hugeicons:departement",
      link: "/departments",
    },
    {
      name: "Staff",
      icon: "hugeicons:user-group",
      link: "/staff",
    },
    {
      name: "Leaves",
      icon: "hugeicons:calendar-remove-01",
      dropdown: [
        {
          name: "Your leaves",
          link: "/leaves",
        },
        {
          name: "Manage leaves",
          link: "/manage-leaves",
        },
        {
          name: "Leave Settings",
          link: "/leave-settings",
        },
      ],
    },
  ];
  return (
    <div className="relative h-full border-r border-base-300 bg-base-100 p-4">
      {/* logo  */}
      <div className="flex items-center justify-center gap-2">
        {/* logo */}
        <div className="flex size-14 items-center justify-center rounded-full border">
          <Icon icon="heroicons:building-office-2" className="text-4xl"></Icon>
        </div>
      </div>
      {/* title  */}
      <div className="mt-4 border-t border-base-300">
        <div className="my-7 space-y-3">
          {/* dashboard */}
          {links.map((link, index) => {
            if (link.dropdown) {
              return (
                <div className="" key={index}>
                  <LinkWithDropdown links={link} />
                </div>
              );
            } else {
              return (
                <div className="" key={index}>
                  <ActiveLink href={link.link}>
                    <div className="flex items-center gap-2">
                      <Icon icon={link.icon} />
                      <span>{link.name}</span>
                    </div>
                  </ActiveLink>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
