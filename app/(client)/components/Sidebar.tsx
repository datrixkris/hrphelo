// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className="h-full border-r border-base-300 bg-base-100 p-4">
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
          <div className="">
            <ActiveLink href="/">
              <div className="flex items-center gap-2">
                <Icon icon="hugeicons:dashboard-square-03" />
                <span>Dashboard</span>
              </div>
            </ActiveLink>
          </div>
          <div className="">
            <ActiveLink href="/departments">
              <div className="flex items-center gap-2">
                <Icon icon="hugeicons:dashboard-square-03" />
                <span>Departments</span>
              </div>
            </ActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
