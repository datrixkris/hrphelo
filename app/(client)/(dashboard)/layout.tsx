"use client";

import { use, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topnav from "../components/Topnav";
import { useAuthStore } from "@/app/stores/auth-store";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import Setting from "@/app/components/Setting";
import { ThemeContext } from "@/app/context/ThemeContext";
import { useSocket } from "@/utils/socket";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapse, setCollapse] = useState(false);
  const { changeTheme } = useContext(ThemeContext);
  const { socket } = useSocket();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      await useAuthStore.getState().fetchUserData();
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("mychecklist", (data: any) => {
  //       console.log("New checklis message", data);
  //     });
  //   }
  // }, []);

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
        className={`fixed bottom-0 top-0 hidden w-[250px] overflow-hidden opacity-100 transition lg:block ${collapse ? "!w-0 opacity-0" : ""}`}
      >
        <Sidebar />
      </div>

      {/* content */}
      <div
        className={`primary-bg ml-auto min-h-screen w-full transition lg:w-[calc(100%-250px)] ${collapse ? "!w-[calc(100%-0px)]" : ""}`}
      >
        <div className="relative">
          {/* collapse button */}
          <div
            onClick={() => setCollapse(!collapse)}
            className={`-z-1 absolute top-[50vh] hidden size-8 cursor-pointer items-center justify-center rounded-full bg-base-100 lg:flex ${collapse ? "-left-3" : "-left-4"}`}
          >
            {collapse ? (
              <Icon icon="heroicons:chevron-double-right"></Icon>
            ) : (
              <Icon icon="heroicons:chevron-double-left"></Icon>
            )}
          </div>
          <Topnav />
          <div className="maximum-width py-5">
            {children}
            <Setting handleOnClick={changeTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}
