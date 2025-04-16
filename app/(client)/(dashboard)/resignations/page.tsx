import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import ResignationsList from "./components/ResignationsList";

const Page = () => {
  return (
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
  );
};

export default Page;
