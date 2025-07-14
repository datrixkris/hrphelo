"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react";
import ApplyForLeave from "./components/ApplyForLeave";
import { useLeaveStore } from "../leave-store";
import LeaveTable from "./components/LeaveTable";
import { useAuthStore } from "@/app/stores/auth-store";

const Page = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [editingLeaveId, setEditingLeaveId] = useState<number | null>(null);
  const { fetchLeaves, leaves } = useLeaveStore();
  const { user } = useAuthStore();

  // Total number of available leave days
  const totalLeaveDays = user?.leaveYear || 0;

  // Count number of leaves applied
  const appliedLeave = leaves?.leaves.length || 0;

  // Count number of leave days taken by summing the days of the leaves with status 'approved'
  const leaveDaysTaken =
    leaves?.leaves
      .filter((leave) => leave.status === "approved")
      .reduce((totalDays, leave) => totalDays + leave.duration, 0) || 0;

  // Count number of leaves approved by counting the leaves with status 'approved'
  const approvedLeave =
    leaves?.leaves.filter((leave) => leave.status === "approved").length || 0;

  // Count number of leaves rejected by counting the leaves with status 'rejected'
  const rejectedLeave =
    leaves?.leaves.filter((leave) => leave.status === "rejected").length || 0;

  // Total number of available leave days remaining
  const totalLeaveDaysRemaining = totalLeaveDays - leaveDaysTaken;

  const openApplyModal = () => {
    setEditingLeaveId(null);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => setIsApplyModalOpen(false);

  const handleEditLeave = (leaveId: number) => {
    setEditingLeaveId(leaveId);
    setIsApplyModalOpen(true);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  return (
    <div>
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Your Leaves"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "leaves" },
            ]}
          />
          <div>
            <Button onClick={openApplyModal}>
              <span className="flex items-center gap-1">
                <Icon icon="hugeicons:calendar-add-01" className="text-xl" />{" "}
                Apply for Leave
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-5">
        <div className="rounded-2 border border-base-content p-4 text-center">
          <h6 className="mb-2 text-lg font-normal">Annual Leave</h6>
          <h4 className="text-2xl">{totalLeaveDays}</h4>
        </div>
        <div className="rounded-2 border border-base-content p-4 text-center">
          <h6 className="mb-2 text-lg font-normal">Applied Leaves</h6>
          <h4 className="text-2xl">{appliedLeave}</h4>
        </div>
        <div className="rounded-2 border border-base-content p-4 text-center">
          <h6 className="mb-2 text-lg font-normal">Approved Leaves</h6>
          <h4 className="text-2xl">{approvedLeave}</h4>
        </div>
        <div className="rounded-2 border border-base-content p-4 text-center">
          <h6 className="mb-2 text-lg font-normal">Rejected Leaves</h6>
          <h4 className="text-2xl">{rejectedLeave}</h4>
        </div>
        <div className="rounded-2 border border-base-content p-4 text-center">
          <h6 className="mb-2 text-lg font-normal">Remaining Leave</h6>
          <h4 className="text-2xl">{totalLeaveDaysRemaining}</h4>
        </div>
      </div>

      <div>
        {leaves?.leaves && leaves.leaves.length > 0 ? (
          <LeaveTable onEditLeave={handleEditLeave} />
        ) : (
          <div className="rounded py-20 text-center">No Leaves available</div>
        )}
      </div>
      {isApplyModalOpen && (
        <ApplyForLeave
          onClose={closeApplyModal}
          isOpen={isApplyModalOpen}
          editingLeave={
            editingLeaveId !== null
              ? leaves?.leaves.find((leave) => leave.id === editingLeaveId)
              : null
          }
        />
      )}
    </div>
  );
};

export default Page;
