import React, { useEffect, useState } from "react";
import { useUserAccountStore } from "../user-account-store";
import CheckboxComponent from "./CheckboxComponent";
import { Permission } from "../../roles-permissions/types";
import TableSkeleton from "@/app/components/TableSkeleton";

export interface FormattedPermissionsForRoleCreation {
  moduleId: number;
  create: boolean;
  read: boolean;
  modify: boolean;
  delete: boolean;
}

/**
 * Permissionss Component
 *
 * This component renders a hierarchical permissions table where:
 * - Parent modules with submodules appear as section headers
 * - Submodules are indented under their parent modules
 * - Standalone modules (without submodules) appear as regular rows
 * - Each module/submodule has toggle switches and permission checkboxes
 * - Parent module toggles control access to submodules
 * - Submodule toggles control access to their individual permissions
 */
const Permissionss = ({
  rolePermissions,
  getRolePermissions,
  editable = true,
}: {
  rolePermissions?: Permission[] | null;
  getRolePermissions: (
    permissions: FormattedPermissionsForRoleCreation[],
  ) => void;
  editable?: boolean;
}) => {
  // Get modules data from the store
  const { modules, loading, fetchModules } = useUserAccountStore();
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * State to track which parent modules are enabled/disabled
   * Key: module ID, Value: boolean (true = enabled, false = disabled)
   * When a parent module is disabled, all its submodules become inaccessible
   */
  const [moduleToggles, setModuleToggles] = useState<{
    [key: number]: boolean;
  }>({});

  /**
   * State to track which submodules are enabled/disabled
   * Key: submodule ID, Value: boolean (true = enabled, false = disabled)
   * Submodules can only be enabled when their parent module is enabled
   */
  const [submoduleToggles, setSubmoduleToggles] = useState<{
    [key: number]: boolean;
  }>({});

  /**
   * State to track module permissions (for standalone modules)
   * Key: module ID, Value: object with read, create, modify, delete permissions
   */
  const [modulePermissions, setModulePermissions] = useState<{
    [key: number]: {
      read: boolean;
      create: boolean;
      modify: boolean;
      delete: boolean;
    };
  }>({});

  /**
   * State to track submodule permissions
   * Key: submodule ID, Value: object with read, create, modify, delete permissions
   */
  const [submodulePermissions, setSubmodulePermissions] = useState<{
    [key: number]: {
      read: boolean;
      create: boolean;
      modify: boolean;
      delete: boolean;
    };
  }>({});

  /**
   * Fetch modules data when component mounts
   * Only fetches if modules array is empty to avoid unnecessary API calls
   */
  useEffect(() => {
    const getModules = async () => {
      if (useUserAccountStore.getState().modules.length === 0) {
        await fetchModules();
        if (useUserAccountStore.getState().error) {
          setErrorMessage("Couldn't fetch modules");
          return;
        }
      }
    };
    getModules();
  }, []);

  /**
   * Initialize toggle states when modules data is loaded
   * Sets all modules and submodules to disabled (false) by default
   * This ensures a clean starting state for the permissions form
   */
  useEffect(() => {
    if (modules.length > 0) {
      const initialToggles: { [key: number]: boolean } = {};
      const initialSubmoduleToggles: { [key: number]: boolean } = {};
      const initialModulePermissions: {
        [key: number]: {
          read: boolean;
          create: boolean;
          modify: boolean;
          delete: boolean;
        };
      } = {};
      const initialSubmodulePermissions: {
        [key: number]: {
          read: boolean;
          create: boolean;
          modify: boolean;
          delete: boolean;
        };
      } = {};

      // Initialize all toggles and permissions to false
      modules.forEach((module) => {
        initialToggles[module.id] = false;
        initialModulePermissions[module.id] = {
          read: false,
          create: false,
          modify: false,
          delete: false,
        };
        module.submodules.forEach((submodule) => {
          initialSubmoduleToggles[submodule.id] = false;
          initialSubmodulePermissions[submodule.id] = {
            read: false,
            create: false,
            modify: false,
            delete: false,
          };
        });
      });

      // Initialize with rolePermissions if provided
      if (rolePermissions && rolePermissions.length > 0) {
        // Filter out modules with submodules from rolePermissions
        const standaloneModulePermissions = rolePermissions.filter(
          (rolePerm) => {
            const modulle = modules.find((m) => m.id === rolePerm.moduleId);
            return modulle && modulle.submodules.length === 0;
          },
        );

        // Initialize standalone module permissions
        standaloneModulePermissions.forEach((rolePerm) => {
          initialModulePermissions[rolePerm.moduleId] = {
            read: rolePerm.read,
            create: rolePerm.create,
            modify: rolePerm.modify,
            delete: rolePerm.delete,
          };

          // If any permission is checked, turn on the module toggle
          if (
            rolePerm.read ||
            rolePerm.create ||
            rolePerm.modify ||
            rolePerm.delete
          ) {
            initialToggles[rolePerm.moduleId] = true;
          }
        });

        // Initialize submodule permissions from rolePermissions
        rolePermissions.forEach((rolePerm) => {
          const modulle = modules.find((m) => m.id === rolePerm.moduleId);
          if (modulle && modulle.submodules.length > 0) {
            // This is a parent module, check if any of its submodules have permissions
            const submodulePerms = rolePermissions.filter((rp) =>
              modulle.submodules.some((sub) => sub.id === rp.moduleId),
            );

            if (submodulePerms.length > 0) {
              // Initialize submodule permissions
              submodulePerms.forEach((subPerm) => {
                initialSubmodulePermissions[subPerm.moduleId] = {
                  read: subPerm.read,
                  create: subPerm.create,
                  modify: subPerm.modify,
                  delete: subPerm.delete,
                };

                // If any permission is checked, turn on the submodule toggle
                if (
                  subPerm.read ||
                  subPerm.create ||
                  subPerm.modify ||
                  subPerm.delete
                ) {
                  initialSubmoduleToggles[subPerm.moduleId] = true;
                }
              });

              // If any submodule has permissions, turn on the parent module toggle
              const hasAnySubmodulePermission = submodulePerms.some(
                (subPerm) =>
                  subPerm.read ||
                  subPerm.create ||
                  subPerm.modify ||
                  subPerm.delete,
              );
              if (hasAnySubmodulePermission) {
                initialToggles[modulle.id] = true;
              }
            }
          }
        });
      }

      setModuleToggles(initialToggles);
      setSubmoduleToggles(initialSubmoduleToggles);
      setModulePermissions(initialModulePermissions);
      setSubmodulePermissions(initialSubmodulePermissions);
    }
  }, [modules, rolePermissions]);

  /**
   * Handle parent module toggle changes
   * @param moduleId - The ID of the parent module being toggled
   *
   * When a parent module is toggled:
   * - If enabled: submodules become interactive AND all submodule toggles are enabled with all permissions checked
   * - If disabled: all submodules become inaccessible AND all permissions are reset to false
   */
  const handleModuleToggle = (moduleId: number) => {
    const newToggleState = !moduleToggles[moduleId];

    setModuleToggles((prev) => ({
      ...prev,
      [moduleId]: newToggleState,
    }));

    const modulle = modules.find((m) => m.id === moduleId);
    if (modulle && modulle.submodules.length > 0) {
      // Handle modules with submodules
      if (newToggleState) {
        // Turning ON: Enable all submodules and check all permissions
        setSubmoduleToggles((prev) => {
          const updated = { ...prev };
          modulle.submodules.forEach((submodule) => {
            updated[submodule.id] = true;
          });
          return updated;
        });

        setSubmodulePermissions((prev) => {
          const updated = { ...prev };
          modulle.submodules.forEach((submodule) => {
            updated[submodule.id] = {
              read: true,
              create: true,
              modify: true,
              delete: true,
            };
          });
          return updated;
        });
      } else {
        // Turning OFF: Reset all submodules and their permissions
        setSubmoduleToggles((prev) => {
          const updated = { ...prev };
          modulle.submodules.forEach((submodule) => {
            updated[submodule.id] = false;
          });
          return updated;
        });

        setSubmodulePermissions((prev) => {
          const updated = { ...prev };
          modulle.submodules.forEach((submodule) => {
            updated[submodule.id] = {
              read: false,
              create: false,
              modify: false,
              delete: false,
            };
          });
          return updated;
        });
      }
    } else {
      // Handle standalone modules
      if (newToggleState) {
        // Turning ON: Check all permissions
        setModulePermissions((prev) => ({
          ...prev,
          [moduleId]: {
            read: true,
            create: true,
            modify: true,
            delete: true,
          },
        }));
      } else {
        // Turning OFF: Reset all permissions
        setModulePermissions((prev) => ({
          ...prev,
          [moduleId]: {
            read: false,
            create: false,
            modify: false,
            delete: false,
          },
        }));
      }
    }

    // Log updated permissions after state update
    // setTimeout(() => logCurrentPermissions(), 10); // Removed setTimeout
  };

  /**
   * Handle submodule toggle changes
   * @param submoduleId - The ID of the submodule being toggled
   *
   * Submodules can only be toggled when their parent module is enabled
   * When enabled: all permission checkboxes are automatically checked
   * When disabled: all permission checkboxes are reset to unchecked
   */
  const handleSubmoduleToggle = (submoduleId: number) => {
    const newToggleState = !submoduleToggles[submoduleId];

    setSubmoduleToggles((prev) => ({
      ...prev,
      [submoduleId]: newToggleState,
    }));

    // Update submodule permissions based on toggle state
    if (newToggleState) {
      // Turning ON: Check all permissions
      setSubmodulePermissions((prev) => ({
        ...prev,
        [submoduleId]: {
          read: true,
          create: true,
          modify: true,
          delete: true,
        },
      }));
    } else {
      // Turning OFF: Reset all permissions
      setSubmodulePermissions((prev) => ({
        ...prev,
        [submoduleId]: {
          read: false,
          create: false,
          modify: false,
          delete: false,
        },
      }));
    }

    // Log updated permissions after state update
    // setTimeout(() => logCurrentPermissions(), 10); // Removed setTimeout
  };

  /**
   * Handle module permission changes (for standalone modules)
   * @param moduleId - The ID of the module
   * @param permissionType - The type of permission being changed (read, create, modify, delete)
   */
  const handleModulePermissionChange = (
    moduleId: number,
    permissionType: "read" | "create" | "modify" | "delete",
  ) => {
    setModulePermissions((prev) => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permissionType]: !prev[moduleId][permissionType],
      },
    }));

    // Log updated permissions after state update
    // setTimeout(() => logCurrentPermissions(), 10); // Removed setTimeout
  };

  /**
   * Handle submodule permission changes
   * @param submoduleId - The ID of the submodule
   * @param permissionType - The type of permission being changed (read, create, modify, delete)
   */
  const handleSubmodulePermissionChange = (
    submoduleId: number,
    permissionType: "read" | "create" | "modify" | "delete",
  ) => {
    setSubmodulePermissions((prev) => ({
      ...prev,
      [submoduleId]: {
        ...prev[submoduleId],
        [permissionType]: !prev[submoduleId][permissionType],
      },
    }));

    // Log updated permissions after state update
    // setTimeout(() => logCurrentPermissions(), 10); // Removed setTimeout
  };

  /**
   * Check if submodules should be completely disabled
   * @param moduleId - The ID of the parent module
   * @returns true if submodules should be disabled, false if they can be interacted with
   *
   * Submodules are disabled when their parent module toggle is OFF
   * This prevents users from accessing submodules without first enabling the parent
   */
  const isSubmoduleDisabled = (moduleId: number) => {
    return !moduleToggles[moduleId];
  };

  /**
   * Check if submodule permission checkboxes should be disabled
   * @param submoduleId - The ID of the submodule
   * @param moduleId - The ID of the parent module
   * @returns true if permissions should be disabled, false if they can be interacted with
   *
   * Submodule permissions are disabled when:
   * 1. Parent module toggle is OFF (submodules are completely inaccessible)
   * 2. Submodule toggle is OFF (permissions are disabled even if parent is enabled)
   *
   * This creates a two-level permission system:
   * - Parent module controls access to submodules
   * - Submodule toggle controls access to individual permissions
   */
  const isSubmodulePermissionDisabled = (
    submoduleId: number,
    moduleId: number,
  ) => {
    // Submodule permissions are disabled if either parent module is off OR submodule toggle is off
    return !moduleToggles[moduleId] || !submoduleToggles[submoduleId];
  };

  /**
   * Log all current permissions to console in the specified format
   * This function collects all module and submodule permissions and formats them as an array
   * of objects with moduleId and permission states
   */
  const logCurrentPermissions = () => {
    const permissionsArray: Array<{
      moduleId: number;
      create: boolean;
      read: boolean;
      modify: boolean;
      delete: boolean;
    }> = [];

    modules.forEach((module) => {
      if (module.submodules.length > 0) {
        // For modules with submodules, check if any submodule has permissions
        const hasAnySubmodulePermission = module.submodules.some(
          (submodule) => {
            const submodulePerms = submodulePermissions[submodule.id];
            return (
              submodulePerms &&
              (submodulePerms.read ||
                submodulePerms.create ||
                submodulePerms.modify ||
                submodulePerms.delete)
            );
          },
        );

        // Add parent module with permissions based on submodule state
        permissionsArray.push({
          moduleId: module.id,
          create: hasAnySubmodulePermission,
          read: hasAnySubmodulePermission,
          modify: hasAnySubmodulePermission,
          delete: hasAnySubmodulePermission,
        });

        // Add each submodule's permissions
        module.submodules.forEach((submodule) => {
          const submodulePerms = submodulePermissions[submodule.id];
          if (submodulePerms) {
            permissionsArray.push({
              moduleId: submodule.id,
              create: submodulePerms.create,
              read: submodulePerms.read,
              modify: submodulePerms.modify,
              delete: submodulePerms.delete,
            });
          }
        });
      } else {
        // For standalone modules, add the module's permissions
        const modulePerms = modulePermissions[module.id];
        if (modulePerms) {
          permissionsArray.push({
            moduleId: module.id,
            create: modulePerms.create,
            read: modulePerms.read,
            modify: modulePerms.modify,
            delete: modulePerms.delete,
          });
        }
      }
    });

    console.log("Current Permissions:", permissionsArray);
    return permissionsArray;
  };

  /**
   * useEffect to log permissions whenever they change
   * This ensures we log the current state that matches the UI
   */
  useEffect(() => {
    if (modules.length > 0) {
      logCurrentPermissions();
      getRolePermissions(logCurrentPermissions());
    }
  }, [modulePermissions, submodulePermissions, modules]);

  return (
    <div>
      {/* module form */}
      {loading && errorMessage === "" ? (
        <div>
          <TableSkeleton />
        </div>
      ) : errorMessage !== "" ? (
        <div className="py-5 text-center text-sm text-neutral-400">
          {errorMessage}
        </div>
      ) : (
        <div
          className={`${editable ? "opacity-100" : "pointer-events-none opacity-70"}`}
        >
          {/* Permissions Table */}
          <div className="overflow-x-auto">
            <table className="table border">
              <tbody>
                {/* Render each module and its submodules */}
                {modules.map((module) => {
                  return (
                    <React.Fragment key={module.id}>
                      {/* 
                    MODULE HEADER ROW
                    Only show for modules that have submodules
                    Acts as a section title with a toggle that controls all submodules
                  */}
                      {module.submodules.length > 0 && (
                        <tr className="border-b-2 bg-base-300">
                          <td colSpan={5} className="p-3">
                            <div className="flex items-center gap-2">
                              {/* Parent module toggle - controls access to all submodules */}
                              <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                id={`toggle-${module.id}`}
                                checked={moduleToggles[module.id] || false}
                                onChange={() => handleModuleToggle(module.id)}
                              />
                              <label
                                htmlFor={`toggle-${module.id}`}
                                className="text-hr font-semibold"
                              >
                                {module.name}
                              </label>
                            </div>
                          </td>
                        </tr>
                      )}

                      {/* 
                    SUBMODULES SECTION
                    If module has submodules, render them as indented rows
                    If no submodules, render the module itself as a regular row
                  */}
                      {module.submodules.length > 0 ? (
                        // Render submodules under their parent module
                        module.submodules.map((submodule) => (
                          <tr key={submodule.id} className="border-b">
                            {/* Submodule name and toggle */}
                            <td className="p-3 pl-8">
                              <div className="flex items-center gap-2">
                                {/* 
                              Submodule toggle - only interactive when parent module is enabled
                              Controls access to this submodule's permission checkboxes
                            */}
                                <input
                                  type="checkbox"
                                  className="toggle toggle-sm"
                                  id={`toggle-${submodule.id}`}
                                  checked={
                                    submoduleToggles[submodule.id] || false
                                  }
                                  onChange={() =>
                                    handleSubmoduleToggle(submodule.id)
                                  }
                                  disabled={isSubmoduleDisabled(module.id)}
                                />
                                <label
                                  htmlFor={`toggle-${submodule.id}`}
                                  className={`text-hr font-normal ${isSubmoduleDisabled(module.id) ? "text-gray-400" : ""}`}
                                >
                                  {submodule.name}
                                </label>
                              </div>
                            </td>

                            {/* Permission checkboxes for this submodule */}
                            {/* Read permission */}
                            <td className="p-3 text-center">
                              <CheckboxComponent
                                checked={
                                  submodulePermissions[submodule.id]?.read ||
                                  false
                                }
                                disabled={isSubmodulePermissionDisabled(
                                  submodule.id,
                                  module.id,
                                )}
                                onChange={() =>
                                  handleSubmodulePermissionChange(
                                    submodule.id,
                                    "read",
                                  )
                                }
                                id={`read-${submodule.id}`}
                                label="Read"
                              />
                            </td>

                            {/* Create permission */}
                            <td className="p-3 text-center">
                              <CheckboxComponent
                                checked={
                                  submodulePermissions[submodule.id]?.create ||
                                  false
                                }
                                disabled={isSubmodulePermissionDisabled(
                                  submodule.id,
                                  module.id,
                                )}
                                onChange={() =>
                                  handleSubmodulePermissionChange(
                                    submodule.id,
                                    "create",
                                  )
                                }
                                id={`create-${submodule.id}`}
                                label="Create"
                              />
                            </td>

                            {/* Modify permission */}
                            <td className="p-3 text-center">
                              <CheckboxComponent
                                checked={
                                  submodulePermissions[submodule.id]?.modify ||
                                  false
                                }
                                disabled={isSubmodulePermissionDisabled(
                                  submodule.id,
                                  module.id,
                                )}
                                onChange={() =>
                                  handleSubmodulePermissionChange(
                                    submodule.id,
                                    "modify",
                                  )
                                }
                                id={`modify-${submodule.id}`}
                                label="Modify"
                              />
                            </td>

                            {/* Delete permission */}
                            <td className="p-3 text-center">
                              <CheckboxComponent
                                checked={
                                  submodulePermissions[submodule.id]?.delete ||
                                  false
                                }
                                disabled={isSubmodulePermissionDisabled(
                                  submodule.id,
                                  module.id,
                                )}
                                onChange={() =>
                                  handleSubmodulePermissionChange(
                                    submodule.id,
                                    "delete",
                                  )
                                }
                                id={`delete-${submodule.id}`}
                                label="Delete"
                              />
                            </td>
                          </tr>
                        ))
                      ) : (
                        /* 
                      STANDALONE MODULE ROW
                      For modules without submodules, render them as regular rows
                      These modules have their own toggle and permission checkboxes
                    */
                        <tr className="border-b">
                          {/* Module name and toggle */}
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              {/* Module toggle - controls access to all permissions */}
                              <input
                                type="checkbox"
                                className="toggle toggle-sm"
                                id={`toggle-${module.id}`}
                                checked={moduleToggles[module.id] || false}
                                onChange={() => handleModuleToggle(module.id)}
                              />
                              <label
                                htmlFor={`toggle-${module.id}`}
                                className="text-hr font-normal"
                              >
                                {module.name}
                              </label>
                            </div>
                          </td>

                          {/* Permission checkboxes for this standalone module */}
                          {/* Read permission */}
                          <td className="p-3 text-center">
                            <CheckboxComponent
                              checked={
                                modulePermissions[module.id]?.read || false
                              }
                              disabled={!moduleToggles[module.id]}
                              onChange={() =>
                                handleModulePermissionChange(module.id, "read")
                              }
                              id={`read-${module.id}`}
                              label="Read"
                            />
                          </td>

                          {/* Create permission */}
                          <td className="p-3 text-center">
                            <CheckboxComponent
                              checked={
                                modulePermissions[module.id]?.create || false
                              }
                              disabled={!moduleToggles[module.id]}
                              onChange={() =>
                                handleModulePermissionChange(
                                  module.id,
                                  "create",
                                )
                              }
                              id={`create-${module.id}`}
                              label="Create"
                            />
                          </td>

                          {/* Modify permission */}
                          <td className="p-3 text-center">
                            <CheckboxComponent
                              checked={
                                modulePermissions[module.id]?.modify || false
                              }
                              disabled={!moduleToggles[module.id]}
                              onChange={() =>
                                handleModulePermissionChange(
                                  module.id,
                                  "modify",
                                )
                              }
                              id={`modify-${module.id}`}
                              label="Modify"
                            />
                          </td>

                          {/* Delete permission */}
                          <td className="p-3 text-center">
                            <CheckboxComponent
                              checked={
                                modulePermissions[module.id]?.delete || false
                              }
                              disabled={!moduleToggles[module.id]}
                              onChange={() =>
                                handleModulePermissionChange(
                                  module.id,
                                  "delete",
                                )
                              }
                              id={`delete-${module.id}`}
                              label="Delete"
                            />
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Permissionss;
