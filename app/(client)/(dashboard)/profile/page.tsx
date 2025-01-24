"use client";

import React, { useEffect, useState } from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { StaffDetail, StaffProfile } from "../staff/types";
import TabNavigation from "@/app/components/TabNavigation";
import ProfileComponent from "./components/ProfileComponent";
// import UserProfileDetailsCard from "./components/UserProfileDetailsCard";
import { useAuthStore } from "@/app/stores/auth-store";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import StaffDetailsCard from "@/app/(client)/(dashboard)/(employee)/staff/components/StaffDetailsCard";
import { ProfileDataContext } from "./profileDataContext";

const TABS = ["Profile", "Projects", "Bank and Statutory", "Assets"];

const Page = () => {
  const user = useAuthStore((state) => state.user);
  const { fetchStaffProfile, fetchStaffById } = useStaffStore();
  const [staffDetails, setStaffDetails] = useState<StaffDetail | null>(null);
  const [profileDetails, setProfileDetails] = useState<StaffProfile | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("Profile");

  // Fetch staff details

  const refreshProfileData = () => {
    setProfileDetails(useStaffStore.getState().profile);
    console.log(profileDetails);
  };

  const refreshStaffData = async () => {
    const staffData = await fetchStaffById(Number(user!.staff.id), false);
    setStaffDetails(staffData);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!user?.staff.id) {
        setLoading(false);
        return;
      } // Prevent fetch if staffId is missing
      try {
        const staffData = await fetchStaffById(Number(user.staff.id));
        await fetchStaffProfile(Number(user.staff.id));

        setStaffDetails(staffData);
        setProfileDetails(useStaffStore.getState().profile);
        // console.log(
        //   "This is the following data : ",
        //   staffData,
        //   useStaffStore.getState().profile,
        // );
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load staff details. Please try again.");
      }
      setLoading(false);
    };
    fetchData();
  }, [user, fetchStaffById, fetchStaffProfile]);

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
      ) : error ? (
        <div className="my-5 text-red-500">{error}</div>
      ) : (
        <div className="my-5">
          {/* <UserProfileDetailsCard /> */}
          <StaffDetailsCard
            defaultAccount={profileDetails?.isDefault}
            staffDetails={staffDetails}
            refreshData={refreshStaffData}
          />

          {/* Tab Navigation */}
          {!user?.isDefault && (
            <TabNavigation
              tabs={TABS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Tab Content */}
          {!user?.isDefault && (
            <div className="py-5">
              {activeTab === "Profile" ? (
                <ProfileDataContext.Provider
                  value={{
                    profileData: profileDetails,
                    refreshData: refreshProfileData,
                  }}
                >
                  <ProfileComponent profile={profileDetails} />
                </ProfileDataContext.Provider>
              ) : activeTab === "Profile" ? (
                <div>No profile information available.</div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
