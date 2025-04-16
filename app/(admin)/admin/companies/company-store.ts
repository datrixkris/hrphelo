import { create } from "zustand";
import { api } from "../../../axiosApi/api";
import { Company } from "./types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CompanyStore {
  companies: Company[];
  loading?: boolean;
  error?: string | null;
  fetchCompanies: () => Promise<void>;
  OnboardCompany: (data: Company) => Promise<void>;
  fetchCompanyById: (id: number) => Promise<Company>;
  updateCompanyDetails: (data: Company, id: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

export const useCompanyStore = create<CompanyStore>((set, get) => ({
  // State
  companies: [],
  loading: false,
  error: null,

  // Actions
  // fetching all companies
  fetchCompanies: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/companies")).data;
      set(() => ({ companies: response, loading: false }));
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

  // fetch a single company
  fetchCompanyById: async (id: number) => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get(`/v1/companies/${id}`)).data;
      set(() => ({ loading: false }));
      return response;
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

  // add or onboard a company
  OnboardCompany: async (data) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post("/v1/companies", data);
      set(() => ({ loading: false }));
      console.log(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));

      console.error(err);
    }
  },

  // update company details
  updateCompanyDetails: async (data, id) => {
    set({ loading: true, error: null });

    try {
      const response = await api.put(`/v1/companies/${id}`, data);
      set(() => ({ loading: false }));
      console.log(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));

      console.error(err);
    }
  },
}));
