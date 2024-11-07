import { Company } from "@/app/types/user-types";
import { Department } from "../departments/types";

export interface StaffDetail {
  id?: number;
  staffId?: string;
  name?: string;
  role?: string;
  email?: string;
  contact?: string;
  gender: string;
  date_of_birth?: string;
  hiring_date?: string;
  supervisorId?: number;
  departments?: Department;
  company?: Company;
  image?: string;
  departmentId?: number;
}

export interface StaffData {
  id: number;
  companyId?: number;
  gender: string;
  date_of_birth: string;
  staffId?: string;
  name: string;
  role?: string;
  departmentId?: number;
  email?: string;
  contact?: string;
  image: string;
  hiring_date?: string;
  supervisorId?: number | null;
}
