import Theme from "@/app/components/Theme";
import React, { useContext, useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { useAuthStore } from "@/app/stores/auth-store";
import { Icon } from "@iconify/react";
import MobileNav from "./MobileNav";
// import ThemeSwap from "@/app/components/ThemeBtn";
// import { ThemeContext } from "@/app/context/ThemeContext";
// import ThemeSwap from "@/app/components/Theme";

const Topnav = () => {
  const user = useAuthStore((state) => state.user);
  const [showMobileNav, setShowMovileNav] = useState(false);
  // const { changeTheme } = useContext(ThemeContext);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-gradient-to-r from-hr-yellow-light via-hr-yellow to-hr-yellow-dark py-3 text-hr-dark">
        <div className="maximum-width flex items-center justify-between">
          {/* title */}
          <div className="flex items-center gap-4">
            <Icon
              onClick={() => setShowMovileNav(true)}
              icon="quill:hamburger-sidebar"
              className="cursor-pointer text-3xl lg:hidden"
            />
            <h2 className="text-xl font-bold uppercase">
              {user?.company.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* <Theme /> */}
            {/* <ThemeSwap handleOnClick={changeTheme} /> */}

            <UserAvatar />
          </div>
        </div>
      </nav>

      <MobileNav
        closeMobileNav={() => setShowMovileNav(false)}
        isOpen={showMobileNav}
      />
    </>
  );
};

export default Topnav;
