import { Company } from "@/app/types/user-types";
import { Department } from "../departments/types";

export interface StaffDetail {
  id?: number;
  staffId?: string;
  name?: string;
  role?: string;
  email?: string;
  contact?: string;
  hiring_date?: string; // Date in "YYYY-MM-DD" format
  supervisorId?: boolean;
  department?: Department;
  company?: Company;
}

export interface StaffData {
  id?: number;
  companyId?: number;
  staffId?: string;
  name?: string;
  role?: string;
  departmentId?: number;
  email?: string;
  contact?: string;
  hiring_date?: string; // Date in "YYYY-MM-DD" format
  supervisorId?: number;
}
