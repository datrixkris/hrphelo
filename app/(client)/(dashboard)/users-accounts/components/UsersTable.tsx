import React, { useState } from "react";
import { StaffData } from "../../staff/types";
import dayjs from "dayjs";
import UserForm from "./UserForm";

interface UsersTableProps {
  staff: StaffData[];
  setUserData: (data: StaffData) => void;
}
const UsersTable = ({ staff, setUserData }: UsersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg rounded border border-base-300 bg-base-100">
        {/* head */}
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Hiring Date</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Account Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {staff.map((member) => (
            <tr key={member.id} className="!text-sm">
              <th>{member.name}</th>
              <td>{member.email}</td>
              <td>{dayjs(member.hiring_date).format("MMM D, YYYY")}</td>
              <td>{member.departments?.name}</td>
              <td>{member.designation}</td>
              <td>
                {member.user ? (
                  <span className="text-success">Created</span>
                ) : (
                  <span className="text-error">Not created</span>
                )}
              </td>
              <td>
                <div className="text-sm">
                  <button
                    className={`relative top-0.5 ml-1 break-keep rounded px-2 py-1 text-xs font-semibold text-white ${member.user ? "bg-info" : "bg-success"}`}
                    onClick={() => setUserData(member)}
                  >
                    {member.user ? "Edit account" : "Add account"}
                  </button>
                  {/* User Form */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
