"use client";

import React, { useEffect } from "react";
import Checklist from "./Checklist";
import { useOnboardingStore } from "../onboarding-store";
import { useDepartmentStore } from "../../(employee)/departments/department-store";

const DepartmentalChecklists = () => {
  const {
    fetchAllChecklists,
    checklists,
    loading,
    // fetchAllChecklistsGroupedByDepartment,
    // checklistsGroupedByDepartment,
  } = useOnboardingStore();
  const { fetchDepartments, departments } = useDepartmentStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllChecklists();
      await fetchDepartments();
      // await fetchAllChecklistsGroupedByDepartment();
      console.log(useOnboardingStore.getState().checklists);
    };

    fetchData();
  }, []);

  async function refresh() {
    await fetchAllChecklists(false);
  }

  return (
    <div className="rounded bg-base-100 p-4">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Departmental Checklists</h2>
        <p className="mt-1 text-sm">
          View and manage checklist items required from various departments
          here.
        </p>
      </div>

      {/* body */}
      {loading ? (
        <div className="space-y-2 divide-y">
          <div className="skeleton h-16"></div>
          <div className="skeleton h-16"></div>
          <div className="skeleton h-16"></div>
        </div>
      ) : (
        <div className="divide-y">
          {/* accordion */}
          {departments.map((department) => {
            const checklistLength = checklists.filter(
              (checklist) => checklist.departmentId === department.id,
            ).length;
            return (
              <div
                className="collapse collapse-arrow rounded-none"
                key={department.id}
              >
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                  <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
                    {department.name} Department
                  </span>{" "}
                  <span className="pl-1 text-sm text-hr-yellow">
                    {checklistLength} checklists
                  </span>
                </div>
                <div className="collapse-content rounded-md bg-base-200/50 pl-10 pt-4">
                  {checklists.map((checklist) => {
                    if (checklist.departmentId === department.id) {
                      return (
                        <Checklist
                          key={checklist.id}
                          checklist={checklist}
                          refresh={refresh}
                        />
                      );
                    }
                  })}
                  {checklistLength === 0 && (
                    <div className="text-center">No checklists yet</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DepartmentalChecklists;
