"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffDetailsCard from "../components/StaffDetailsCard";
import { useStaffStore } from "../staff-store";
import { StaffDetail } from "../types";
import { Icon } from "@iconify/react/dist/iconify.js";
import StaffProfile from "../components/StaffProfile";
import StaffAssets from "../components/StaffAssets";

const Page = () => {
  const params = useParams();
  const fetchStaffById = useStaffStore((state) => state.fetchStaffById);
  const loading = useStaffStore((state) => state.loading);
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Profile");

  // Fetch staff details
  const fetchData = async () => {
    try {
      const data = await fetchStaffById(Number(params.staffId));
      setStaffDetails(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff details. Please try again.");
    }
  };

  useEffect(() => {
    if (params.staffId) {
      fetchData();
    }
  }, [params.staffId, fetchStaffById]);

  return (
    <div>
      {/* Header with breadcrumbs */}
      <PageTitleWithCrumbs
        title="Staff Profile"
        crumbs={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Staff", link: "/staff" },
          { name: "Staff Profile" },
        ]}
      />

      {/* Profile Details */}
      {loading ? (
        <div className="my-5">Getting staff data...</div>
      ) : error ? (
        <div className="my-5 text-red-500">{error}</div>
      ) : (
        <div className="my-5">
          <StaffDetailsCard
            staffDetails={staffDetails}
            refreshData={fetchData}
          />
          {/* Tab Navigation */}
          <div className="no-scrollbar w-full overflow-x-scroll border-b border-base-300 bg-base-100">
            <div className="px-5">
              <div className="flex">
                {["Profile", "Projects", "Bank and Statutory", "Assets"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`inline-block px-4 py-2.5 capitalize ${
                        activeTab === tab
                          ? "border-b-2 border-hr-yellow text-hr-yellow"
                          : ""
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {activeTab === "Profile" && <StaffProfile />}
          {activeTab === "Assets" && <StaffAssets />}
        </div>
      )}
    </div>
  );
};

export default Page;
