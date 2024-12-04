"use client";

import React, { useEffect, useState, useCallback } from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { StaffDetail } from "../staff/types";
import TabNavigation from "@/app/components/TabNavigation";
import ProfileComponent from "./components/ProfileComponent";
import UserProfileDetailsCard from "./components/UserProfileDetailsCard";
import { useAuthStore } from "@/app/stores/auth-store";
import { useStaffStore } from "../staff/staff-store";
import StaffDetailsCard from "../staff/components/StaffDetailsCard";

const TABS = ["Profile", "Projects", "Bank and Statutory", "Assets"];

const Page = () => {
  const user = useAuthStore((state) => state.user);
  const { fetchStaffProfile, profile, loading, fetchStaffById } =
    useStaffStore();
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);
  const [profileDetails, setProfileDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Profile");

  // Fetch staff details
  const fetchData = useCallback(async () => {
    if (!user?.id) return; // Prevent fetch if staffId is missing
    try {
      const staffData = await fetchStaffById(Number(user.id));
      const profileData = await fetchStaffProfile(Number(user.id));
      setStaffDetails(staffData);
      setProfileDetails(profileData);
      console.log("This is the following data : ", staffData, profileData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load staff details. Please try again.");
    }
  }, [user?.id, fetchStaffById]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {/* Header with breadcrumbs */}
      <PageTitleWithCrumbs
        title="Your Profile"
        crumbs={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Profile" },
        ]}
      />

      {/* Profile Details */}
      {loading ? (
        <div className="my-5">
          <div className="flex w-full flex-col gap-4 bg-base-100 p-5">
            <div className="flex items-center gap-4">
              <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
              <div className="flex flex-col gap-4">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-4 w-28"></div>
              </div>
            </div>
            <div className="skeleton h-32 w-full"></div>
          </div>
        </div>
      ) : false ? (
        <div className="my-5 text-red-500">{error}</div>
      ) : (
        <div className="my-5">
          {/* <UserProfileDetailsCard /> */}
          <StaffDetailsCard
            staffDetails={staffDetails}
            refreshData={fetchData}
          />

          {/* Tab Navigation */}
          <TabNavigation
            tabs={TABS}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Tab Content */}
          <div className="py-5">
            {activeTab === "Profile" ? (
              <ProfileComponent profile={profileDetails} />
            ) : activeTab === "Profile" ? (
              <div>No profile information available.</div>
            ) : null}
            {/* {activeTab === "Assets" && <StaffAssets />}
            {activeTab === "Projects" && <ProjectList />} */}
            {/* Add components for other tabs as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
