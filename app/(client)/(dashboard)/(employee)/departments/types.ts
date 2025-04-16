import { Designation } from "../designations/types";
import { StaffData } from "../staff/types";

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
  staff: StaffData[];
}
