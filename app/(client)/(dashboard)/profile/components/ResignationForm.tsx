import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { api } from "@/app/axiosApi/api";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/stores/auth-store";

interface ResignationFormProps {
  setShowResignationModal: (show: boolean) => void;
}

const ResignationForm = ({ setShowResignationModal }: ResignationFormProps) => {
  const [resignationDate, setResignationDate] = useState("");
  const [resignationReason, setResignationReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleResignationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        resignation_date: resignationDate,
        reason: resignationReason === "Other" ? otherReason : resignationReason,
      };
      await api.post("/v1/resignations", payload);
      setResignationDate("");
      setResignationReason("");
      setOtherReason("");
      setShowResignationModal(false);
      await useAuthStore.getState().refreshUserData();
      toast.success("Resignation submitted successfully");
    } catch (err) {
      console.error(err);
      setSubmitError(`Failed to submit resignation. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Initiate Resignation</h3>
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
            Please provide the following details to initiate your resignation:
          </p>
        </div>

        <form onSubmit={handleResignationSubmit}>
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Resignation Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={resignationDate}
                onChange={(e) => setResignationDate(e.target.value)}
                required
                min={
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
              />
              <label className="label">
                <span className="label-text-alt">
                  Must be at least 30 days notice
                </span>
              </label>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Reason*</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={resignationReason}
                onChange={(e) => setResignationReason(e.target.value)}
                required
              >
                <option value="">Select a reason</option>
                <option value="Career Growth">Career Growth</option>
                <option value="Relocation">Relocation</option>
                <option value="Health Reasons">Health Reasons</option>
                <option value="Personal Reasons">Personal Reasons</option>
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
                placeholder={"Enter your reason..."}
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
              className={`btn btn-primary`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit Resignation"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResignationForm;
