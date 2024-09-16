// import Image from "next/image";
import React from "react";
import ActiveLink from "../../components/ActiveLink";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  return (
    <div className="bg-base-100 h-full p-4 border-r border-base-300">
      {/* logo  */}
      <div className="">
        <h1 className="text-cyan-500 font-bold text-xl text-center">
          company logo
        </h1>
      </div>
      {/* title  */}
      <div className="mt-4 border-t border-base-300">
        <div className="my-7 space-y-3 ">
          {/* dashboard */}
          <div className="">
            <ActiveLink href="/">
              <div className="flex gap-2 items-center">
                <Icon icon="hugeicons:dashboard-square-03" />
                <span>Dashboard</span>
              </div>
            </ActiveLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
