import { useAuthStore } from "@/app/stores/auth-store";
import { hasPermission, ModuleName, PermissionType } from "@/utils/permissions";

export const useHasPermission = (
  permission: PermissionType,
  module: ModuleName,
): boolean => {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return hasPermission(user, permission, module);
};
