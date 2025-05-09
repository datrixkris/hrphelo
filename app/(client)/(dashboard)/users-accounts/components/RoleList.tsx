import React from "react";
import RolesTable from "./RolesTable";

interface RoleListProps {
    setCreateUserRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const RoleList = ({setCreateUserRole}: RoleListProps) => {
  return (
    <div className="mb-4 space-y-4">
      {/* buttons */}
      <div className="flex justify-end space-x-2">
        <button className="btn btn-neutral" onClick={() => setCreateUserRole(true)}>Add User Role</button>
        {/* <button className="btn btn-neutral">Assign Custom Permissions</button> */}
      </div>

      {/* roles table */}
      <RolesTable />
    </div>
  );
};

export default RoleList;
