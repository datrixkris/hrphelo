"use client";

import { useContext, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topnav from "../components/Topnav";
import { useAuthStore } from "@/app/stores/auth-store";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import Setting from "@/app/components/Setting";
import { ThemeContext } from "@/app/context/ThemeContext";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [collapse, setCollapse] = useState(false);
  const { changeTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  // const { socket } = useSocket();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      await useAuthStore.getState().fetchUserData();
      setLoading(false);
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      if (!isAuthenticated) {
        router.push("/auth/login");
      }
    };

    fetchUser();
  }, [router]);

  // useEffect(() => {
  //   if (socket) {
  //     // Wait for the "connect" event to ensure the socket is fully connected
  //     socket.on("connect", () => {
  //       console.log("Socket is fully connected, ID:", socket.id);
  //     });

  //     socket.on("mychecklists", (data: any) => {
  //       console.log("New checklist message", data);
  //     });
  //   }
  // }, [socket]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse">
          <Image src="/images/HR.png" alt="logo" width={100} height={100} />
        </div>
      </div>
    );
  }

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
