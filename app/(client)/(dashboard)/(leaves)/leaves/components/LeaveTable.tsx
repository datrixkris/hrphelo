"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { useLeaveStore } from "../../leave-store";
import { toast } from "react-toastify";
import { Status } from "@/app/(client)/components/Status";
import ConfirmationModal from "@/app/components/ConfirmationModal";

interface LeaveTableProps {
  onEditLeave: (leaveId: number) => void;
}

const LeaveTable: React.FC<LeaveTableProps> = ({ onEditLeave }) => {
  const { leaves, loading, deleteLeave } = useLeaveStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [leaveToDelete, setLeaveToDelete] = useState<number | null>(null);

  console.log(leaves);
  
  const handleDelete = async () => {
    if (leaveToDelete !== null) {
      const success = await deleteLeave(leaveToDelete);
      setIsModalOpen(false);
      setLeaveToDelete(null);

      if (success) {
        toast.success("Leave deleted successfully");
      } else {
        toast.error("Leave deletion failed");
      }
    }
  };

  const openConfirmationModal = (leaveId: number) => {
    setLeaveToDelete(leaveId);
    setIsModalOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsModalOpen(false);
    setLeaveToDelete(null);
  };

  if (loading || !leaves?.leaves || leaves.leaves.length < 1) {
    return (
      <div className="">
        <table className="table table-lg w-full rounded border border-base-300 bg-base-100">
          <thead>
            <tr className="text-left">
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>No of Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Approved by</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Display multiple skeleton rows to indicate loading state */}
            {[...Array(3)].map((_, index) => (
              <tr key={index} className="overflow-x-auto">
                <td>
                  <div className="skeleton h-4 w-24"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-20"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-20"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-16"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-32"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-24"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-20"></div>
                </td>
                <td>
                  <div className="skeleton h-4 w-20"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <table className="table table-lg w-full rounded border border-base-300 bg-base-100">
        <thead>
          <tr className="text-left">
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>No of Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Approved by</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="overflow-x-auto">
          {leaves.leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leavetype?.name}</td>
              <td>{dayjs(leave.start_date).format("MMM D, YYYY")}</td>
              <td>{dayjs(leave.end_date).format("MMM D, YYYY")}</td>
              <td>{leave.duration} days</td>
              <td>{leave.reason}</td>
              <td className="text-center">
                <Status leave={leave} />
              </td>
              <td>
                <h2 className="inline-flex items-center whitespace-nowrap align-middle text-[15px] font-normal">
                  <a
                    href="profile.html"
                    className="relative mr-[10px] inline-block h-[38px] w-[38px] rounded-full text-[#fe8259]"
                  >
                    <img
                      alt={leave.staff.name}
                      src={leave.staff.image}
                      className="w-full rounded-full border"
                    />
                  </a>
                  <a href="profile.html" className="text-[#fe8259]">
                    {leave.staff.name}
                  </a>
                </h2>
              </td>
              <td>
                <details className="dropdown dropdown-end">
                  <summary className="btn m-1">
                    <Icon icon="mdi:dots-vertical" className="text-xl" />
                  </summary>
                  <ul className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
                    <li>
                      <a
                        onClick={() => onEditLeave(leave.id)}
                        className={`${
                          leave.status === "approved" ||
                          leave.status === "declined"
                            ? "pointer-events-none cursor-not-allowed text-gray-400"
                            : ""
                        }`}
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => openConfirmationModal(leave.id)}
                        className={`${
                          leave.status === "approved" ||
                          leave.status === "declined"
                            ? "pointer-events-none cursor-not-allowed text-gray-400"
                            : ""
                        }`}
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Delete"
        message="Are you sure you want to delete this leave? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={closeConfirmationModal}
      />
    </div>
  );
};

export default LeaveTable;
