import React, { useState } from "react";
import { useLeavePolicyStore } from "../leavePolicy-store";
import { useForm } from "react-hook-form";
import { LeavePolicy } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

interface AddLeavePolicyFormProps {
  onClose: () => void;
  isOpen: boolean;
}

const leavePolicySchema = z.object({
  name: z.string().min(1, "Name is required"),
  duration: z.number().min(1, "Duration must be a positive number"),
  description: z.string().optional(),
  useStaffLeaveDays: z.boolean(),
});

export const AddLeavePolicyForm: React.FC<AddLeavePolicyFormProps> = ({
  onClose,
  isOpen,
}) => {
  const { addLeavePolicy } = useLeavePolicyStore();
  const [formLoading, setFormLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeavePolicy>({
    resolver: zodResolver(leavePolicySchema),
  });

  const handleCreateLeavePolicy = async (data: LeavePolicy) => {
    try {
      setFormLoading(true); 
      const success = await addLeavePolicy(data);
      if (success) {
        toast.success("Leave policy created successfully");
        onClose(); 
      } else {
        toast.error("Failed to create Leave Policy");
      }
    } catch (error) {
      toast.error("Failed to create Leave Policy");
    } finally {
      setFormLoading(false); 
    }
  };

  return (
    <div>
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create New Leave Policy</h3>
          <form
            onSubmit={handleSubmit(handleCreateLeavePolicy)}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium text-gray-700">
                Policy Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Leave Duration
              </label>
              <input
                type="number"
                {...register("duration", { valueAsNumber: true })}
                className="input input-bordered w-full"
              />
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-52">
              <label className="label cursor-pointer">
                <span className="label-text">Use Staff Leave Days</span>
                <input
                  type="checkbox"
                  {...register("useStaffLeaveDays")}
                  className="toggle toggle-accent"
                  defaultChecked
                />
              </label>
            </div>

            <div className="modal-action flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn mr-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary rounded ${
                  formLoading ? "loading" : ""
                }`}
              >
                {formLoading ? "Creating..." : "Create Leave Policy"}
              </button>
            </div>
          </form>
        </div>

        <div className="modal-backdrop" onClick={onClose}></div>
      </div>
    </div>
  );
};
