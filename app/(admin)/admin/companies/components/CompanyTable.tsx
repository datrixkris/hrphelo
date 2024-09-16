import React from "react";
import { Icon } from "@iconify/react";
import { Company } from "../types";

interface CompanyTableProps {
  companies: Company[];
}
const CompanyTable = ({ companies }: CompanyTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table  table-lg bg-base-100 rounded border border-base-300 ">
        {/* head */}
        <thead className="">
          <tr>
            <th></th>
            <th>Company Name</th>
            <th>Location</th>
            <th>No. of Staff</th>
            <th>Date Registered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {companies.map((company, index) => (
            <tr key={company.id} className="hover !text-sm">
              <th>{index + 1}</th>
              <td>{company.companyName}</td>
              <td>{company.location}</td>
              <td>{company.noOfStaff}</td>
              <td>{company.dateRegistered}</td>
              <td>
                <Icon
                  className="text-2xl cursor-pointer"
                  icon="heroicons:ellipsis-vertical"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
