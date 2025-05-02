import React, { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import { useAuthStore } from "@/app/stores/auth-store";
import { Icon } from "@iconify/react";
import MobileNav from "./MobileNav";
import StaffOnboardingProgress from "@/app/components/StaffOnboardingProgress";

const Topnav = () => {
  const user = useAuthStore((state) => state.user);
  const staffMember = user?.staff;

  const [showMobileNav, setShowMobileNav] = useState(false);
  console.log("user", user);

  return (
    <>
      <nav className="sticky top-0 z-40 h-20 bg-gradient-to-r from-hr-yellow-light via-hr-yellow to-hr-yellow-dark py-3 text-hr-dark">
        <div className="maximum-width flex h-full items-center justify-between">
          {/* title */}
          <div className="flex items-center gap-4">
            <Icon
              onClick={() => setShowMobileNav(true)}
              icon="quill:hamburger-sidebar"
              className="cursor-pointer text-3xl lg:hidden"
            />
            <h2 className="text-xl font-bold uppercase">
              {user?.company.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!user?.staff?.onboarding_complete && <StaffOnboardingProgress />}

            {staffMember && <UserAvatar profile={staffMember} />}
          </div>
        </div>
      </nav>

      <MobileNav
        closeMobileNav={() => setShowMobileNav(false)}
        isOpen={showMobileNav}
      />
    </>
  );
};

export default Topnav;
