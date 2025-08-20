export interface LeaveHistoryItem {
    date: string;
    type: string;
    status: string;
  }
  
  export interface PayrollHistoryItem {
    date: string;
    amount: string;
  }
  
  export interface StaffDashboard {
    leave_balance: number;
    upcoming_leave: number;
    payroll_summary: number;
    assigned_projects: number;
    leave_history: LeaveHistoryItem[];
    payrol_history: PayrollHistoryItem[];
  }
  
  export interface EmployeeOverview {
    active: number;
    on_leave: number;
    on_probation: number;
  }
  
  export interface LeaveOverview {
    pending: number;
    approved: number;
    rejected: number;
  }
  
  export interface DepartmentOverview {
    "people and culture": number;
    development: number;
    operations: number;
  }
  
  export interface AdminDashboard {
    total_employees: number;
    departments: number;
    new_hires: number;
    resignations: number;
    payroll_processed: number;
    employee_overview: EmployeeOverview;
    leave_overview: LeaveOverview;
    department_overview: DepartmentOverview;
  }
  
  export interface DashboardData {
    staff: StaffDashboard;
    admin: AdminDashboard;
  }
  