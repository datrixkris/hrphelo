"use client";

import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topnav from "../components/Topnav";
import { useAuthStore } from "@/app/stores/auth-store";
import { Icon } from "@iconify/react";
import { ToastContainer, Slide } from "react-toastify";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapse, setCollapse] = useState(false);

  useLayoutEffect(() => {
    const fetchUser = async () => {
      await useAuthStore.getState().fetchUserData();
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      console.log("looo:", isAuthenticated);
      const userData = useAuthStore.getState().user;
      console.log("Current user data:", userData);
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
      <div
        className={`fixed bottom-0 top-0 w-[250px] overflow-hidden opacity-100 transition ${collapse ? "!w-0 opacity-0" : ""}`}
      >
        <Sidebar />
      </div>
      <div
        className={`primary-bg ml-auto min-h-screen w-[calc(100%-250px)] transition ${collapse ? "!w-[calc(100%-0px)]" : ""}`}
      >
        <div className="relative">
          {/* collapse button */}
          <div
            onClick={() => setCollapse(!collapse)}
            className={`-z-1 absolute top-[50vh] flex size-8 cursor-pointer items-center justify-center rounded-full bg-base-100 ${collapse ? "-left-3" : "-left-4"}`}
          >
            {collapse ? (
              <Icon icon="heroicons:chevron-double-right"></Icon>
            ) : (
              <Icon icon="heroicons:chevron-double-left"></Icon>
            )}
          </div>
          <Topnav />
          <div className="maximum-width py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
