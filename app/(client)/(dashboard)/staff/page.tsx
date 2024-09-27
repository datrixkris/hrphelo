// import Button from "@/app/components/Button";
import React from "react";

import FilterAndSearch from "./components/FilterAndSearch";
import StaffTable from "./components/StaffTable";
import AddStaff from "./components/AddStaff";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";

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

      {/* search and filter */}
      <div className="my-5">
        <FilterAndSearch />
      </div>

      {/* table */}
      <div className="">
        <StaffTable />
      </div>
    </div>
  );
};

export default Page;
