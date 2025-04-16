"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import StaffDetailsCard from "../components/StaffDetailsCard";
import { useStaffStore } from "../staff-store";
import { StaffDetail } from "../types";
import StaffProfile from "../components/StaffProfile";
import StaffAssets from "../components/StaffAssets";
import MyOrgChart from "../components/OrgChart";
import ProjectList from "@/app/(client)/(dashboard)/projects/components/ProjectList";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "@/app/axiosApi/api";
import { toast } from "react-toastify";

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
  const [showResignationModal, setShowResignationModal] = useState(false);
  const [resignationDate, setResignationDate] = useState("");
  const [resignationReason, setResignationReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [otherReason, setOtherReason] = useState("");
  // const user = useAuthStore((state) => state.user);
  // const isHR = user?.role === 'HR';

  // Fetch staff details
  const fetchData = useCallback(async () => {
    if (!staffId) return;
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

  const handleResignationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        resignation_date: resignationDate,
        reason: resignationReason === "Other" ? otherReason : resignationReason,
      };

      await api.post("/v1/hr/terminate-employee", payload);

      // Reset form and close modal
      setResignationDate("");
      setResignationReason("");
      setOtherReason("");
      setShowResignationModal(false);
      await refreshStaffData();

      toast.success("Employee terminated successfully");
    } catch (err) {
      console.error(err);
      setSubmitError(`Failed to terminate employee}. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="mt-5">
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
            ) : null}
            {activeTab === "Assets" && <StaffAssets />}
            {activeTab === "Projects" && <ProjectList />}
            {staffOrgnogram.length !== 0 && activeTab === "Organogram" && (
              <MyOrgChart orgnogramData={staffOrgnogram} />
            )}
          </div>
        </div>
      )}

      {/* Resignation Section */}
      {/* Termination/Resignation Section */}
      <div className="mt-8 border-t border-base-300 pt-6">
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Employee Termination</h3>
          <p className="mb-4 text-sm text-gray-600">
            As HR personnel, you can initiate termination procedures for this
            employee. Please ensure all company policies and legal requirements
            are followed.
          </p>
        </div>

        <button
          onClick={() => setShowResignationModal(true)}
          className="btn btn-error"
        >
          <Icon icon="hugeicons:user-block" className="mr-2 h-4 w-4" />
          Terminate Employee
        </button>
      </div>

      {/* Resignation/Termination Modal */}
      {showResignationModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold">Employee Termination</h3>
              <button
                onClick={() => {
                  setShowResignationModal(false);
                  setSubmitError("");
                }}
                className="btn btn-circle btn-ghost btn-sm"
              >
                ✕
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-2 text-sm text-gray-600">
                Please provide the following details to terminate this employee.
                This action will initiate the offboarding process.
              </p>
              {/* <ul className="text-sm text-gray-600 list-disc pl-5">
                {isHR ? (
                  <>
                    <li>Last working day</li>
                    <li>Reason for termination</li>
                    <li>Any supporting documentation should be uploaded separately</li>
                  </>
                ) : (
                  <>
                    <li>Your last working day (must be at least 30 days from today)</li>
                    <li>The reason for your resignation</li>
                    <li>Any additional comments (optional)</li>
                  </>
                )}
              </ul> */}
            </div>

            <form onSubmit={handleResignationSubmit}>
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Termination Date*</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={resignationDate}
                    onChange={(e) => setResignationDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Termination Reason*</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={resignationReason}
                    onChange={(e) => setResignationReason(e.target.value)}
                    required
                  >
                    <option value="">Select a reason</option>

                    <option value="Performance Issues">
                      Performance Issues
                    </option>
                    <option value="Policy Violation">Policy Violation</option>
                    <option value="Redundancy">Redundancy</option>
                    <option value="Mutual Agreement">Mutual Agreement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {resignationReason === "Other" && (
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Please specify*</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder={"Enter termination reason..."}
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    required
                  />
                </div>
              )}

              {submitError && (
                <div className="alert alert-error mb-4">
                  <Icon icon="hugeicons:error-01" className="h-5 w-5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => {
                    setShowResignationModal(false);
                    setSubmitError("");
                    setOtherReason("");
                  }}
                  className="btn btn-ghost"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-error`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </>
                  ) : (
                    "Confirm Termination"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

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
