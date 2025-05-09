import Button from "@/app/components/Button";
import React, { useState } from "react";
import PermissionsComponent from "./Permissions";
import { UserModules } from "../types";

interface CreateUserRoleProps {
  setCreateUserRole: React.Dispatch<React.SetStateAction<boolean>>;
  edit: boolean;
  setEditUserRole: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateUserRole = ({
  setCreateUserRole,
  edit,
  setEditUserRole,
}: CreateUserRoleProps) => {
  const [permissions, setPermissions] = useState<UserModules[] | null>(null);

  const getUserPermissions = (data: UserModules[]) => {
    console.log(data);
    setPermissions(data);
    console.log(permissions);
  };

  return (
    <div>
      <form className="space-y-2">
        {/* Role Name */}
        <div className="">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Role name</span>
            </div>
            <input
              type="text"
              placeholder="Eg. HR Manager"
              className="input input-bordered w-full"
            />
          </label>
        </div>

        {/* Role description */}
        <div className="">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Role description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-20"
              placeholder="Minimal description of the role"
            ></textarea>
          </label>
        </div>

        {/* user permissions component */}
        <div className="!my-2">
          <div className="label">
            <span className="label-text">
              Set access permissions for this role
            </span>
          </div>
          <PermissionsComponent getUserPermissions={getUserPermissions} />
        </div>

        {/* buttons */}
        <div className="!mt-4 flex items-center justify-center">
          {edit ? (
            <Button
              onClick={() => {
                setEditUserRole(false);
                setCreateUserRole(false);
              }}
            >
              Save
            </Button>
          ) : (
            <Button onClick={() => setCreateUserRole(false)}>Create</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateUserRole;
