import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import NewHireInformation from "../../components/NewHireInformation";
import NewHireChecklistDetails from "../../components/NewHireChecklistDetails";

const Page = () => {
  return (
    <div>
      <div className="">
        {/* Header with breadcrumbs */}
        <PageTitleWithCrumbs
          title="Onboarding Details"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Onboarding", link: "/onboarding" },
            { name: "Staff Onboarding details" },
          ]}
        />
      </div>

      {/* Staff information */}
      <div className="my-5">
        <NewHireInformation />
      </div>

      {/* checklists progress */}
      <div className="my-5">
        <NewHireChecklistDetails />
      </div>
    </div>
  );
};

export default Page;
