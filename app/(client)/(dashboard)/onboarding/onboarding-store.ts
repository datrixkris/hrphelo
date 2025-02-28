import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Checklist, CreateChecklist } from "./types";

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

interface OnboardingStore {
  checklists: Checklist[];
  loading?: boolean; //for fetching
  updatingData?: boolean; //for updating data
  error?: string | null;
  fetchAllChecklists: () => Promise<void>;
  createChecklist: (data: CreateChecklist) => Promise<void>;
  submitQuery: (comment: string, checklistId: number) => Promise<void>
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  checklists: [],
  loading: false,
  updatingData: false,
  error: null,

  // all functions

  fetchAllChecklists: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/checklists")).data;
      set(() => ({ checklists: response, loading: false }));
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

  createChecklist: async (data) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post("/v1/checklists", data);
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

  submitQuery: async (comment: string, checklistId: number) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/v1/checklists/${checklistId}/query`, comment);
      set(() => ({ loading: false }));
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        loading: false,
      }));
    }
  }
}));
