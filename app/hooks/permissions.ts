import { useAuthStore } from "@/app/stores/auth-store";
import { hasPermission, ModuleName, PermissionType } from "@/utils/permissions";

export const useHasPermission = (
  permission: PermissionType,
  module: ModuleName,
): boolean => {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return hasPermission(user, permission, module);

  //   const userPermission = user?.permissions?.find(
  //     (perm) => perm.module.name === module,
  //   );

  //   if (!userPermission) return false;

  //   switch (permission) {
  //     case "create":
  //       return userPermission.create;
  //     case "read":
  //       return userPermission.read;
  //     case "modify":
  //       return userPermission.modify;
  //     case "delete":
  //       return userPermission.delete;
  //     default:
  //       return false;
  //   }
};
