import React, { useState } from "react";
import RoleList from "./RoleList";
import CreateUserRole from "./CreateUserRole";

const UserRoles = () => {
  const [createUserRole, setCreateUserRole] = useState(false);
  const [editUserRole, setEditUserRole] = useState(false);

  return (
    <div className="mb-4">
      {/* Role list */}
      {createUserRole ? (
        <CreateUserRole
          setCreateUserRole={setCreateUserRole}
          setEditUserRole={setEditUserRole}
          edit={editUserRole}
        />
      ) : (
        <RoleList setCreateUserRole={setCreateUserRole} />
      )}
    </div>
  );
};

export default UserRoles;
