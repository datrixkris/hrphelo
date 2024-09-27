"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { useDepartmentStore } from "../department-store";

const Page = ({ params }: { params: { slug: string } }) => {
  const id = params.slug;
  const { loading, fetchDepartmentById, department } = useDepartmentStore();

  useEffect(() => {
    const fetchDepartment = async () => {
      if (id && !isNaN(Number(id))) {
        await fetchDepartmentById(Number(id));
      }
    };

    fetchDepartment();
  }, [id, fetchDepartmentById]);

  if (loading) {
    return <div className="py-10 text-center">Loading department...</div>;
  }

  // Check if department data exists
  if (!department) {
    return <div className="py-10 text-center">Department not found.</div>;
  }

  return (
    <div>
      <div className="mb-[1.875rem]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium leading-[1.2] sm:mb-[5px] sm:text-2xl md:text-[26px]">
              Department
            </h3>
            <ul className="hidden flex-wrap text-[14px] font-medium sm:flex md:text-base">
              <li>
                <a href="/" className="text-[#333333]">Dashboard</a>
              </li>
              <li>
                <span className="px-2 dark:text-[#6c757d]">/</span>
              </li>
              <li className="text-[#6c757d]">Departments</li>
            </ul>
          </div>
          <div>
            {/* Action button can be added here */}
          </div>
        </div>
      </div>

      <div className="w-full bg-base-100 p-10">
        <div className="mb-10">
          <h3 className="text-xl font-semibold">{department.name}</h3>
          <p className="text-gray-500">
            {department.description || "No description available"}
          </p>

          {/* Employee table */}
          <div className="overflow-x-auto border-t mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {department.staff?.length ? (
                  department.staff.map((employee) => (
                    <tr key={employee.id} className="hover">
                      <td>{employee.id}</td>
                      <td>{employee.name}</td> 
                      <td>{employee.email}</td>
                      <td>
                        <button>
                          <Icon icon="mdi:eye" className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No employees available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
