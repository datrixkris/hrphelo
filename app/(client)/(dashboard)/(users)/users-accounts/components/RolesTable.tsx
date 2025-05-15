import React, { useState } from "react";
import { Role } from "../../roles-permissions/types";
import { Permissions } from "../types";
// import { Icon } from "@iconify/react/dist/iconify.js";

interface RolesTableProps {
  onRoleAssign: (data: Permissions[]) => void;
  roles: Role[];
}

const RolesTable = ({ roles, onRoleAssign }: RolesTableProps) => {
  const [roleAssigned, setRoleAssigned] = useState(""); // to keep track of the role assigned during user creation

  return (
    <div>
      <div className="overflow-x-auto border border-base-content/5 bg-base-100">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Role</th>
              <th>Description</th>
              <th className="text-center">Action</th>
              {/* <th>Favorite Color</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {roles.map((role) => (
              <TableRow
                role={role}
                key={role.id}
                onRoleAssign={onRoleAssign}
                setRoleAssigned={setRoleAssigned}
                roleAssigned={roleAssigned}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;

interface TableRowProps {
  role: Role;
  onRoleAssign: (data: Permissions[]) => void;
  setRoleAssigned: React.Dispatch<React.SetStateAction<string>>;
  roleAssigned: string;
}

// Table row
export const TableRow = ({
  onRoleAssign,
  role,
  setRoleAssigned,
  roleAssigned,
}: TableRowProps) => {
  function assignRole() {
    const permData = role.permissions.map((permission) => {
      return {
        id: permission.id,
        create: permission.create,
        read: permission.read,
        modify: permission.modify,
        delete: permission.delete,
        module: permission.module,
      };
    });

    setRoleAssigned(role.name);
    onRoleAssign(permData);
  }

  return (
    <tr>
      <td className="font-semibold">{role.name}</td>
      <td>{role?.description}</td>
      <td>
        <div className="flex items-center justify-end gap-1">
          {/* assign role */}
          {roleAssigned === role.name ? (
            <div
              className="tooltip tooltip-left text-nowrap rounded bg-info px-2 py-1 font-semibold text-white"
              data-tip="This role has been assigned"
            >
              <span
                className="relative ml-0.5 cursor-pointer text-xs"
                onClick={() => assignRole()}
              >
                Assigned
              </span>
            </div>
          ) : (
            <div
              className="tooltip tooltip-left text-nowrap rounded bg-success px-2 py-1 font-semibold text-white"
              data-tip="Assign role to staff"
            >
              <span
                className="relative ml-0.5 cursor-pointer text-xs"
                onClick={() => assignRole()}
              >
                Assign role
              </span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};
