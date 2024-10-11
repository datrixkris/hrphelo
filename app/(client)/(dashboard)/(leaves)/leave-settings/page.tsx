"use client";
import React, { useEffect, useState } from "react";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { AddLeavePolicyForm } from "./components/AddLeavePolicyForm";
import { useLeavePolicyStore } from "./leavePolicy-store";
import LeavePolicyForm from "./components/LeavePolicyForm";

const Page = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { fetchLeavePolicies, loading, leavePolicies } = useLeavePolicyStore();

  useEffect(() => {
    fetchLeavePolicies();
  }, [fetchLeavePolicies]);

  const toggleCreateModal = () => setIsCreateModalOpen(!isCreateModalOpen);

  return (
    <div>
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Leave Settings"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Leave Settings" },
            ]}
          />
          <div>
            <Button onClick={toggleCreateModal}>Add Leave Policy</Button>
          </div>
        </div>
      </div>

      <div className="mb-[30px] flex flex-col rounded border bg-base-100">
        {/* Leave Policy Form Section */}
        <div>
          {loading ? (
            [...Array(3)].map((_, index) => (
              <div key={index} className="p-4">
                <div className="flex w-52 flex-col gap-4">
                  <div className="skeleton h-6 w-full pb-3"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            ))
          ) : leavePolicies.length > 0 ? (
            <>
              <LeavePolicyForm leavePolicies={leavePolicies} />
              <hr />
            </>
          ) : (
            <div className="rounded py-20 text-center">
              No leave policies available
            </div>
          )}
        </div>
      </div>

      {/* Add Leave Policy Modal */}
      {isCreateModalOpen && (
        <AddLeavePolicyForm
          onClose={toggleCreateModal}
          isOpen={isCreateModalOpen}
        />
      )}
    </div>
  );
};

export default Page;
