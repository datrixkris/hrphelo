import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Designation } from "./types";

interface DesignationStore {
  designations: Designation[];
  loading: boolean;
  error: string | null;
  updatingData?: boolean;
  fetchDesignations: () => Promise<void>;
  addDesignation: (data: Designation) => Promise<void>;
  updateDesignation: (id: number, data: Designation) => Promise<void>;
  deleteDesignation: (id: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

export const useDesignationStore = create<DesignationStore>((set, get) => ({
  designations: [],
  loading: false,
  error: null,
  updatingData: false,

  fetchDesignations: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/designations")).data;
      set(() => ({ designations: response, loading: false }));
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

  addDesignation: async (data: Designation) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.post<Designation>("/v1/designations", data);
      set((state) => ({
        designations: [...state.designations, response.data],
        updatingData: false,
      }));
      toast.success("Designation added successfully");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        updatingData: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },

  updateDesignation: async (id: number, data: Designation) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.put<Designation>(
        `/v1/designations/${id}`,
        data,
      );
      set((state) => ({
        designations: state.designations.map((designation) =>
          designation.id === id ? response.data : designation,
        ),
        updatingData: false,
      }));
      toast.success("Designation updated successfully");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        updatingData: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },

  deleteDesignation: async (id: number) => {
    set({ updatingData: true, error: null });

    try {
      await api.delete(`/v1/designations/${id}`);
      set((state) => ({
        designations: state.designations.filter(
          (designation) => designation.id !== id,
        ),
        updatingData: false,
      }));
      toast.success("Designation deleted successfully");
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        updatingData: false,
      }));
      toast.error(get().error);
      console.error(err);
    }
  },
}));
