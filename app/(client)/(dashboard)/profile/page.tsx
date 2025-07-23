"use client";

import React, { useEffect, useState } from "react";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import {
  StaffDetail,
  StaffProfile,
} from "@/app/(client)/(dashboard)/(employee)/staff/types";
import TabNavigation from "@/app/components/TabNavigation";
import ProfileComponent from "./components/ProfileComponent";
// import UserProfileDetailsCard from "./components/UserProfileDetailsCard";
import { useAuthStore } from "@/app/stores/auth-store";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import StaffDetailsCard from "@/app/(client)/(dashboard)/(employee)/staff/components/StaffDetailsCard";
import { ProfileDataContext } from "./profileDataContext";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { api } from "@/app/axiosApi/api";
// import { toast } from "react-toastify";
import ResignationForm from "./components/ResignationForm";

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

  const [showResignationModal, setShowResignationModal] = useState(false);
  // const [resignationDate, setResignationDate] = useState("");
  // const [resignationReason, setResignationReason] = useState("");
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [submitError, setSubmitError] = useState("");
  // const [otherReason, setOtherReason] = useState("");

  // Fetch staff details

  const refreshProfileData = () => {
    setProfileDetails(useStaffStore.getState().profile);
    console.log(profileDetails);
  };

  const refreshStaffData = async () => {
    const staffData = await fetchStaffById(Number(user!.staff.id), false);
    setStaffDetails(staffData);
  };

  // const handleResignationSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitError("");

  //   try {
  //     const payload = {
  //       resignation_date: resignationDate,
  //       reason: resignationReason === "Other" ? otherReason : resignationReason,
  //     };

  //     await api.post("/v1/resignations", payload);

  //     // Reset form and close modal
  //     setResignationDate("");
  //     setResignationReason("");
  //     setOtherReason("");
  //     setShowResignationModal(false);
  //     await useAuthStore.getState().refreshUserData();

  //     toast.success("Resignation submitted successfully");
  //   } catch (err) {
  //     console.error(err);
  //     setSubmitError(`Failed to submit resignation. Please try again.`);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

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

      {/* Resignation Section */}
      {/* Hide resignation section for default users */}
      {!user?.isDefault && (
        <>
          {loading ? (
            <div className="flex w-full flex-col gap-4">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          ) : (
            <div className="mt-8 border-t border-base-300 pt-6">
              <div className="mb-4">
                <h3 className="mb-2 text-lg font-semibold">
                  Resignation Process
                </h3>
                <p className="mb-4 text-sm text-gray-600">
                  If you wish to resign from your position, please initiate the
                  resignation process below. This will notify HR and your
                  manager. You need to specify your last working day and provide
                  a reason for your resignation.
                </p>
              </div>
              {user?.staff?.resignation ? (
                <div className="alert alert-info mb-4">
                  <Icon
                    icon="heroicons:information-circle"
                    className="h-5 w-5"
                  />
                  <span>
                    You have already initiated the resignation process. Please
                    contact HR for further assistance.
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setShowResignationModal(true)}
                  className="btn btn-outline btn-error"
                >
                  <Icon icon="hugeicons:logout-01" className="mr-2 h-4 w-4" />
                  Initiate Resignation Process
                </button>
              )}
            </div>
          )}

          {/* Resignation/Termination Modal */}
          {showResignationModal && (
            <ResignationForm
              setShowResignationModal={setShowResignationModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Page;
