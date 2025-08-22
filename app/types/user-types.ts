import { Designation } from "../(client)/(dashboard)/(employee)/designations/types";
import { Checklist } from "../(client)/(dashboard)/onboarding/types";
import { Resignation } from "../(client)/(dashboard)/resignations/types";

// Define the Company type
export interface Company {
  id: number;
  name: string;
  address: string;
  contact_person: string;
  contact_person_contact: string;
  contact: string;
  email: string;
  company_size: string;
  checklists: Checklist[];
  company_light_theme_logo?: string;
  company_dark_theme_logo?: string;
  password_expiry_duration: number;
}

export interface Staff {
  id: number;
  departmentId: number | null;
  supervisorId: number | null;
  companyId: number;
  staffId: string;
  name: string;
  gender: string | null;
  date_of_birth: string | null;
  email: string;
  contact: string;
  hiring_date: string;
  designation: string | null;
  designations: Designation[];
  resignation: Resignation;
  isDefault: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  onboarding_complete: boolean;
}

// interface Permission {
//   id: number;
//   create: boolean;
//   read: boolean;
//   modify: boolean;
//   delete: boolean;
//   userId: number;
//   moduleId: number;
//   module: Module;
// }

// interface Module {
//   id: number;
//   name: string;
// }

export interface User {
  id: number;
  email: string;
  staffId: number;
  isPasswordReset: boolean;
  isDefault: boolean;
  refreshToken: string;
  roleId: number;
  company: Company;
  staff: Staff;
  // permissions: Permission[];
  role: Role;
  leaveYear: number;
  resignation: string;
  nextPasswordResetDate: string;
  iat: number; // Issued At timestamp
  exp: number; // Expiration timestamp
}

// export interface DashboardUser {
//   id: number;
//   email: string;
//   isPasswordReset: boolean;
//   passwordResetDate: string;
//   isDefault: boolean;
//   roleId: number;
//   company: Company;
//   staff: Staff;
//   role: Role;
//   leaveYear: number;
//   nextPasswordResetDate: string;
//   iat: number;
//   exp: number;
// }

//  interface Company {
//   id: number;
//   name: string;
//   address: string;
// }

//  interface Staff {
//   id: number;
//   departmentId: number;
//   staffId: string;
//   name: string;
//   gender: string;
//   date_of_birth: string;
//   email: string;
//   contact: string;
//   hiring_date: string;
//   image: string;
//   onboarding_complete: boolean;
//   designations: Designation[];
//   resignation: null | string;
// }

// interface Designation {
//   id: number;
//   departmentId: number;
//   companyId: number;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   StaffDesignations: StaffDesignation;
// }

// interface StaffDesignation {
//   staffId: number;
//   designationId: number;
// }

interface Role {
  name: string;
  permissions: RolePermission[];
}

interface RolePermission {
  create: boolean;
  read: boolean;
  modify: boolean;
  delete: boolean;
  roleId: number;
  moduleId: number;
  module: RoleModule;
}

interface RoleModule {
  name: string;
}
