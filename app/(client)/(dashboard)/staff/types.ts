import { Company } from "@/app/types/user-types";
import { Department } from "../departments/types";

export interface StaffDetail {
  id?: number;
  staffId?: string;
  name?: string;
  designation?: string;
  email?: string;
  contact?: string;
  gender?: string;
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
  designation?: string;
  departmentId?: number;
  email?: string;
  contact?: string;
  image: string;
  hiring_date?: string;
  supervisorId?: number | null;
}

export interface StaffProfile {
  id: number;
  name: string;
  email: string;
  departmentId: number | null;
  supervisorId: number | null;
  companyId: number;
  staffId: string;
  gender: string | null;
  date_of_birth: string | null;
  contact: string;
  hiring_date: string;
  designation: string | null;
  isDefault: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  personalInfoStatus: boolean;
  iceContactsStatus: boolean;
  bankInfoStatus: boolean;
  personalInfo: {
    alt_contact: string;
    nationality: string;
    marital_status: "single" | "married";
    no_of_children: number;
  };
  bankInfo: {
    bank_name: string;
    account_number: string;
    bank_branch: string;
  };
  iceContacts: [
    {
      name: string;
      relationship: string;
      contact: string;
    },
  ];
}

export interface EditProfile {
  alt_contact?: string;
  nationality?: string;
  national_id?: string;
  marital_status?: string;
  no_of_children?: number;
  name?: string;
  relationship?: string;
  contact?: string;
  bank_name?: string;
  account_number?: string;
  bank_branch?: string;
}
