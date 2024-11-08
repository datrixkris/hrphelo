"use client";

import React, { useLayoutEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffDetailsCard from "../components/StaffDetailsCard";
import { useStaffStore } from "../staff-store";
import { StaffDetail } from "../types";

const Page = () => {
  const params = useParams();
  const fetchStaffById = useStaffStore((state) => state.fetchStaffById);
  const loading = useStaffStore((state) => state.loading);
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);

  useLayoutEffect(() => {
    if (params.staffId) {
      // console.log("running the useeffect");
      // console.log(loading);
      const fetchData = async () => {
        try {
          const data = await fetchStaffById(Number(params.staffId));
          setStaffDetails(data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchData();
    }
  }, [params.staffId, fetchStaffById]);

  async function fetchAndSetData() {
    const data = await fetchStaffById(Number(params.staffId));
    setStaffDetails(data);
  }

  return (
    <div>
      {/* header plus breadcrumbs */}
      <PageTitleWithCrumbs
        title="staff profile"
        crumbs={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Staff", link: "/staff" },
          { name: "staff profile" },
        ]}
      />

      {/* profile details */}
      {loading ? (
        <div className="my-5">Getting staff data...</div>
      ) : (
        <div className="my-5">
          <StaffDetailsCard
            staffDetails={staffDetails}
            refreshData={fetchAndSetData}
          />
          <div className="no-scrollbar w-full overflow-x-scroll border-b border-base-300 bg-base-100">
            <div className="px-5">
              <div className="flex">
                <a
                  className={`inline-block px-4 py-2.5 capitalize ${true && "border-b-2 border-hr-yellow text-hr-yellow"}`}
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="inline-block text-nowrap px-4 py-2.5 capitalize"
                >
                  Projects
                </a>
                <a
                  href="#"
                  className="inline-block text-nowrap px-4 py-2.5 capitalize"
                >
                  Bank and Statutory
                </a>
                <a
                  href="#"
                  className="inline-block text-nowrap px-4 py-2.5 capitalize"
                >
                  Assets
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
