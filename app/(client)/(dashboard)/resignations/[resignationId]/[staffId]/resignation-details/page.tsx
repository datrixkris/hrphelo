"use client";

import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React, { useEffect, useState } from "react";
import StaffDetails from "../../../components/StaffDetails";
import { StaffDetail } from "../../../../(employee)/staff/types";
import ResignationDetails from "../../../components/ResignationDetails";
import { useParams } from "next/navigation";
import { useResignationsStore } from "../../../resignations-store";
import { Resignation } from "../../../types";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";

const Page = () => {
  const { resignationId } = useParams();
  const { staffId } = useParams();
  const fetchResignationById = useResignationsStore(
    (state) => state.fetchResignationById,
  );
  const fetchStaffById = useStaffStore((state) => state.fetchStaffById);
  const [resignation, setResignationDetails] = useState<Resignation | null>(
    null,
  );
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (resignationId) {
        const data = await fetchResignationById(Number(resignationId));
        setResignationDetails(data);
      }
      if (staffId) {
        const data = await fetchStaffById(Number(staffId));
        setStaffDetails(data);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
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
      {loading ? (
        <div className="">Loading...</div>
      ) : (
        <div>
          <div className="my-5">
            <StaffDetails staff={staffDetails} resignation={resignation} />
          </div>

          {/* checklists progress */}
          <div className="my-5">
            <ResignationDetails
              checklists={staffDetails?.company?.checklists}
              // staff={staffDetails as StaffData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
