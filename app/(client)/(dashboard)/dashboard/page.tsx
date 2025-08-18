"use client";
import React from "react";

import { useAuthStore } from "@/app/stores/auth-store";
import CompanyOverview from "./components/CompanyOverview";
import StaffOverview from "./components/StaffOverview";

const Page = () => {
  const user = useAuthStore((state) => state.user);
  // console.log(user);

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="">
        <h1 className="mb-2 text-2xl font-bold">
          Welcome to your dashboard, {user?.staff.name.split(" ")[0]}!
        </h1>
        <p className="text-gray-600">
          Have a quick overview of your current status and activities.
        </p>
      </div>

      <CompanyOverview />
      <hr />
      <StaffOverview />
    </div>
  );
};

export default Page;
