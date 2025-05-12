// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";
import LinkWithDropdown from "@/app/components/LinkWithDropdown";
import { clientSidebarLinks as links } from "@/app/data/links";
// import { useHasPermission } from "@/app/hooks/permissions";
import { hasPermission } from "@/utils/permissions";
import { useAuthStore } from "@/app/stores/auth-store";

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="relative h-full border-r border-base-300 bg-base-100 p-2">
        {/* logo  */}
        <div className="flex h-14 items-center justify-center gap-2">
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
                              <span>{link.name}</span>
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
                            <span>{link.name}</span>
                          </div>
                        </ActiveLink>
                      </div>
                    );
                  }
                }
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
