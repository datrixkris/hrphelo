export type PaySlipData = {
  payslipNo: string; 
  payslip_uri: string;
  salaryMonth: string;
  from: {
    name: string;
    email: string;
    phone: string;
  };
  to: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  dateRange: string;
  benefits: Array<{
    name: string;
    amount: string; 
  }>;
  deductions: Array<{
    name: string;
    amount: string; 
  }>;
  totalBenefits: number;
  totalDeductions: number;
  netPay: {
    value: number;
    currency: string;
  };
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
  
  