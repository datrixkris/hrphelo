import Link from "next/link";
import React from "react";
import { Icon } from "@iconify/react";

const StaffTable = () => {
  const staff = [
    {
      id: 1,
      companyId: 1001,
      staffId: "S001",
      name: "John Doe",
      role: "Developer",
      departmentId: 200,
      email: "john.doe@example.com",
      contact: "123-456-7890",
      hiring_date: "2024-09-26",
      supervisorId: 101,
    },
    {
      id: 2,
      companyId: 1002,
      staffId: "S002",
      name: "Jane Smith",
      role: "Project Manager",
      departmentId: 201,
      email: "jane.smith@example.com",
      contact: "098-765-4321",
      hiring_date: "2024-09-26",
      supervisorId: 102,
    },
    {
      id: 3,
      companyId: 1003,
      staffId: "S003",
      name: "Mike Johnson",
      role: "Designer",
      departmentId: 202,
      email: "mike.johnson@example.com",
      contact: "555-555-5555",
      hiring_date: "2024-09-26",
      supervisorId: 103,
    },
  ];

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
          {staff.map((member, index) => (
            <tr key={member.id} className="hover !text-sm">
              <th>{member.name}</th>
              <td>{member.staffId}</td>
              <td>{member.email}</td>
              <td>{member.hiring_date}</td>
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
