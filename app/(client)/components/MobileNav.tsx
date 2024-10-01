// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MobileNav = ({
  closeMobileNav,
  isOpen,
}: {
  closeMobileNav: () => void;
  isOpen: boolean;
}) => {
  const links = [
    {
      name: "Dashboard",
      icon: "hugeicons:dashboard-square-03",
      link: "/dashboard",
    },
    {
      name: "Departments",
      icon: "hugeicons:dashboard-square-03",
      link: "/departments",
    },
    {
      name: "Staff",
      icon: "hugeicons:user-group",
      link: "/staff",
    },
  ];

  // Sidebar animation variants
  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  function sidebarClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.stopPropagation();
  }

  return (
    <motion.div
      className="sidebar"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      style={{
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <div
        onClick={closeMobileNav}
        className="fixed bottom-0 left-0 top-0 z-[50] w-full overflow-hidden opacity-100 transition lg:hidden"
      >
        <div
          className="relative h-full max-w-[250px] border-r border-base-300 bg-base-100 p-4"
          onClick={sidebarClick}
        >
          {/* close button */}
          <div className="absolute right-2 top-2">
            <Icon
              onClick={closeMobileNav}
              icon="material-symbols:menu-open"
              className="cursor-pointer text-3xl"
            ></Icon>
          </div>
          {/* logo  */}
          <div className="flex items-center justify-center gap-2">
            {/* logo */}
            <div className="flex size-14 items-center justify-center rounded-full border">
              <Icon
                icon="heroicons:building-office-2"
                className="text-4xl"
              ></Icon>
            </div>
          </div>
          {/* title  */}
          <div className="mt-4 border-t border-base-300">
            <div className="my-7 space-y-3">
              {/* dashboard */}
              {links.map((link, index) => {
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
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNav;
