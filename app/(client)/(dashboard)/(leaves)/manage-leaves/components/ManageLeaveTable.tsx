import React from "react";
import { LeaveRecord } from "../../types";
import dayjs from "dayjs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Status } from "../../../../components/Status";

interface ManageLeaveProp {
  filteredLeaves: LeaveRecord[];
}
export const ManageLeaveTable = ({ filteredLeaves }: ManageLeaveProp) => {
  return (
    <div>
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
              <tr key={leave.id} className="overflow-x-auto">
                <td>
                  <h2 className="inline-flex items-center whitespace-nowrap align-middle text-[15px] font-normal">
                    <a
                      href="profile.html"
                      className="relative mr-[10px] inline-block h-[38px] w-[38px] rounded-full"
                    >
                      <img
                        alt={leave.staff.name}
                        src={leave.staff.image}
                        className="w-full rounded-full"
                      />
                    </a>
                    <a>
                      {leave.staff.name}
                      <span className="mt-[3px] block text-xs">
                        {leave.staff.role}
                      </span>
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
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <Icon icon="mdi:dots-vertical" className="text-xl" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[90] w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                      <li>
                        <a>Approve</a>
                      </li>
                      <li>
                        <a>Reject</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
