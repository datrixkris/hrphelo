import React from "react";
import dayjs from "dayjs";
import { UsersInterface } from "./UsersList";

interface UsersTableProps {
  staff: UsersInterface[];
  setUserFormData: (data: UsersInterface) => void;
}
const UsersTable = ({ staff, setUserFormData }: UsersTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-md rounded border border-base-300 bg-base-100">
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
            <tr key={member.staff.id} className="!text-sm">
              <th>{member.staff.name}</th>
              <td className="max-w-48 break-words">{member.staff.email}</td>
              <td>{dayjs(member.staff.hiring_date).format("MMM D, YYYY")}</td>
              <td>{member.staff.departments?.name}</td>
              <td>{member.staff.designation}</td>
              <td>
                {member.staff.user ? (
                  <span className="text-success">Created</span>
                ) : (
                  <span className="text-error">Not created</span>
                )}
              </td>
              <td>
                <div className="text-sm">
                  <button
                    className={`relative top-0.5 ml-1 text-nowrap rounded px-2 py-1 text-xs font-semibold text-white ${member.staff.user ? "bg-info" : "bg-success"}`}
                    onClick={() => setUserFormData(member)}
                  >
                    {member.staff.user ? "Edit account" : "Add account"}
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
