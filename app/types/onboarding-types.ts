export interface TOnboarding {
  id: number;
  companyId: number;
  departmentId: number;
  name: string;
  description: string;
  assignee: number;
  is_optional: boolean;
  assetType: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  department: {
    id: number;
    dept_code: string;
    head_of_department: number;
    name: string;
    description: string;
    companyId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  assignedStaff: number;
  staffChecklists: {
    id: number,
    companyId: number,
    staffId: number,
    checklistId: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null
  }[];
}