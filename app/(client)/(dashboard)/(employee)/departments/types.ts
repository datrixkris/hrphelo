import { Designation } from "../designations/types";

export interface Department {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
  };
  staff: [
    {
      id: number;
      firstName: string;
      lastName: string;
    },
  ];
}

export interface CreateDepartment {
  dept_code: string;
  name: string;
  description: string;
}

export interface GetDepartment {
  id: number;
  dept_code: string;
  name: string;
  description: string;
  company: {
    id: number;
    name: string;
  };
  designations: Designation[];
  staff: [
    {
      id: number;
      departmentId: number;
      companyId: number;
      staffId: string;
      name: string;
      gender: string; // Assuming only these two values
      date_of_birth: string; // Can be Date if parsing
      email: string;
      contact: string;
      hiring_date: string; // Can be Date if parsing
      isDefault: boolean;
      image: string;
      createdAt: string; // Can be Date if parsing
      updatedAt: string; // Can be Date if parsing
      deletedAt: string | null;
      supervisorId: number | null;
    },
  ];
}
