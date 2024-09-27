import Theme from "@/app/components/Theme";
import React from "react";

const Topnav = () => {
  return (
    <nav className="bg-gradient-to-r from-hr-yellow-light via-hr-yellow to-hr-yellow-dark py-4 text-hr-dark">
      <div className="maximum-width flex items-center justify-between">
        {/* title */}
        <h2 className="text-xl font-bold uppercase">Dashboard</h2>

        <div className="flex items-center gap-2">
          <Theme />

          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Topnav;
