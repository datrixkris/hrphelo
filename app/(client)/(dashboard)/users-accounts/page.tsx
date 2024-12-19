import React from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import FilterAndSearch from "../staff/components/StaffFilterAndSearch";
import UsersList from "./components/UsersList";

const Page = () => {
  return (
    <div>
      {/* header plus breadcrumbs */}
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="Users"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Users accounts" },
          ]}
        />
        <div>{/* <AddStaff /> */}</div>
      </div>

      {/* search and filter */}
      <div className="my-5">
        <FilterAndSearch />
      </div>

      {/* table */}
      <UsersList />
    </div>
  );
};

export default Page;
