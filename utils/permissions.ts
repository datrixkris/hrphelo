import { User } from "@/app/types/user-types";
import { ModuleName } from "@/app/(client)/(dashboard)/(users)/roles-permissions/types";

export type PermissionType = "create" | "read" | "modify" | "delete";

export const hasPermission = (
  user: User,
  permission: PermissionType,
  module: ModuleName,
): boolean => {
  const userPermission = user?.role?.permissions?.find(
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
