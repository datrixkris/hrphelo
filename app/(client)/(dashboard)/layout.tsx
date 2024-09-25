"use client";

import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topnav from "../components/Topnav";
import { useAuthStore } from "@/app/stores/auth-store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();


  // useLayoutEffect(() => {
  //   const fetchUser = async () => {
  //     await useAuthStore.getState().fetchUserData();
  //     const isAuthenticated = useAuthStore.getState().isAuthenticated;
  //     console.log("looo:", isAuthenticated);
  //     const userData = useAuthStore.getState().user;
  //     console.log("Current user data:", userData);
  //     if (!isAuthenticated) {
  //       router.push("/auth/login");
  //     }
  //   };

  //   fetchUser();
  // }, [router]);

  return (
    <div>
      <div className="fixed bottom-0 top-0 w-[250px]">
        <Sidebar />
      </div>
      <div className="primary-bg ml-[250px] min-h-screen">
        <div>
          <Topnav />
          <div className="maximum-width py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
