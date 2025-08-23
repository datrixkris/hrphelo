import { StaffDetail } from "@/app/(client)/(dashboard)/(employee)/staff/types";

export interface UserModules {
  id: number;
  name: string;
  permissions: Permissions;
  parentId: number | null;
}

export interface Staff {
  id: number;
  staffId: string;
  name: string;
  email: string;
  contact: string;
  hiring_date: string; // ISO format
  designation: string;
  image: string;
}

export interface Module {
  id: number;
  name: string;
}

export interface Permissions {
  id?: number;
  create: boolean;
  read: boolean;
  modify: boolean;
  delete: boolean;
  module?: Module;
  moduleId?: number;
}

export interface UserData {
  id: number;
  email: string;
  staffId: number;
  companyId: number;
  staff: StaffDetail;
  role: Role;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permissions[];
}
