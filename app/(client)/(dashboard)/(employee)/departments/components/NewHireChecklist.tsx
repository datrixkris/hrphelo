import React, { useEffect } from "react";
import ProgressBar from "../../../projects/components/ProgressBar";
import FormList from "./NewHireFormList";
import { StaffData } from "../../staff/types";
import { getNewHireProgress } from "@/app/hooks/useGetNewHire";
import { useDepartmentStore } from "../department-store";

interface NewHireChecklistProps {
  openModal: boolean;
  closeModal: () => void;
  staff: StaffData;
}

const NewHireChecklist = ({
  openModal,
  closeModal,
  staff,
}: NewHireChecklistProps) => {
  const department = useDepartmentStore((state) => state.department);

  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box max-w-[850px] divide-y-2">
        {/* heading */}
        <div className="">
          <h2 className="text-xl font-semibold uppercase">{staff.name}</h2>
          <p className="mb-5 text-sm capitalize">
            {staff.department?.name} department
          </p>

          {/* progress bar */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold"> Progress</p>
            <ProgressBar progress={getNewHireProgress(staff)} />
            <p className="text-sm font-bold">{getNewHireProgress(staff)}%</p>
          </div>
        </div>

        {/* checklist */}
        <div className="mt-5 space-y-4 divide-y">
          {staff.company.checklists.map((checklist) => {
            if (checklist.departmentId === department!.id) {
              return <FormList checklist={checklist} key={checklist.id} />;
            }
          })}
        </div>

        <div className="buttons flex justify-end gap-2 pt-4">
          <button className="btn" onClick={closeModal} type="button">
            Close
          </button>
          {/* <button className="btn btn-primary">Save</button> */}
        </div>
      </div>
    </div>
  );
};

export default NewHireChecklist;
