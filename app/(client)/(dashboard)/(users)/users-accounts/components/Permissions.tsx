import React, { useEffect, useState } from "react";
// import Button from "@/app/components/Button";
import TableSkeleton from "@/app/components/TableSkeleton";
import { useUserAccountStore } from "../user-account-store";
import { Permissions, UserModules } from "../types";
type UserModulesWithToggle = UserModules & {
  toggle: boolean;
};

const PermissionsComponent = ({
  getUserPermissions,
  userPermissions,
}: {
  // this function gets permissions modules to the parent component
  getUserPermissions: (permissions: UserModules[]) => void;
  //   this user permissions array is used to set the permissions of the user if any exists
  userPermissions?: Permissions[] | null;
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    fetchModules,
    loading,
    // updatingData
  } = useUserAccountStore();
  const [permissions, setPermissions] = useState<UserModulesWithToggle[]>([]);

  useEffect(() => {
    const gettingModules = async () => {
      setErrorMessage("");
      if (useUserAccountStore.getState().modules.length === 0) {
        await fetchModules();
        if (useUserAccountStore.getState().error) {
          setErrorMessage("Couldn't fetch modules");
          return;
        }
      }

      // set permissions for the form
      setPermissions(
        useUserAccountStore.getState().modules.map((item) => {
          let permissions;
          // if the user has permissions, check each module and set its permissions
          if (userPermissions) {
            const perm = userPermissions.find(
              (permission) => item.id === permission.module!.id,
            )!;

            // sometimes some modules might not be included in the users permission hence the need for the nullish coalescing to set permissions to false
            permissions = {
              create: perm?.create ?? false,
              read: perm?.read ?? false,
              modify: perm?.modify ?? false,
              delete: perm?.delete ?? false,
            };
          }
          // if no user permissions exist use module data
          else {
            permissions = {
              create: item.permissions.create,
              read: item.permissions.read,
              modify: item.permissions.modify,
              delete: item.permissions.delete,
            };
          }
          // Check if all permissions are false, and update toggle state
          const hasActivePermission = Object.values(permissions).some(
            (value) => value,
          );
          return {
            id: item.id,
            name: item.name,
            permissions,
            toggle: hasActivePermission,
          };
        }),
      );
    };

    gettingModules();
  }, [userPermissions, fetchModules]);

  const handleToggleChange = (moduleId: number) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.id === moduleId
          ? {
              ...item,
              toggle: !item.toggle,
              permissions: !item.toggle
                ? { create: true, read: true, modify: true, delete: true } // If toggled on, enable all
                : { create: false, read: false, modify: false, delete: false }, // If toggled off, disable all
            }
          : item,
      ),
    );
  };

  const handlePermissionChange = (
    moduleId: number,
    type: keyof UserModulesWithToggle["permissions"],
  ) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.id === moduleId) {
          const updatedPermissions = {
            ...item.permissions,
            [type]: !item.permissions[type],
          };

          // Check if all permissions are false, and update toggle state
          const hasActivePermission = Object.values(updatedPermissions).some(
            (value) => value,
          );

          return {
            ...item,
            permissions: updatedPermissions,
            toggle: hasActivePermission, // Turn off toggle if all permissions are false
          };
        }
        return item;
      }),
    );
  };

  useEffect(() => {
    // send data to parent component
    console.log(permissions);
    getUserPermissions(
      permissions.map((item) => {
        return {
          id: item.id,
          name: item.name,
          permissions: { ...item.permissions },
        };
      }),
    );
  }, [permissions]);

  //   const handleSubmit = () => {
  //     // send data to parent component
  //     console.log(permissions);
  //     getUserPermissions(
  //       permissions.map((item) => {
  //         return {
  //           id: item.id,
  //           name: item.name,
  //           permissions: { ...item.permissions },
  //         };
  //       }),
  //     );
  //   };

  return (
    <div>
      {/* module form */}
      {loading && errorMessage === "" ? (
        <div>
          <TableSkeleton />
        </div>
      ) : errorMessage !== "" ? (
        <div className="text-center">{errorMessage}</div>
      ) : (
        <div>
          {/* table */}
          <div className="overflow-x-auto">
            <table className="table border">
              <tbody>
                {/* row 1 */}
                {permissions.map((item) => (
                  <tr key={item.id}>
                    {/* Toggle */}
                    <td>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.toggle}
                          onChange={() => handleToggleChange(item.id)}
                          id={`toggle-${item.id}`}
                          className="toggle toggle-sm"
                        />
                        <label
                          htmlFor={`toggle-${item.id}`}
                          className="text-hr font-normal"
                        >
                          {item.name}
                        </label>
                      </div>
                    </td>

                    {/* Read */}
                    <td>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.permissions.read}
                          disabled={!item.toggle}
                          onChange={() =>
                            handlePermissionChange(item.id, "read")
                          }
                          id={`read-${item.id}`}
                          className="checkbox checkbox-sm"
                        />
                        <label
                          htmlFor={`read-${item.id}`}
                          className="text-hr font-normal"
                        >
                          Read
                        </label>
                      </div>
                    </td>

                    {/* Create */}
                    <td>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.permissions.create}
                          disabled={!item.toggle}
                          onChange={() =>
                            handlePermissionChange(item.id, "create")
                          }
                          id={`create-${item.id}`}
                          className="checkbox checkbox-sm"
                        />
                        <label
                          htmlFor={`create-${item.id}`}
                          className="text-hr font-normal"
                        >
                          Create
                        </label>
                      </div>
                    </td>

                    {/* Modify */}
                    <td>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.permissions.modify}
                          disabled={!item.toggle}
                          onChange={() =>
                            handlePermissionChange(item.id, "modify")
                          }
                          id={`modify-${item.id}`}
                          className="checkbox checkbox-sm"
                        />
                        <label
                          htmlFor={`modify-${item.id}`}
                          className="text-hr font-normal"
                        >
                          Modify
                        </label>
                      </div>
                    </td>

                    {/* Delete */}
                    <td>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={item.permissions.delete}
                          disabled={!item.toggle}
                          onChange={() =>
                            handlePermissionChange(item.id, "delete")
                          }
                          id={`delete-${item.id}`}
                          className="checkbox checkbox-sm"
                        />
                        <label
                          htmlFor={`delete-${item.id}`}
                          className="text-hr font-normal"
                        >
                          Delete
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <div className="!mt-10">
            {userPermissions ? (
              <Button className="mx-auto w-1/2" disabled={updatingData}>
                {updatingData ? "Editing permissions..." : "Edit permissions"}
              </Button>
            ) : (
              <Button className="mx-auto w-1/2" disabled={updatingData}>
                {updatingData ? "Creating user..." : "Create user"}
              </Button>
            )}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PermissionsComponent;
