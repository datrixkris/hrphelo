import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { progressColor } from "../../../projects/components/ProgressBar";
import NewHireChecklist from "./NewHireChecklist";
import { StaffData } from "../../staff/types";
import { getNewHireProgress } from "@/app/hooks/useGetNewHire";

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
      </div>
    </div>
  );
};

export default NewHires;

const NewHireTableRow = ({ staff }: { staff: StaffData }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <tr>
        <th>{staff.name}</th>
        <td>{staff.department?.name}</td>
        <td>
          <p
            className={`${"text-" + progressColor(getNewHireProgress(staff))} font-bold`}
          >
            {getNewHireProgress(staff)}%
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
      </tr>

      {/* modal */}
      {openModal && (
        <NewHireChecklist
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          staff={staff}
        />
      )}
    </>
  );
};
