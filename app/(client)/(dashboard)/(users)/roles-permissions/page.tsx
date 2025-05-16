"use client";
import React from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
// import Button from "@/app/components/Button";
// import RolesTable from "./components/RolesTable";
// import { Icon } from "@iconify/react/dist/iconify.js";
import RoleList from "./components/RoleList";
import AddRole from "./components/AddRole";
import HasAccess from "@/app/(client)/components/HasAccess";
import { useHasPermission } from "@/app/hooks/permissions";

const Page = () => {
  // permission
  const hasCreatePermission = useHasPermission("create", "User Role");
  return (
    <HasAccess module="User Role">
      <div>
        {/* header plus breadcrumbs */}
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Roles and Permissions"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Roles and Permissions" },
            ]}
          />
          <div>{hasCreatePermission && <AddRole />}</div>
        </div>

        {/* search and filter */}
        <div className="my-5">{/* <FilterAndSearch /> */}</div>

        {/* table */}
        <RoleList />
      </div>
    </HasAccess>
  );
};

export default Page;
