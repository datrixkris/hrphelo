import { useAuthStore } from "@/app/stores/auth-store";
import { useRouter } from "next/navigation";
import React from "react";
import { Icon } from "@iconify/react";
import { Staff } from "@/app/types/user-types";

interface UserAvatarProp {
  profile: Staff;
}

export const UserAvatar = ({ profile }: UserAvatarProp) => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0}>
        <div className="flex cursor-pointer items-center gap-2">
          {/* User profile picture */}
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={profile?.image || "/default-avatar.png"} 
                alt="User Avatar"
              />
            </div>
          </div>

          {/* User name and role */}
          <div className="hidden text-xs md:block">
            <p className="text-sm font-semibold">{profile?.name || "User Name"}</p>
            <p className="">{profile?.role || "Role"}</p>
          </div>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] w-52 rounded-box border border-base-300 bg-base-100 text-base-content shadow"
      >
        <li>
          <a>
            <Icon icon="heroicons:user" className="text-lg" /> Profile
          </a>
        </li>
        <li>
          <a>
            <Icon icon="heroicons:cog-6-tooth" className="text-lg" /> Settings
          </a>
        </li>
        <li>
          <a onClick={handleLogout}>
            <Icon icon="heroicons:arrow-left-on-rectangle" className="text-lg" /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};
