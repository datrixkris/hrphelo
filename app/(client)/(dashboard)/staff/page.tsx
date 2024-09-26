import Button from "@/app/components/Button";
import React from "react";

import FilterAndSearch from "./components/FilterAndSearch";
import StaffTable from "./components/StaffTable";
import AddStaffButton from "./components/AddStaffButton";

const Page = () => {
  return (
    <div>
      {/* header plus breadcrumbs */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-pageTitle dark:text-swapText text-lg font-medium leading-[1.2] sm:mb-[5px] sm:text-2xl md:text-[26px]">
            Staff
          </h3>
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a>Dashboard</a>
              </li>
              <li>Staff</li>
            </ul>
          </div>
        </div>
        <div>
          <AddStaffButton />
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
