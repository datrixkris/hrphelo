import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className="h-full border-r border-base-300 bg-base-100 p-4">
      {/* logo  */}
      <div className="">
        <h1 className="">
          <Image
            className="mx-auto h-auto w-auto object-contain dark:hidden"
            src="/images/hrphelo.png"
            alt="logo"
            width={100}
            height={40}
            priority={true}
          />
          <Image
            className="mx-auto hidden h-auto w-auto object-contain dark:block"
            src="/images/hrphelo_white.png"
            alt="logo"
            width={100}
            height={40}
            priority={true}
          />
        </h1>
      </div>
      {/* title  */}
      <div className="mt-4 border-t border-base-300">
        <div className="my-7 space-y-3">
          {/* dashboard */}
          <div className="">
            <ActiveLink href="/admin/dashboard">
              <div className="flex items-center gap-2">
                <Icon icon="hugeicons:dashboard-square-03" />
                <span>Dashboard</span>
              </div>
            </ActiveLink>
          </div>
          {/* Companies */}
          <div className="">
            <ActiveLink href="/admin/companies">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:office-building-outline" />
                <span>Companies</span>
              </div>
            </ActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
