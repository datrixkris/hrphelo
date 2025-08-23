import { useAuthStore } from "@/app/stores/auth-store";
import { hasPermission } from "@/utils/permissions";
import {
  ModuleName,
  PermissionType,
} from "@/app/(client)/(dashboard)/(users)/roles-permissions/types";

export const useHasPermission = (
  permission: PermissionType,
  module: ModuleName,
): boolean => {
  const user = useAuthStore((state) => state.user);

  if (!user) return false;

  return hasPermission(user, permission, module);
};
