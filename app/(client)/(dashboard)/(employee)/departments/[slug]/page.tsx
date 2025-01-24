"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect } from "react";
import { useDepartmentStore } from "../department-store";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";

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
        {/* header plus breadcrumbs */}
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Department details"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Departments", link: "/departments" },
              { name: "Department details" },
            ]}
          />

          {/* add designation button */}
        </div>
      </div>

      <div className="w-full bg-base-100 p-10">
        <div className="mb-10">
          <h3 className="text-xl font-semibold">{department.name}</h3>
          <p className="text-gray-500">
            {department.description || "No description available"}
          </p>

          {/* Employee table */}
          <div className="mt-5 overflow-x-auto border-t">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Designation</th>
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
                      <td>Designation</td>
                      <td>
                        <button>
                          <Icon icon="mdi:eye" className="h-6 w-6" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
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
