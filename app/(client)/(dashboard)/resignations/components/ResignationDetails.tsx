import React from "react";
import { Checklist } from "../../onboarding/types";
import { useDepartmentStore } from "../../(employee)/departments/department-store";
import { StaffData } from "../../(employee)/staff/types";

const ResignationDetails = ({
  checklists,
  staff,
}: {
  checklists: Checklist[] | undefined;
  staff: StaffData;
}) => {
  const { fetchDepartments, departments, loading } = useDepartmentStore();

  console.log(staff, fetchDepartments);

  return (
    <div className="rounded bg-base-100 p-5">
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
            const checklistLength = checklists?.filter(
              (checklist) => checklist.departmentId === department.id,
            ).length;
            if (checklistLength) {
              return (
                <div
                  key={department.id}
                  className="collapse collapse-arrow rounded-none"
                >
                  <input type="radio" name="my-accordion-2" />
                  <div className="collapse-title text-xl font-medium">
                    <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
                      {department.name}
                    </span>{" "}
                    <span className="pl-1 text-sm text-hr-yellow">
                      20% completed
                    </span>
                  </div>

                  {/* checklist items */}
                  <div className="collapse-content divide-y rounded-md bg-base-200/50 pl-10 pt-4">
                    {checklists.map((checklist) => {
                      if (checklist.departmentId === department.id) {
                        return (
                          <ChecklistItem
                            key={checklist.id}
                            checklist={checklist}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default ResignationDetails;

export const ChecklistItem = ({ checklist }: { checklist: Checklist }) => {
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        {/* description */}
        <div className="space-y-1">
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">
            {checklist.name}
          </p>
          {/* description */}
          <p className="text-sm">{checklist.description}</p>
          {/* Assets */}
          <p className="text-xs">
            <span className="font-semibold">Assets:</span> <span>Computer</span>
          </p>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          {checklist.staffChecklists?.status === "apply" && (
            <span className="rounded bg-success/15 p-1 px-2 text-sm font-bold text-success">
              Completed
            </span>
          )}
          {checklist.staffChecklists?.status === "does_not_apply" && (
            <span className="rounded bg-warning/15 p-1 px-2 text-sm font-bold text-warning">
              Does not apply
            </span>
          )}
          {checklist.staffChecklists?.status === undefined && (
            <span className="rounded bg-error/15 p-1 px-2 text-sm font-bold text-error">
              Not completed
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
