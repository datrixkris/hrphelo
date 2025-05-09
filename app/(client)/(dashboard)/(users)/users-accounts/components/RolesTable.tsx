import React from "react";
// import { Icon } from "@iconify/react/dist/iconify.js";

const RolesTable = () => {
  return (
    <div>
      <div className="overflow-x-auto border border-base-content/5 bg-base-100">
        <table className="table table-sm">
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
            <tr>
              <td className="font-semibold">HR Manager</td>
              <td>Has total control</td>
              <td>
                <div className="flex items-center justify-end gap-1">
                  {/* edit */}
                  {/* <div
                    className="tooltip tooltip-top"
                    data-tip="Edit role and permissions"
                  >
                    <Icon
                      icon="material-symbols:edit-square-outline"
                      className="inline-block text-lg text-base-content/50"
                    />
                  </div> */}

                  {/* delete */}
                  {/* <div className="tooltip tooltip-top" data-tip="Delete role">
                    <Icon
                      icon="material-symbols:delete-outline"
                      className="inline-block text-lg text-error"
                    />
                  </div> */}

                  {/* assign role */}
                  <div
                    className="tooltip tooltip-left text-nowrap rounded bg-success px-2 py-1 font-semibold text-white"
                    data-tip="Assign role to staff"
                  >
                    {/* <Icon
                      icon="heroicons:eye-16-solid"
                      className="inline-block text-lg"
                    /> */}
                    <span className="relative ml-0.5 text-xs">Assign role</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;
