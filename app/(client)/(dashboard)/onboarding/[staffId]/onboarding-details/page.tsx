"use client";

import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NewHireInformation from "../../components/NewHireInformation";
import NewHireChecklistDetails from "../../components/NewHireChecklistDetails";
import { useStaffStore } from "../../../(employee)/staff/staff-store";
import { StaffData, StaffDetail } from "../../../(employee)/staff/types";

const Page = () => {
  const { staffId } = useParams();
  const { fetchStaffById } = useStaffStore();
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (staffId) {
        const data = await fetchStaffById(Number(staffId));
        setStaffDetails(data);
      }
    };

    fetchData();
  }, []);

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
        <NewHireInformation staff={staffDetails} />
      </div>

      {/* checklists progress */}
      <div className="my-5">
        <NewHireChecklistDetails
          checklists={staffDetails?.company?.checklists}
          staff={staffDetails as StaffData}
        />
      </div>
    </div>
  );
};

export default Page;
