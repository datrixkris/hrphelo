import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Resignation } from "./types";

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

interface ResignationsStore {
  resignations: Resignation[];
  loading?: boolean; //for fetching
  updatingData?: boolean; //for updating data
  error?: string | null;
  fetchResignations: (optionalLoading?: boolean) => Promise<void>;
}

export const useResignationsStore = create<ResignationsStore>((set, get) => ({
  resignations: [],
  loading: false,
  updatingData: false,
  error: null,

  // functions
  fetchResignations: async (optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

    try {
      const response = (await api.get("/v1/resignations")).data;
      set(() => ({ resignations: response, loading: false }));
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
}));
