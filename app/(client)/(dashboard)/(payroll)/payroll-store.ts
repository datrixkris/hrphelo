import { create } from "zustand";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "@/app/axiosApi/api";
import { TPayrollPolicy } from "./payroll-policy/page";
import { PaySlipData } from "./types";

export interface PayrollPolicy {
  id: number;
  companyId: number;
  name: string;
  pol_type: policyType;
  calc_per: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface PayrollPeriod {
  id: number;
  period: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export enum policyType {
  Benefit = "Benefit",
  Deduction = "Deduction",
}

interface DataType {
  period: string;
}

export interface createStaffPayrollData {
  staffId: number;
  salary_period_id: number;
  computations: {
    policyId: number;
    value: number;
  }[];
}

interface PayrollStore {
  payrollPolicies: PayrollPolicy[];
  payrollPeriods: PayrollPeriod[];
  payrolls: PaySlipData[];
  loading?: boolean;
  payslip: PaySlipData[] | [];
  updatingData?: boolean;
  error?: string | null;
  fetchPayrollPolicy: () => Promise<void>;
  fetchPayrollPeriod: () => Promise<void>;
  fetchPayroll: () => Promise<void>;
  fetchStaffPaySlip: (id: number) => Promise<void>;
  addPayrollPolicy: (data: TPayrollPolicy) => Promise<boolean>;
  CreatePayrollPeriod: (data: DataType) => Promise<boolean>;
  CreatePayroll: (data: createStaffPayrollData) => Promise<boolean | { message: string }>;
  // updatePayrollPolicy: (data: StaffDetail, id: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

export const usePayrollStore = create<PayrollStore>((set, get) => ({
  payrolls: [],
  payslip: [],
  payrollPolicies: [],
  payrollPeriods: [],
  loading: false,
  updatingData: false,
  error: null,

  fetchPayrollPolicy: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/payroll/policy/view")).data;
      set(() => ({ payrollPolicies: response, loading: false }));
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },

  fetchPayrollPeriod: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/payroll/period")).data;
      set(() => ({ payrollPeriods: response, loading: false }));
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },
  fetchPayroll: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get(`/v1/payroll/`)).data;
      set(() => ({ payrolls: response, loading: false }));
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },

  fetchStaffPaySlip: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get(`/v1/payroll/${id}`)).data;

      set(() => ({ loading: false, payslip: response }));
      // return response;
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },

  addPayrollPolicy: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post<ApiResponse>("/v1/payroll/policy", data);
      set(() => ({ loading: false }));
      return true;
    } catch (err) {
      return false;
    }
  },
  CreatePayrollPeriod: async (data) => {
    set({ loading: true, error: null });
    try {
      await api.post<ApiResponse>("/v1/payroll/period", data);
      set(() => ({ loading: false }));
      return true;
    } catch (err) {
      console.error("Error creating payroll period:", err);
      return false;
    }
  },

  CreatePayroll: async (data: createStaffPayrollData): Promise<boolean | { message: string }> => {
    set({ loading: true, error: null });

    try {
      await api.post<ApiResponse>("/v1/payroll", data);
      set({ loading: false });

      return true;
    } catch (err: unknown) {
      set({ loading: false });
      const axiosError = err as AxiosError<ApiErrorResponse>;



      console.error("Error creating payroll:", axiosError.message || "Unknown API error");

      return { message: axiosError.message || "An error occurred while creating payroll" };

      console.error("Unknown error creating payroll:", err);
      return { message: "An unexpected error occurred" };
    }
  },



  // updatePayrollPolicy: async (data, id) => {
  //     set({ updatingData: true, error: null });

  //     try {
  //         const response = await api.put(`/v1/staff/${id}`, data);
  //         set(() => ({ updatingData: false }));
  //         console.log(response.data);
  //     } catch (err) {
  //         const axiosError = err as AxiosError<ApiErrorResponse>;
  //         set(() => ({
  //             error: axiosError?.response?.data.error ?? axiosError?.response?.data.message ?? axiosError.message,
  //             updatingData: false,
  //         }));

  //         console.error(err);
  //     }
  // },
}));
