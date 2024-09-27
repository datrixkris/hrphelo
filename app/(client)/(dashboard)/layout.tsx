"use client";

import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Topnav from "../components/Topnav";
import { useAuthStore } from "@/app/stores/auth-store";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userData = useAuthStore.getState().user;
  console.log(userData);
  


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
      <div className="fixed bottom-0 top-0 w-[250px]">
        <Sidebar/>
      </div>
      <div className="primary-bg ml-[250px] min-h-screen">
        <div>
          <Topnav userdata={userData} />
          <div className="maximum-width py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
