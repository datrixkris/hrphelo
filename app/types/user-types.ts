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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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
}

export interface User {
  id: number;
  email: string;
  staffId: number;
  companyId: number;
  isPasswordReset: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  company: Company;
  staff: Staff;
  leaveYear: number;
  iat: number; // Issued At timestamp
  exp: number; // Expiration timestamp
}
