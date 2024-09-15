import Theme from "@/app/components/Theme";
import React from "react";

const Topnav = () => {
  return (
    <nav className="bg-gradient-to-r text-hr-dark from-hr-yellow-light via-hr-yellow to-hr-yellow-dark py-4">
      <div className="maximum-width flex justify-between items-center">
        {/* title */}
        <h2 className="uppercase font-bold text-xl">Company name</h2>

        <div className="flex items-center gap-2">
          <Theme />

          <span>profile</span>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
