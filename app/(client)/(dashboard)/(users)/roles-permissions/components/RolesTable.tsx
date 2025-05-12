import React, { useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Role } from "../types";

const RolesTable = ({ roles }: { roles: Role[] }) => {
  return (
    <div>
      <div className="overflow-x-auto border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
              {/* <th>Favorite Color</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {roles.map((role) => (
              <TableRow key={role.id} role={role} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;

const TableRow = ({ role }: { role: Role }) => {
  return (
    <tr>
      <td className="font-semibold">{role.name}</td>
      <td>{role?.description}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          {/* edit */}
          <div
            className="tooltip tooltip-top"
            data-tip="Edit role and permissions"
          >
            <Icon
              icon="material-symbols:edit-square-outline"
              className="inline-block text-xl text-base-content/50"
            />
          </div>

          {/* delete */}
          <div className="tooltip tooltip-top" data-tip="Delete role">
            <Icon
              icon="material-symbols:delete-outline"
              className="inline-block text-xl text-error"
            />
          </div>

          {/* assign role */}
          <div className="text-nowrap rounded bg-success px-2 py-1 font-semibold text-white">
            <Icon
              icon="heroicons:eye-16-solid"
              className="inline-block text-lg"
            />
            <span className="relative ml-0.5 text-xs">View role</span>
          </div>
        </div>
      </td>
    </tr>
  );
};
