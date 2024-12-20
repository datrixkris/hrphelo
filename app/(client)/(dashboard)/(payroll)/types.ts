export type PaySlipData = {
    id: number;
    companyId: number;
    period: string;
    createdAt: string; 
    updatedAt: string; 
    deletedAt: string | null;
    payroll: PayrollEntry[];
  };
  
  type PayrollEntry = {
    id: number;
    companyId: number;
    staffId: number;
    salary_period_id: number;
    policyId: number;
    value: string ;
    createdAt: string; 
    updatedAt: string; 
    deletedAt: string | null;
    policy: Policy;
  };
  
  type Policy = {
    id: number;
    companyId: number;
    name: string;
    pol_type: "Benefit" | "Deduction";
    calc_per: string | null;
    createdAt: string; 
    updatedAt: string; 
    deletedAt: string | null;
  };
  
  