"use client";

import React from "react";
import AddStaff from "./components/AddStaff";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffList from "./components/StaffList";
import HasAccess from "@/app/(client)/components/HasAccess";
import { useHasPermission } from "@/app/hooks/permissions";

const Page = () => {
  const hasCreatePermission = useHasPermission("create", "Staff List");
  return (
    <HasAccess module="Staff List">
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
          <div>{hasCreatePermission && <AddStaff />}</div>
        </div>

        {/* table */}
        <StaffList />
      </div>
    </HasAccess>
  );
};

export default Page;
