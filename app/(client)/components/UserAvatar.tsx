import { useAuthStore } from "@/app/stores/auth-store";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Staff } from "@/app/types/user-types";
import Link from "next/link";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
// import { StaffProfile } from "../(dashboard)/staff/types";
import { StaffProfile } from "@/app/(client)/(dashboard)/(employee)/staff/types";

interface UserAvatarProp {
  profile: Staff;
}

export const UserAvatar = ({ profile }: UserAvatarProp) => {
  const { logout, user } = useAuthStore();
  const fetchStaffProfile = useStaffStore((state) => state.fetchStaffProfile);
  const [profileData, setProfileData] = useState<StaffProfile | null>(null);
  const [profileComplete, setProfileComplete] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user?.staff.id) {
        await fetchStaffProfile(user.staff.id);
        setProfileData(useStaffStore.getState().profile);
      }
    };

    fetchProfileData();
  }, [user, fetchStaffProfile]);

  // set profile complete status based on various profile data
  useEffect(() => {
    if (profileData && !profileData.isDefault) {
      setProfileComplete(
        profileData.bankInfoStatus &&
          profileData.personalInfoStatus &&
          profileData.iceContactsStatus,
      );
    }
    // console.log(profileData);
  }, [profileData]);

  // logout
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0}>
        <div className="flex cursor-pointer items-center gap-2">
          {/* User profile picture */}
          {!profileComplete ? (
            <div
              className="tooltip tooltip-bottom tooltip-error"
              data-tip="Complete your profile"
            >
              <div
                className={`avatar rounded-full ${!profileComplete && "relative p-0.5 ring-2 ring-red-800"}`}
              >
                <div className="w-10 rounded-full">
                  <img
                    src={profile?.image || "/default-avatar.png"}
                    alt="User Avatar"
                  />
                </div>
                {!profileComplete && (
                  <Icon
                    icon="uis:exclamation-circle"
                    className="absolute -left-1 -top-1 text-lg text-red-800"
                  />
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="avatar">
                <div className="w-10 rounded-full border border-gray-300">
                  <img src={profile?.image} alt="User Avatar" />
                </div>
              </div>
            </div>
          )}
          {/* User name and role */}
          <div className="hidden text-xs md:block">
            <p className="text-sm font-semibold">
              {profile?.name || "User Name"}
            </p>
            <div className="">
              {profile?.designations && profile?.designations.length > 0 ? (
                <p
                  className="tooltip tooltip-bottom w-48 truncate"
                  data-tip="Designations"
                  title={profile?.designations
                    .map((designation) => designation.name)
                    .join(" | ")}
                >
                  {profile?.designations
                    .map((designation) => designation.name)
                    .join(" | ")}
                </p>
              ) : (
                "Role"
              )}
            </div>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box border border-base-300 bg-base-100 text-base-content shadow"
      >
        <li>
          <Link href="/profile" className="flex justify-between">
            <span>
              <Icon
                icon="heroicons:user"
                className="mr-2 inline-block text-lg"
              />
              <span>Profile</span>
            </span>
            <span>
              {!profileComplete && (
                <Icon
                  icon="uis:exclamation-circle"
                  className="text-lg text-red-800"
                />
              )}
            </span>
          </Link>
        </li>
        <li>
          <a>
            <Icon icon="heroicons:cog-6-tooth" className="text-lg" /> Settings
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>
            <Icon
              icon="heroicons:arrow-left-on-rectangle"
              className="text-lg"
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
