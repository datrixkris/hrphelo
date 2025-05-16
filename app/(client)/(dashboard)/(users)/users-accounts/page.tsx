import React from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
// import FilterAndSearch from "@/app/(client)/(dashboard)/(employee)/staff/components/StaffFilterAndSearch";
import UsersList from "./components/UsersList";
import HasAccess from "@/app/(client)/components/HasAccess";

const Page = () => {
  return (
    <HasAccess module="Module">
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
        <div className="my-5">{/* <FilterAndSearch /> */}</div>

        {/* table */}
        <UsersList />
      </div>
    </HasAccess>
  );
};

export default Page;
