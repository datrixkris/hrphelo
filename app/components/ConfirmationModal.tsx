import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "delete" | "info";
  loading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  type = "info",
  loading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="mx-auto w-full max-w-md rounded-lg bg-base-100 p-6">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="btn btn-active">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`btn ${type === "delete" ? "btn-error" : "btn-primary"}`}
          >
            {loading ? "Confirming..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
