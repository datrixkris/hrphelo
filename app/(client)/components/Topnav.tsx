import Theme from "@/app/components/Theme";
import React from "react";
import { UserAvatar } from "./UserAvatar";
import { User } from "@/app/types/user-types";

interface TopnavProps {
  userdata: User | null;
}

const Topnav = ({ userdata }: TopnavProps) => {
  return (
    <nav className="bg-gradient-to-r from-hr-yellow-light via-hr-yellow to-hr-yellow-dark py-3 text-hr-dark">
      <div className="maximum-width flex items-center justify-between">
        {/* Title */}
        <h2 className="text-xl font-bold uppercase">{userdata?.company.name || "Company Name"}</h2>

        <div className="flex items-center gap-3">
          <Theme />
          <UserAvatar />
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
