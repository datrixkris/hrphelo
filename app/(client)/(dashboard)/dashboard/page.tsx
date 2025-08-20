"use client";
import React from "react";

import { useAuthStore } from "@/app/stores/auth-store";
import CompanyOverview from "./components/CompanyOverview";
import StaffOverview from "./components/StaffOverview";
import { api } from "@/app/axiosApi/api";
import { useQuery } from "@tanstack/react-query";
import { DashboardData } from "./types";
import DashboardSkeleton from "./components/DashboardSkeleton";

const Page = () => {
  const user = useAuthStore((state) => state.user);
  // console.log(user);
  const { data, isPending, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });
  console.log(data, isPending, error);

  async function getDashboardData(): Promise<DashboardData> {
    const response = await api.get("/v1/dashboard");
    return response.data;
  }

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

      {isPending ? (
        <DashboardSkeleton />
      ) : (
        <>
          {data && <CompanyOverview data={data.admin} />}
          <hr />
          {data && <StaffOverview data={data.staff} />}
        </>
      )}
    </div>
  );
};

export default Page;
