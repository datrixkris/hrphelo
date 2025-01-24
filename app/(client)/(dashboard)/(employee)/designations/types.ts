import { Department } from "../departments/types";

export interface Designation {
  id: number;
  companyId: number;
  name: string;
  description: string;
  noOfEmployees: number;
  departmentId: number;
  department: Department;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // Can be null or a string
}
