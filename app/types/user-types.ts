import { Checklist } from "../(client)/(dashboard)/onboarding/types";

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
  isDefault: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  onboarding_complete: boolean;
}

interface Permission {
  id: number;
  create: boolean;
  read: boolean;
  modify: boolean;
  delete: boolean;
  userId: number;
  moduleId: number;
  module: Module;
}

interface Module {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  staffId: number;
  isPasswordReset: boolean;
  isDefault: boolean;
  refreshToken: string;
  company: Company;
  staff: Staff;
  permissions: Permission[];
  leaveYear: number;
  resignation: string;
  nextPasswordResetDate: string;
  iat: number; // Issued At timestamp
  exp: number; // Expiration timestamp
}
