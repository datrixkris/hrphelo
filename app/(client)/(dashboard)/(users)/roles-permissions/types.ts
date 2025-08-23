export type ModuleName =
  | "User Management"
  | "Designations"
  | "Payroll Management"
  | "Checklists"
  | "Settings"
  | "Employee Salary"
  | "Payroll Policy"
  | "Leave Management"
  | "Payroll Period"
  | "Projects"
  | "Your Leaves"
  | "Resignations"
  | "Staff Management"
  | "Manage Leaves"
  | "Departments"
  | "Staff List"
  | "Leave Settings";

export type PermissionType = "read" | "create" | "modify" | "delete";

// A submodule always has a parentId
interface Submodule {
  id: number;
  name: ModuleName;
  parentId: number;
}

// A module can have submodules
export interface Module {
  id: number;
  name: ModuleName;
  parentId: number | null;
  submodules: Submodule[];
}

// The main permission object
export interface Permission {
  id: number;
  create: boolean;
  read: boolean;
  modify: boolean;
  delete: boolean;
  roleId?: number;
  moduleId: number;
  createdAt?: string; // or Date, if you parse it
  updatedAt?: string; // or Date
  module: Module;
}

export interface Role {
  id: number;
  companyId: number;
  name: string;
  description?: string;
  permissions: Permission[];
}
