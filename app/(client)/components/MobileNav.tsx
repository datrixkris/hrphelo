// import Image from "next/image";
import React from "react";
// import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
// import { clientSidebarLinks as links } from "@/app/data/links";
// import LinkWithDropdown from "@/app/components/LinkWithDropdown";
// import CompanyLogo from "@/app/components/CompanyLogo";
// import { hasPermission } from "@/utils/permissions";
// import { useAuthStore } from "@/app/stores/auth-store";
import Sidebar from "./Sidebar";

const MobileNav = ({
  closeMobileNav,
  isOpen,
}: {
  closeMobileNav: () => void;
  isOpen: boolean;
}) => {
  // const user = useAuthStore((state) => state.user);

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
        <div className="relative h-full max-w-[250px]" onClick={sidebarClick}>
          {/* close button */}
          <div className="absolute right-2 top-2 z-20">
            <Icon
              onClick={closeMobileNav}
              icon="material-symbols:menu-open"
              className="cursor-pointer text-3xl"
            ></Icon>
          </div>
          <Sidebar />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNav;
