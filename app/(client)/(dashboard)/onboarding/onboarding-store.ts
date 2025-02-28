import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  Checklist,
  ChecklistGroupedByDepartment,
  CreateChecklist,
} from "./types";

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

interface OnboardingStore {
  checklists: Checklist[];
  checklistsGroupedByDepartment: ChecklistGroupedByDepartment[];
  loading?: boolean; //for fetching
  updatingData?: boolean; //for updating data
  error?: string | null;
  fetchAllChecklists: (optionalLoading?: boolean) => Promise<void>;
  fetchAllChecklistsGroupedByDepartment: () => Promise<void>;
  fetchChecklistByDepartment: (id: number, optionalLoading?: boolean) => Promise<Checklist[]>;
  createChecklist: (data: CreateChecklist) => Promise<void>;
  submitQuery: (comment: { comment: string }, checklistId: number) => Promise<void>
  editChecklist: (data: CreateChecklist, id: number) => Promise<void>;
  deleteChecklist: (id: number) => Promise<void>;

}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  checklists: [],
  checklistsGroupedByDepartment: [],
  loading: false,
  updatingData: false,
  error: null,

  // all functions

  fetchAllChecklists: async (optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

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

  fetchAllChecklistsGroupedByDepartment: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/checklists/departments")).data;
      set(() => ({ checklistsGroupedByDepartment: response, loading: false }));
      console.log(response);
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

  fetchChecklistByDepartment: async (id: number, optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

    try {
      const response = (await api.get(`/v1/checklists/department/${id}`)).data;
      console.log(response);
      set({ loading: false });
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
      toast.error(get().error);
      console.error(err);
    }
  },

  editChecklist: async (data: CreateChecklist, id: number) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.put(`/v1/checklists/${id}`, data);
      set(() => ({ updatingData: false }));
      console.log(response.data);
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

  deleteChecklist: async (id: number) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.delete(`/v1/checklists/${id}`);
      set(() => ({ updatingData: false }));
      console.log(response.data);
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

  submitQuery: async (comment: { comment: string }, checklistId: number) => {
    set({ loading: true, error: null });
    try {
      await api.post(`/v1/checklists/${checklistId}/query`, comment);
      set(() => ({ loading: false }));
      toast.success("Query submitted successfully")
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
