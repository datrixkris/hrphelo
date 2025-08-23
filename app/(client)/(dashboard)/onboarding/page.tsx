import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import NewHireTable from "./components/NewHireTable";
import DepartmentalChecklists from "./components/DepartmentalChecklists";
import HasAccess from "../../components/HasAccess";

const Page = () => {
  return (
    <HasAccess module="Checklists">
      <div className="">
        <div>
          {/* Header with breadcrumbs */}
          <PageTitleWithCrumbs
            title="Onboarding"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Onboarding" },
            ]}
          />
        </div>

        {/* new hire table*/}
        <div className="my-5">
          <NewHireTable />
        </div>

        {/* departmental checklists */}
        <div className="my-5">
          <DepartmentalChecklists />
        </div>
      </div>
    </HasAccess>
  );
};

export default Page;
