import React, { useState } from "react";
import Button from "@/app/components/Button";
import { LeavePolicy } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLeavePolicyStore } from "../leavePolicy-store";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react/dist/iconify.js";
import { div } from "framer-motion/client";
import ConfirmationModal from "@/app/components/ConfirmationModal";

const leavePolicySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  useStaffLeaveDays: z.boolean(),
});

interface LeavePolicyFormProps {
  leavePolicies: LeavePolicy[];
}

const LeavePolicyForm: React.FC<LeavePolicyFormProps> = ({ leavePolicies }) => {
  const { updateLeavePolicy, deleteLeavePolicy } = useLeavePolicyStore();
  const [formLoading, setFormLoading] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<LeavePolicy | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leavePolicyToDelete, setLeavePolicyToDelete] = useState<number | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeavePolicy>({
    resolver: zodResolver(leavePolicySchema),
  });

  const handleEditLeavePolicy = async (
    data: LeavePolicy,
    leavePolicyId: number,
  ) => {
    setFormLoading(true);
    try {
      const success = await updateLeavePolicy(leavePolicyId, data);
      if (success) {
        toast.success("Leave Policy updated successfully");
      } else {
        toast.error("Failed to update leave policy");
      }
    } catch (error) {
      toast.error("Failed to update leave policy");
    } finally {
      setFormLoading(false);
      reset();
      setSelectedPolicy(null);
    }
  };

  const handleDelete = async () => {
    if (leavePolicyToDelete !== null) {
      const success = await deleteLeavePolicy(leavePolicyToDelete);
      setIsModalOpen(false);
      setLeavePolicyToDelete(null);

      if (success) {
        toast.success("Leave Policy deleted successfully");
      } else {
        toast.error("Failed to delete leave policy");
      }
    }
  };

  const openConfirmationModal = (leavePolicyId: number) => {
    setLeavePolicyToDelete(leavePolicyId);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setLeavePolicyToDelete(null);
  };

  return (
    <div>
      {" "}
      <div className="w-full space-y-4 p-4">
        {leavePolicies.map((policy, index) => (
          <div key={index} className="relative rounded-lg border p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">
                {policy.name || "Leave Policy"}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPolicy(policy);
                    reset(policy);
                  }}
                  className="btn btn-outline"
                >
                  <Icon icon="akar-icons:edit" />
                  Edit
                </button>
                <button
                  onClick={() => openConfirmationModal(policy.id!)}
                  className="btn btn-outline btn-error"
                >
                  <Icon icon="ic:outline-delete" />
                  Delete
                </button>
              </div>
            </div>

            {selectedPolicy?.id === policy.id ? (
              <form
                onSubmit={handleSubmit((data) =>
                  handleEditLeavePolicy(data, policy.id!),
                )}
              >
                <div className="space-y-4">
                  <div>
                    <label className="block divide-y-2 text-sm font-medium">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered mt-1 w-full"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      className="textarea textarea-bordered mt-1 w-full"
                      placeholder="Description"
                      {...register("description")}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="toggle toggle-success"
                      {...register("useStaffLeaveDays")}
                    />
                    <label className="ml-2 text-sm font-medium">
                      Use Staff Leave Days
                    </label>
                  </div>
                  <Button disabled={formLoading} className="mt-4 w-full">
                    {formLoading ? "Updating..." : "Update Leave Policy"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="w-full space-y-2">
                <p className="">
                  <strong>Description:</strong>{" "}
                  {policy.description || "No description provided"}
                </p>
                <p className="">
                  <strong>Use Staff Leave Days:</strong>{" "}
                  {policy.useStaffLeaveDays ? "Yes" : "No"}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this leave Policy? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default LeavePolicyForm;
