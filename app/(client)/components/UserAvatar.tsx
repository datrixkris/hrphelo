import { useAuthStore } from "@/app/stores/auth-store";
import { useRouter } from "next/navigation";
import React from "react";
import { Icon } from "@iconify/react";

export const UserAvatar = () => {
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
          {/* admin profile pic */}
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          {/* admin name and role */}
          <div className="hidden text-xs md:block">
            <p className="text-sm font-semibold">Company admin</p>
            <p className="">Human resource</p>
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
