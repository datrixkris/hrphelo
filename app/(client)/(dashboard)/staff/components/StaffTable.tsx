import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";
import { StaffData } from "../types";
import dayjs from "dayjs";

interface StaffTableProps {
  staff: StaffData[];
}
const StaffTable = ({ staff }: StaffTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-lg rounded border border-base-300 bg-base-100">
        {/* head */}
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Staff ID</th>
            <th>Email</th>
            <th>Hiring Date</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {staff.map((member) => (
            <tr key={member.id} className="hover !text-sm">
              <th>{member.name}</th>
              <td>{member.staffId}</td>
              <td>{member.email}</td>
              <td>{dayjs(member.hiring_date).format("MMM D, YYYY")}</td>
              <td>{member.role}</td>
              <td>
                <div className="text-sm">
                  <Link href={`/staff/${member.id}`}>
                    <Icon
                      icon="heroicons:eye"
                      className="inline-block text-lg"
                    />
                    <span className="relative top-0.5 ml-1">View</span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
