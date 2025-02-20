import { Company } from "@/app/(admin)/admin/companies/types";
import { StaffData } from "../(employee)/staff/types";

export interface Checklist {
  id: number;
  companyId: number;
  departmentId: number;
  name: string;
  description: string;
  assignee: string | null;
  is_optional: boolean;
  assetType: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  department: {
    id: number;
    dept_code: string;
    head_of_department: string | null;
    name: string;
    description: string;
    companyId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  assignedStaff: StaffData;
  company: Company;
}

export interface CreateChecklist {
  name: string;
  description: string;
  companyId: number;
  departmentId: number;
  assignee: number | null;
  is_optional: boolean;
  assetType?: string;
}
