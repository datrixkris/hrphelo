import Theme from "@/app/components/Theme";
import React from "react";
import { UserAvatar } from "./UserAvatar";

const Topnav = () => {
  return (
    <nav className="bg-gradient-to-r from-hr-yellow-light via-hr-yellow to-hr-yellow-dark py-3 text-hr-dark">
      <div className="maximum-width flex items-center justify-between">
        {/* title */}
        <h2 className="text-xl font-bold uppercase">Company name</h2>

        <div className="flex items-center gap-3">
          <Theme />

          {/* <span>profile</span> */}
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
