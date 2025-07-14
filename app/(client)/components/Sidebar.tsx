// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";
import LinkWithDropdown from "@/app/components/LinkWithDropdown";
import { clientSidebarLinks as links } from "@/app/data/links";
// import { useHasPermission } from "@/app/hooks/permissions";
import { hasPermission } from "@/utils/permissions";
import { useAuthStore } from "@/app/stores/auth-store";
import CompanyLogo from "@/app/components/CompanyLogo";

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="relative flex h-full flex-col border-r border-base-300 bg-base-100 p-2">
        {/* logo - fixed at top */}
        <div className="flex h-14 shrink-0 items-center justify-center gap-2">
          <CompanyLogo />
        </div>
        {/* title  */}
        <div className="mt-4 flex-1 overflow-hidden border-t border-base-300">
          {user && (
            <div className="no-scrollbar h-full space-y-1 overflow-y-auto px-2 py-7">
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
                              <span className="truncate text-ellipsis text-sm lg:text-[15px]">
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
            <div className="no-scrollbar h-full overflow-y-auto px-2 py-7">
              <div className="space-y-7">
                <div className="skeleton h-4 w-[80%]"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-[60%]"></div>
                <div className="skeleton h-4 w-[90%]"></div>
                <div className="skeleton h-4 w-[75%]"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
