import { create } from "zustand";
import { Company } from "@/app/types/user-types";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "@/app/stores/auth-store";

export interface EditCompanyDetail {
  name: string;
  address: string;
  contact_person?: string;
  contact_person_contact?: string;
  contact: string;
  email: string;
  company_size: string;
  company_light_theme_logo: string;
  company_dark_theme_logo: string;
}

interface SettingsStore {
  company: Company | null;
  loading?: boolean;
  error?: string | null;
  updatingData?: boolean;

  fetchCompany: () => Promise<void>;
  updateCompanyDetails: (data: EditCompanyDetail) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  company: null,
  loading: false,
  updatingData: false,

  fetchCompany: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/company")).data;
      set(() => ({ company: response, loading: false }));
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

  updateCompanyDetails: async (data) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.put(`/v1/company`, data);
      // refresh user data to get new access token and update user data
      await useAuthStore.getState().refreshUserData();
      set(() => ({ updatingData: false }));
      console.log(response);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        updatingData: false,
      }));
    }
  },
}));
