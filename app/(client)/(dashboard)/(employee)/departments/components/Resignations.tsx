import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

const Resignations = () => {
  return (
    <div className="space-y-5 p-4">
      {/* description */}

      <p className="text-sm">Manage clearance of resigning staff here</p>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Reason</th>
              <th>Resignation Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <TableRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Resignations;

const TableRow = () => {
  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);
  return (
    <tr>
      <th>Brice Swyre</th>
      <td>Got a new Job</td>
      <td>25th May, 2025</td>
      <td>
        {" "}
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
  );
};
