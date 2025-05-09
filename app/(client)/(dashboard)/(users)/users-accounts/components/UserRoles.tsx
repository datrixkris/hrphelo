import React, { useState } from "react";
import PermissionsComponent from "./Permissions";
import { UserModules, Permissions } from "../types";
import RolesTable from "./RolesTable";
import Button from "@/app/components/Button";
import { useUserAccountStore } from "../user-account-store";

const UserRoles = ({
  onPermissionsSubmit,
  userPermissions,
}: {
  onPermissionsSubmit: (permissions: UserModules[]) => void;
  userPermissions: Permissions[] | null;
}) => {
  const [permissions, setPermissions] = useState<UserModules[] | null>(null);
  const updatingData = useUserAccountStore((state) => state.updatingData);

  // get permissions module data from the permissions component anytime a user checks a permission box
  const getUserPermissions = (data: UserModules[]) => {
    console.log(data);
    setPermissions(data);
    console.log(permissions);
  };

  const handleSubmit = () => {
    // send data to parent component
    if (permissions) {
      onPermissionsSubmit(permissions);
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
        <RolesTable />
      </div>

      {/* user permissions component */}
      <div className="">
        <div className="label">
          <span className="label-text">Staff permissions</span>
        </div>
        <PermissionsComponent
          userPermissions={userPermissions}
          getUserPermissions={getUserPermissions}
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
            {updatingData ? "Editing permissions..." : "Edit permissions"}
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
