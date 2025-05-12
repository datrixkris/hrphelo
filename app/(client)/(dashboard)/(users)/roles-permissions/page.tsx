import React from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import Button from "@/app/components/Button";
import RolesTable from "./components/RolesTable";
import { Icon } from "@iconify/react/dist/iconify.js";
import RoleList from "./components/RoleList";
import AddRole from "./components/AddRole";

const Page = () => {
  return (
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
        <div>
          <AddRole />
        </div>
      </div>

      {/* search and filter */}
      <div className="my-5">{/* <FilterAndSearch /> */}</div>

      {/* table */}
      <RoleList />
    </div>
  );
};

export default Page;
