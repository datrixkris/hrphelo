import React, { useEffect, useState } from "react";
// import Permissionss from "./Permissionss";
import { UserModules, Permissions } from "../types";
import RolesTable from "./RolesTable";
import Button from "@/app/components/Button";
import { useUserAccountStore } from "../user-account-store";
import { useRolesStore } from "../../roles-permissions/roles-store";
import TableSkeleton from "@/app/components/TableSkeleton";
import Permissionss, {
  FormattedPermissionsForRoleCreation,
} from "./Permissionss";
import { Permission } from "../../roles-permissions/types";
import { Role } from "../types";

const UserRoles = ({
  onPermissionsSubmit,
  userPermissions,
  role,
}: {
  onPermissionsSubmit: (roleId: number) => void;
  userPermissions: Permission[] | null;
  role: Role | null;
}) => {
  const [permissions, setPermissions] = useState<Permission[] | null>(
    userPermissions,
  );
  const [roleId, setRoleId] = useState<number | null>(null);
  const updatingData = useUserAccountStore((state) => state.updatingData);
  const { loading, roles, fetchRoles } = useRolesStore();
  // this is the user permissions that will be editable
  // const [editableUserPermissions, setEditableUserPermissions] = useState<
  //   Permissions[] | null
  // >(userPermissions);

  // fetch roles on mount
  useEffect(() => {
    const fetchData = async () => {
      if (roles.length > 0) {
        // check if roles are available and fetch without loading
        await fetchRoles(false);
      } else {
        await fetchRoles();
      }
    };
    fetchData();
  }, []);

  // get permissions module data from the permissions component anytime a user checks a permission box
  const getUserPermissions = (data: FormattedPermissionsForRoleCreation[]) => {
    console.log(data);
    // setPermissions(data);
    // console.log(permissions);
  };

  const handleSubmit = () => {
    // send data to parent component
    if (roleId) {
      onPermissionsSubmit(roleId);
    }
  };

  return (
    <div className="mb-4">
      {/* roles */}
      <div className="mb-2">
        <div className="">
          <span className="label-text mb-2 block">
            Available roles (
            <i className="text-xs">
              Select a role to prefill permissions for staff
            </i>
            )
          </span>
        </div>
        {/* roles table */}
        {loading ? (
          <TableSkeleton />
        ) : (
          <RolesTable
            onRoleAssign={(data, roleId) => {
              setPermissions(data);
              setRoleId(roleId);
            }}
            roles={roles}
            role={role}
          />
        )}
      </div>

      {/* user permissions component */}
      <div className="">
        <div className="divider">
          <span className="label-text">Staff permissions</span>
        </div>
        <Permissionss
          editable={false}
          rolePermissions={permissions}
          getRolePermissions={getUserPermissions}
        />
      </div>

      {/* Create user button */}
      <div className="!mt-10">
        {userPermissions ? (
          <Button
            className="mx-auto w-1/2"
            disabled={updatingData}
            onClick={() => handleSubmit()}
          >
            {updatingData ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button
            onClick={() => handleSubmit()}
            className="mx-auto w-1/2"
            disabled={updatingData}
          >
            {updatingData ? "Creating user..." : "Create user"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserRoles;
