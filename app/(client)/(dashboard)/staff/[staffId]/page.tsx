"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffDetailsCard from "../components/StaffDetailsCard";
import { useStaffStore } from "../staff-store";
import { StaffDetail } from "../types";
import StaffProfile from "../components/StaffProfile";
import StaffAssets from "../components/StaffAssets";
import ProjectList from "../../projects/components/ProjectList";
import MyOrgChart from "../components/OrgChart";

const TABS = [
  "Profile",
  "Projects",
  "Bank and Statutory",
  "Assets",
  "Organogram",
];

const Page = () => {
  const { staffId } = useParams();
  const {
    fetchStaffProfile,
    fetchStaffById,
    profile,
    fetchStaffOrg,
    staffOrgnogram,
  } = useStaffStore();
  const loading = useStaffStore((state) => state.loading);
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Profile");

  // Fetch staff details
  const fetchData = useCallback(async () => {
    if (!staffId) return; // Prevent fetch if staffId is missing
    try {
      const data = await fetchStaffById(Number(staffId));
      await fetchStaffProfile(Number(staffId));
      await fetchStaffOrg();

      setStaffDetails(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff details. Please try again.");
    }
  }, [staffId, fetchStaffById]);

  const refreshStaffData = async () => {
    const data = await fetchStaffById(Number(staffId), false);
    setStaffDetails(data);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
            refreshData={refreshStaffData}
          />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Tab Content */}
          <div className="py-5">
            {activeTab === "Profile" && profile ? (
              <StaffProfile profile={profile} />
            ) : activeTab === "Profile" ? (
              <div>No profile information available.</div>
            ) : null}{" "}
            {activeTab === "Assets" && <StaffAssets />}
            {activeTab === "Projects" && <ProjectList />}
            {staffOrgnogram.length !== 0 && activeTab === "Organogram" && (
              <MyOrgChart orgnogramData={staffOrgnogram} />
            )}
            {/* Add components for other tabs as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

// Tab Navigation Component
const TabNavigation = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="no-scrollbar w-full overflow-x-scroll border-b border-base-300 bg-base-100">
      <div className="px-5">
        <div className="flex">
          {tabs.map((tab) => (
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
          ))}
        </div>
      </div>
    </div>
  );
};
