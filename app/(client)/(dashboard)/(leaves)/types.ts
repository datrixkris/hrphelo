export type LeaveType = {
  id?: number;
  leaveTypeId: number;
  duration: number;
  start_date: string;
  reason: string;
};

export type LeaveData1 = {
  status: boolean;
  leaveDaysLeft: number;
  leaves: {
    id: number;
    staffId: number;
    companyId: number;
    leaveTypeId: number;
    start_date: string;
    duration: number;
    reason: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    leavetype: {
      id: number;
      name: string;
      description: string;
      companyId: number;
      useStaffLeaveDays: boolean;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
    staff: {
      id: number;
      departmentId: number;
      supervisorId: number;
      companyId: number;
      staffId: string;
      name: string;
      gender: string;
      date_of_birth: string;
      email: string;
      contact: string;
      hiring_date: string;
      image: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      departments: string;
    };
    company: {
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
    };
  }[];
};



export type LeaveTypeDetail = {
  id: number;
  name: string;
  description: string;
  companyId: number;
  useStaffLeaveDays: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type StaffDetail = {
  id: number;
  departmentId: number;
  supervisorId: number;
  companyId: number;
  staffId: string;
  name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  contact: string;
  hiring_date: string;
  image: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  departments: string;
}

export type CompanyDetail = {
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
}

export type LeaveRecord = {
  id: number;
  staffId: number;
  companyId: number;
  leaveTypeId: number;
  start_date: string;
  duration: number;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  leavetype: LeaveTypeDetail;
  staff: StaffDetail;
  company: CompanyDetail;


}

export type LeaveData = {
  status: boolean;
  leaveDaysLeft: number;
  leaves: LeaveRecord[];
};