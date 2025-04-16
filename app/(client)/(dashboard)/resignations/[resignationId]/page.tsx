"use client";

import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React, { useState } from "react";
import StaffDetails from "../components/StaffDetails";
import { StaffData, StaffDetail } from "../../(employee)/staff/types";
import ResignationDetails from "../components/ResignationDetails";

const Page = () => {
  const [staffDetails] = useState<StaffDetail | null>(null);
  return (
    <div>
      <div className="">
        {/* Header with breadcrumbs */}
        <PageTitleWithCrumbs
          title="Resignation Details"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Resignations", link: "/resignations" },
            { name: "Staff Resignation details" },
          ]}
        />
      </div>

      {/* Staff information */}
      <div className="my-5">
        <StaffDetails staff={staffDetails} />
      </div>

      {/* checklists progress */}
      <div className="my-5">
        <ResignationDetails
          checklists={staffDetails?.company?.checklists}
          staff={staffDetails as StaffData}
        />
      </div>
    </div>
  );
};

export default Page;
