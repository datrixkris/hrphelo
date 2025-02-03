"use client";

import React from "react";
import AddStaff from "./components/AddStaff";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffList from "./components/StaffList";

const Page = () => {
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

      {/* table */}
      <StaffList />
    </div>
  );
};

export default Page;
