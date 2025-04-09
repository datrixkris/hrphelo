import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { progressColor } from "../../../projects/components/ProgressBar";
import NewHireChecklist from "./NewHireChecklist";
import { StaffData } from "../../staff/types";
import { getNewHireProgress } from "@/app/hooks/useGetNewHire";
import { useDepartmentStore } from "../department-store";

const NewHires = ({ newHires }: { newHires: StaffData[] }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {newHires.map((staff) => {
              return <NewHireTableRow key={staff.id} staff={staff} />;
            })}
          </tbody>
        </table>
        {newHires.length === 0 && (
          <div className="mt-4 text-center text-gray-400">No new hires</div>
        )}
      </div>
    </div>
  );
};

export default NewHires;

const NewHireTableRow = ({ staff }: { staff: StaffData }) => {
  const [openModal, setOpenModal] = useState(false);
  const department = useDepartmentStore((state) => state.department);

  return (
    <tr>
      <th>{staff.name}</th>
      <td>{staff.department?.name}</td>
      <td>
        <p
          className={`${"text-" + progressColor(getNewHireProgress(staff, department?.id))} font-bold`}
        >
          {getNewHireProgress(staff, department?.id)}%
        </p>
      </td>
      <td>
        <div
          className="inline-block cursor-pointer text-nowrap rounded bg-success px-2 py-1 text-sm font-semibold text-white"
          onClick={() => setOpenModal(true)}
        >
          <Icon
            icon="heroicons:eye-16-solid"
            className="inline-block text-lg"
          />
          <span className="relative ml-0.5 text-xs">Details</span>
        </div>
      </td>

      {/* modal */}
      {openModal && (
        <td>
          <NewHireChecklist
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            staff={staff}
          />
        </td>
      )}
    </tr>
  );
};
