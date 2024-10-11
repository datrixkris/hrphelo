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
}

// Define the Staff type
export interface Staff {
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

// Define the main User type
export interface User {
  id: number;
  email: string;
  staffId: number;
  companyId: number;
  isPasswordReset: boolean;
  createdAt: string; // Could also use Date type depending on how it's handled
  updatedAt: string; // Could also use Date type depending on how it's handled
  company: Company;
  staff: Staff[];
}
