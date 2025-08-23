import Button from "@/app/components/Button";
import React, { useEffect, useState } from "react";
// import PermissionsComponent from "../../users-accounts/components/Permissions";
// import { Permissions, UserModules } from "../../users-accounts/types";
// import { useRolesStore } from "../roles-store";
import { Permission, Role } from "../types";
import { useRolesStore } from "../roles-store";
import Permissionss, {
  FormattedPermissionsForRoleCreation,
} from "../../users-accounts/components/Permissionss";

interface ViewAndEditProps {
  edit?: boolean;
  closeModal: () => void;
  role: Role;
}

const ViewAndEditRoleForm = ({ edit, closeModal, role }: ViewAndEditProps) => {
  const [permissions, setPermissions] = useState<
    FormattedPermissionsForRoleCreation[] | null
  >(null);
  const [roleName, setRoleName] = useState<string>(role.name);
  const [roleDescription, setRoleDescription] = useState<string>(
    role?.description || "",
  );
  const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
  const { updatingData, editRole } = useRolesStore();

  useEffect(() => {
    const permData = role.permissions.map((permission) => {
      return {
        id: permission.id,
        create: permission.create,
        read: permission.read,
        modify: permission.modify,
        delete: permission.delete,
        moduleId: permission.moduleId,
        module: permission.module,
      };
    });

    setUserPermissions(permData);
  }, []);

  // get permissions module data from the permissions component anytime a user checks a permission box
  const getRolePermissions = (data: FormattedPermissionsForRoleCreation[]) => {
    console.log(data);
    setPermissions(data);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (permissions) {
      const formData = { roleName, roleDescription, permissions };
      await editRole(formData, role.id);
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
              readOnly={!edit}
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
              readOnly={!edit}
            ></textarea>
          </label>
        </div>

        <div className="">
          <div className="divider">Permissions</div>
          <Permissionss
            rolePermissions={userPermissions}
            getRolePermissions={getRolePermissions}
          />
        </div>

        {/* buttons */}
        {edit && (
          <div className="!mt-4 flex items-center justify-center">
            <Button buttonType="submit" disabled={updatingData}>
              {updatingData ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ViewAndEditRoleForm;
