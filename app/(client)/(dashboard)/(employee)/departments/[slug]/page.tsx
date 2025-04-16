"use client";
// import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useDepartmentStore } from "../department-store";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import TabNavigation from "@/app/components/TabNavigation";
import DepartmentStaffList from "../components/DepartmentStaffList";
import DepartmentDesignations from "../components/DepartmentDesignations";
import DepartmentChecklist from "../components/DepartmentChecklist";

const Tabs = ["Staff", "Designations", "Onboarding"];

const Page = ({ params }: { params: { slug: string } }) => {
  const id = params.slug;

  const [activeTab, setActiveTab] = useState<string>("Staff");
  const { loading, fetchDepartmentById, department } = useDepartmentStore();

  useEffect(() => {
    const fetchDepartment = async () => {
      if (id && !isNaN(Number(id))) {
        await fetchDepartmentById(Number(id));
      }
    };

    fetchDepartment();

    return () => {
      // cleanup
      useDepartmentStore.setState({ department: null });
    };
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
            title={`${department.name} Department`}
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Departments", link: "/departments" },
              { name: "Department details" },
            ]}
          />
        </div>
      </div>

      <div className="w-full">
        <div className="mb-10">
          <h3 className="text-xl font-semibold">{department.name}</h3>
          <p className="text-gray-500">
            {department.description || "No description available"}
          </p>

          {/* Employee table */}
          <div className="mt-5 overflow-x-auto bg-base-100">
            {/* tabs */}
            <TabNavigation
              tabs={Tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {activeTab === "Staff" && (
              <DepartmentStaffList department={department} />
            )}
            {activeTab === "Designations" && <DepartmentDesignations />}
            {activeTab === "Onboarding" && <DepartmentChecklist />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
