// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { clientSidebarLinks as links } from "@/app/data/links";
import LinkWithDropdown from "@/app/components/LinkWithDropdown";
import CompanyLogo from "@/app/components/CompanyLogo";
import { hasPermission } from "@/utils/permissions";
import { useAuthStore } from "@/app/stores/auth-store";

const MobileNav = ({
  closeMobileNav,
  isOpen,
}: {
  closeMobileNav: () => void;
  isOpen: boolean;
}) => {
  const user = useAuthStore((state) => state.user);

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
            <div className="flex h-14 items-center justify-center gap-2">
              <CompanyLogo />
            </div>
          </div>
          {/* title  */}
          <div className="mt-4 border-t border-base-300">
            {user && (
              <div className="my-7 space-y-3">
                {/* dashboard */}
                {links.map((link, index) => {
                  if (link.dropdown) {
                    // check every dropdown item to see if user has permissions. All must be true to show this dropdown
                    if (
                      link.dropdown.every(
                        (item) =>
                          hasPermission(user, "read", item.module) === true,
                      )
                    ) {
                      return (
                        <div className="" key={index}>
                          <LinkWithDropdown links={link} />
                        </div>
                      );
                    }
                  } else if (link.link) {
                    // if link has module,
                    if (link.module) {
                      // check if user has permission to access the module
                      if (hasPermission(user, "read", link.module)) {
                        return (
                          <div className="" key={index}>
                            <ActiveLink href={link.link}>
                              <div className="flex items-center gap-2">
                                <Icon icon={link.icon} />
                                <span className="truncate text-ellipsis text-sm lg:text-base">
                                  {link.name}
                                </span>
                              </div>
                            </ActiveLink>
                          </div>
                        );
                      }
                    }

                    // if link has no module, like Dashboard
                    else {
                      return (
                        <div className="" key={index}>
                          <ActiveLink href={link.link}>
                            <div className="flex items-center gap-2">
                              <Icon icon={link.icon} />
                              <span className="truncate text-ellipsis text-sm lg:text-base">
                                {link.name}
                              </span>
                            </div>
                          </ActiveLink>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            )}
            {!user && (
              <div className="my-7 space-y-7">
                <div className="skeleton h-4 w-[80%]"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-[60%]"></div>
                <div className="skeleton h-4 w-[90%]"></div>
                <div className="skeleton h-4 w-[75%]"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileNav;
