import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { progressColor } from "../../../projects/components/ProgressBar";
import NewHireChecklist from "./NewHireChecklist";

const NewHires = () => {
  const [openModal, setOpenModal] = useState(false);
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
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>
                <p className={`${"text-" + progressColor(20)} font-bold`}>
                  20% completed
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
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>
                <p className={`${"text-" + progressColor(94)} font-bold`}>
                  94% completed
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
          </tbody>
        </table>
      </div>

      {/* staffchecklist */}
      {openModal && (
        <NewHireChecklist
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default NewHires;
