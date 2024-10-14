"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react";
import ApplyForLeave from "./components/ApplyForLeave";
import { useLeaveStore } from "../leave-store";
import LeaveTable from "./components/LeaveTable";

const Page = () => {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [editingLeaveId, setEditingLeaveId] = useState<number | null>(null);
  const { fetchLeaves, leaves, loading } = useLeaveStore();

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
      <div>
        { !leaves?.leaves || leaves.leaves.length > 0 ? (
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
