import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import ResignationsList from "./components/ResignationsList";
import HasAccess from "@/app/(client)/components/HasAccess";

const Page = () => {
  return (
    <HasAccess module="Resignation">
      <div className="">
        <div>
          {/* Header with breadcrumbs */}
          <PageTitleWithCrumbs
            title="Resignations"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Resignations" },
            ]}
          />
        </div>

        {/* resignations list */}
        <div className="my-5">
          <ResignationsList />
        </div>
      </div>
    </HasAccess>
  );
};

export default Page;
