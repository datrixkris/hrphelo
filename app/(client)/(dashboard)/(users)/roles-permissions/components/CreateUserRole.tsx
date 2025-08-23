import Button from "@/app/components/Button";
import React, { useState } from "react";
import Permissionss, {
  FormattedPermissionsForRoleCreation,
} from "../../users-accounts/components/Permissionss";
import { useRolesStore } from "../roles-store";

interface CreateUserRoleProps {
  closeModal: () => void;
}

const CreateUserRole = ({ closeModal }: CreateUserRoleProps) => {
  const [permissions, setPermissions] = useState<
    FormattedPermissionsForRoleCreation[] | null
  >(null);
  const [roleName, setRoleName] = useState<string>("");
  const [roleDescription, setRoleDescription] = useState<string>("");
  const { updatingData, createRole } = useRolesStore();

  const getRolePermissions = (data: FormattedPermissionsForRoleCreation[]) => {
    console.log(data);
    setPermissions(data);
    console.log(permissions);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (permissions) {
      const formData = { roleName, roleDescription, permissions };
      await createRole(formData);
      closeModal();
    } else {
      alert("Cannot get permissions");
    }
  }

  return (
    <div>
      <form className="space-y-2" onSubmit={handleSubmit}>
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
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
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
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
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
          <Permissionss getRolePermissions={getRolePermissions} />
        </div>

        {/* buttons */}
        <div className="!mt-4 flex items-center justify-center">
          <Button buttonType="submit" disabled={updatingData}>
            {updatingData ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserRole;
