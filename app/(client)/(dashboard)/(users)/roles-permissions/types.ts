import { Permissions } from "../users-accounts/types";

export interface Role {
  id: number;
  name: string;
  description?: string;
  companyId?: number;
  permissions: Permissions[];
}
