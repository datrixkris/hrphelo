import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserModules } from "./types";

interface UserAccountStore {
  modules: UserModules[];
  loading: boolean;
  updatingData: boolean;
  error: string | null;
  fetchModules: () => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
}

export const useUserAccountStore = create<UserAccountStore>((set, get) => ({
  modules: [],
  loading: false,
  updatingData: false,
  error: null,

  fetchModules: async () => {
    set({ loading: true, error: null });
    try {
      const response = (await api.get("/v1/modules")).data;
      set(() => ({ modules: response, loading: false }));
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error: axiosError?.response?.data.message ?? axiosError.message,
        loading: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },
}));
