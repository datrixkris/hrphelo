import { User } from "@/app/types/user-types";

export type ModuleName =
  | "User Role"
  | "Resignation"
  | "Payroll Policy"
  | "Payroll Period"
  | "Project Board"
  | "Board"
  | "Staff Checklist"
  | "Checklist"
  | "Payroll"
  | "Module"
  | "User"
  | "Staff"
  | "Leave"
  | "Department"
  | "Task"
  | "Project";

export type PermissionType = "create" | "read" | "modify" | "delete";

export const hasPermission = (
  user: User,
  permission: PermissionType,
  module: ModuleName,
): boolean => {
  const userPermission = user?.permissions?.find(
    (perm) => perm.module.name === module,
  );

  if (!userPermission) return false;

  switch (permission) {
    case "create":
      return userPermission.create;
    case "read":
      return userPermission.read;
    case "modify":
      return userPermission.modify;
    case "delete":
      return userPermission.delete;
    default:
      return false;
  }
};
