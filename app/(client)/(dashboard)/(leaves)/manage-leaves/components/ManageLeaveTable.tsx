import React, { useState } from "react";
import { LeaveRecord } from "../../types";
import dayjs from "dayjs";
// import { Icon } from "@iconify/react/dist/iconify.js";
import { Status } from "../../../../components/Status";
import { useLeaveStore } from "../../leave-store";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ManageLeaveProp {
  filteredLeaves: LeaveRecord[];
}

export const ManageLeaveTable = ({ filteredLeaves }: ManageLeaveProp) => {
  return (
    <div className="overflow-x-auto">
      {" "}
      <div className="h-full w-full">
        <table className="table table-lg w-full rounded border border-base-300 bg-base-100">
          <thead>
            <tr className="text-left">
              <th>Employee</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>No of Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves?.map((leave) => (
              <TableRow key={leave.id} leave={leave} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface TableRowProps {
  leave: LeaveRecord;
}

const TableRow = ({ leave }: TableRowProps) => {
  const { approveLeave } = useLeaveStore();
  const [approving, setApproving] = useState(false);
  const [declining, setDeclining] = useState(false);

  async function approve(data: LeaveRecord) {
    const leaveData = {
      leaveTypeId: data.leaveTypeId,
      duration: data.duration,
      start_date: data.start_date,
      reason: data.reason,
      status: "approved",
    };

    setApproving(true);
    await approveLeave(data.id, leaveData);
    setApproving(false);
  }

  async function decline(data: LeaveRecord) {
    const leaveData = {
      leaveTypeId: data.leaveTypeId,
      duration: data.duration,
      start_date: data.start_date,
      reason: data.reason,
      status: "declined",
    };

    setDeclining(true);
    await approveLeave(data.id, leaveData);
    setDeclining(false);
  }

  return (
    <tr key={leave.id} className="!text-sm">
      <td>
        <h2 className="inline-flex items-center whitespace-nowrap align-middle text-[15px] font-normal">
          <a
            href="profile.html"
            className="relative mr-[10px] inline-block h-[38px] w-[38px] rounded-full"
          >
            <img
              alt={leave.staff.name}
              src={leave.staff.image || "/images/avatar.png"}
              className="w-full rounded-full"
            />
          </a>
          <a>
            {leave.staff.name}
            <span className="mt-[3px] block text-xs">{leave.staff.role}</span>
          </a>
        </h2>
      </td>
      <td>{leave.leavetype?.name}</td>
      <td>{dayjs(leave.start_date).format("MMM D, YYYY")}</td>
      <td>{dayjs(leave.end_date).format("MMM D, YYYY")}</td>
      <td>{leave.duration}</td>
      <td>{leave.reason}</td>
      <td className="text-center">
        <Status leave={leave} />
      </td>
      <td>
        <div className="flex flex-col items-center gap-1">
          <button
            className="btn btn-success btn-xs w-20 text-white"
            onClick={() => approve(leave)}
            disabled={
              approving ||
              leave.status === "approved" ||
              leave.status === "declined"
            }
          >
            {approving ? (
              <Icon icon="mdi:loading" className="animate-spin text-lg" />
            ) : (
              "Approve"
            )}
          </button>
          <button
            className="btn btn-error btn-xs w-20 text-white"
            onClick={() => decline(leave)}
            disabled={
              declining ||
              leave.status === "approved" ||
              leave.status === "declined"
            }
          >
            {declining ? (
              <Icon icon="mdi:loading" className="animate-spin text-lg" />
            ) : (
              "Reject"
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};
