import React, { useEffect, useState } from "react";
import { useLeavePolicyStore } from "../../leave-settings/leavePolicy-store";
import { LeaveType } from "../../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLeaveStore } from "../../leave-store";
import { toast } from "react-toastify";

const leaveSchema = z.object({
  leaveTypeId: z.number().min(1, "Leave type is required"),
  duration: z.number().min(1, "Duration must be a positive number"),
  reason: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
});

interface ApplyForLeaveProps {
  onClose: () => void;
  isOpen: boolean;
  editingLeave?: LeaveType | null;
}

const ApplyForLeave = ({
  onClose,
  isOpen,
  editingLeave,
}: ApplyForLeaveProps) => {
  const { fetchLeavePolicies, leavePolicies } = useLeavePolicyStore();
  const [formLoading, setFormLoading] = useState(false);
  const [endDate, setEndDate] = useState<string>("");

  const { addLeave, updateLeave } = useLeaveStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<LeaveType>({
    resolver: zodResolver(leaveSchema),
    defaultValues: editingLeave || {},
  });

  const startDate = watch("start_date");
  const duration = watch("duration");

  useEffect(() => {
    fetchLeavePolicies();
  }, []);

  useEffect(() => {
    if (startDate && duration > 0) {
      const calculatedEndDate = calculateEndDate(startDate, duration);
      setEndDate(calculatedEndDate);
    }
  }, [startDate, duration]);

  const calculateEndDate = (start: string, days: number) => {
    const currentDate = new Date(start);
    let addedDays = 0;

    while (addedDays < days) {
      currentDate.setDate(currentDate.getDate() + 1);
      // Skip weekends (Saturday and Sunday)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        addedDays++;
      }
    }

    return currentDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  const handleApplyLeave = async (data: LeaveType) => {
    try {
      setFormLoading(true);
      let success;
      if (editingLeave) {
        // Update existing leave
        const leaveId = editingLeave.id;
        if (leaveId) {
          success = await updateLeave(leaveId, data);
        }
        toast.success("Leave updated successfully");
      } else {
        // Add new leave
        success = await addLeave(data);
        toast.success("Leave created successfully");
      }

      if (success) {
        onClose();
        reset(); // Reset the form after a successful submission
      } else {
        toast.error("Leave application failed");
      }
    } catch (error) {
      toast.error("Leave application failed");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">
          {editingLeave ? "Edit Leave" : "Apply for Leave"}
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit(handleApplyLeave)}>
          <div>
            <label className="block text-sm font-medium">Leave Type</label>
            <select
              className="select select-bordered w-full"
              {...register("leaveTypeId", { valueAsNumber: true })}
            >
              <option value="" disabled>
                Select Leave Type
              </option>
              {leavePolicies.map((leavePolicy) => (
                <option key={leavePolicy.id} value={leavePolicy.id}>
                  {leavePolicy.name}
                </option>
              ))}
            </select>
            {errors.leaveTypeId && (
              <p className="text-sm text-red-500">
                {errors.leaveTypeId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">From</label>
            <input
              type="date"
              className="input input-bordered mt-1 w-full"
              {...register("start_date")}
            />
            {errors.start_date && (
              <p className="text-sm text-red-500">
                {errors.start_date.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Number of Days</label>
            <input
              type="number"
              className="input input-bordered mt-1 w-full"
              {...register("duration", { valueAsNumber: true })}
            />
            {errors.duration && (
              <p className="text-sm text-red-500">{errors.duration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">To</label>
            <input
              type="date"
              className="input input-bordered mt-1 w-full"
              value={endDate}
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Reason</label>
            <textarea
              rows={4}
              className="textarea textarea-bordered mt-1 w-full"
              {...register("reason")}
            />
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
              className={`btn btn-primary rounded ${formLoading ? "loading" : ""}`}
            >
              {formLoading
                ? "Submitting..."
                : editingLeave
                  ? "Update Leave"
                  : "Apply for Leave"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForLeave;
