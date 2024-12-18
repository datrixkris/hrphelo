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
      <table className="table table-md rounded border border-base-300 bg-base-100">
        {/* head */}
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Staff ID</th>
            <th>Email</th>
            <th>Hiring Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {staff.map((member) => (
            <tr key={member.id} className="!text-sm">
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle size-12">
                      <img src={member.image} alt={member.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{member.name}</div>
                    <div className="text-xs">{member.designation}</div>
                  </div>
                </div>
              </td>
              <td>{member.staffId}</td>
              <td className="max-w-52 break-words">{member.email}</td>
              <td>{dayjs(member.hiring_date).format("MMM D, YYYY")}</td>
              <td>
                <div className="text-sm">
                  <Link
                    href={`/staff/${member.id}`}
                    className="text-nowrap rounded bg-success px-2 py-1 font-semibold text-white"
                  >
                    <Icon
                      icon="heroicons:eye-16-solid"
                      className="inline-block text-lg"
                    />
                    <span className="relative ml-0.5 text-xs">Details</span>
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
