import React from "react";
import { Icon } from "@iconify/react";
import { Company } from "../types";
import Link from "next/link";

interface CompanyTableProps {
  companies: Company[];
}
const CompanyTable = ({ companies }: CompanyTableProps) => {
  return (
    <div className="overflow-x-auto overflow-y-visible">
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
              <td>{company.name}</td>
              <td>{company.address}</td>
              <td>{company.company_size}</td>
              <td>{company.createdAt}</td>
              <td>
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <Icon
                  className="text-2xl cursor-pointer"
                  icon="heroicons:ellipsis-vertical"
                  />
                </div>
                <ul tabIndex={0} className="border border-base-300 dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li><Link href={`/admin/companies/${company.id}`}><Icon icon="heroicons:eye" /><span>View Details</span></Link></li>
                  <li><a><Icon icon="heroicons:trash" /><span>Delete</span></a></li>
                </ul>
              </div>       
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
