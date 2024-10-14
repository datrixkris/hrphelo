"use client";
import React from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import { useLeaveStore } from "../../leave-store";
import { toast } from "react-toastify";

interface LeaveTableProps {
  onEditLeave: (leaveId: number) => void;
}

const LeaveTable: React.FC<LeaveTableProps> = ({ onEditLeave }) => {
  const { leaves, loading, deleteLeave } = useLeaveStore();

  async function handleDelete(leaveId: number) {
    const success = await deleteLeave(leaveId);
    if (success) {
      toast.success("Leave deleted successfully");
    } else {
      toast.error("Leave deletion  failed");
    }
  }

  if (loading || !leaves?.leaves || leaves.leaves.length < 1) {
    return (
      <div className="overflow-x-auto">
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
              <tr key={index}>
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
    <div className="overflow-x-auto">
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
          {leaves.leaves.map((leave) => (
            <tr key={leave.id}>
              <td>{leave.leavetype.name}</td>
              <td>{dayjs(leave.start_date).format("MMM D, YYYY")}</td>
              <td>{/* Assuming you calculate the end date */}</td>
              <td>{leave.duration} days</td>
              <td>{leave.reason}</td>
              <td className="text-center">
                <div>
                  <a
                    className={`inline-flex min-w-[103px] items-center justify-center rounded-[50px] border p-1 text-center ${
                      leave.status === "pending"
                        ? "border-yellow-500 bg-yellow-100 text-yellow-500"
                        : leave.status === "approved"
                          ? "border-green-600 bg-green-100 text-green-600"
                          : "border-red-600 bg-red-100 text-red-600"
                    }`}
                  >
                    <Icon
                      icon="fa6-regular:circle-dot"
                      className={`pr-1 ${
                        leave.status === "pending"
                          ? "text-yellow-500"
                          : leave.status === "approved"
                            ? "text-green-600"
                            : "text-red-600"
                      }`}
                    />
                    {leave.status}
                  </a>
                </div>
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
                          leave.status === "rejected"
                            ? "pointer-events-none cursor-not-allowed text-gray-400"
                            : ""
                        }`}
                      >
                        Edit
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => handleDelete(leave.id)}
                        className={`${
                          leave.status === "approved" ||
                          leave.status === "rejected"
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
    </div>
  );
};

export default LeaveTable;
