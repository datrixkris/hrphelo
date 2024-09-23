export interface Staff {
  id: number;
  name: string;
  email: string;
  contact: string;
  hiring_date: string; // ISO date string
  roleId: number | null;
  departmentId: number | null;
  supervisorId: number | null;
  companyId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Company {
  id?: number;
  name?: string;
  address?: string;
  contact_person?: string;
  contact_person_contact?: string;
  contact?: string;
  email?: string;
  company_size?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  document?: string[]; // Array of document URLs or paths
  directorid?: string[]; // Array of director national IDs or identifiers
  staff?: Staff[]; // Array of staff members
}
