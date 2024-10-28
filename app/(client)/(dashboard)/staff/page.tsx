// import Button from "@/app/components/Button";
"use client";

import React, { useEffect } from "react";

import FilterAndSearch from "./components/StaffFilterAndSearch";
import StaffTable from "./components/StaffTable";
import AddStaff from "./components/AddStaff";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { useStaffStore } from "./staff-store";

const Page = () => {
  const { staffs, loading, fetchStaff } = useStaffStore();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return (
    <div>
      {/* header plus breadcrumbs */}
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="staff"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Staff" },
          ]}
        />
        <div>
          <AddStaff />
        </div>
      </div>

      {/* search and filter */}
      <div className="my-5">
        <FilterAndSearch />
      </div>

      {/* table */}
      <div className="">
        {staffs.length < 1 && loading ? (
          <div className="rounded py-20 text-center">Getting staff data...</div>
        ) : staffs.length > 0 ? (
          <StaffTable staff={staffs} />
        ) : (
          <div className="rounded py-20 text-center">No data available</div>
        )}
      </div>
    </div>
  );
};

export default Page;
