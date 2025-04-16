import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { ProjectData } from "../types/project-types";

interface ProjectStore {
  projects: ProjectData[];
  loading?: boolean;
  updatingData?: boolean;
  error?: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: ProjectData) => Promise<void>;
  fetchProjectById: (
    slug: string,
    optionalLoading?: boolean,
  ) => Promise<ProjectData[]>;
  updateProjectDetails: (data: ProjectData, id: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  loading: false,
  updatingData: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/projects")).data;
      set(() => ({ projects: response, loading: false }));
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

  createProject: async (data) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.post("/v1/projects", data);
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

      console.error(err);
    }
  },

  fetchProjectById: async (slug, optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

    try {
      const response = (await api.get(`/v1/projects/${slug}/tasks`)).data;
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

  updateProjectDetails: async (data, id) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.put(`/v1/projects/${id}`, data);
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

      console.error(err);
    }
  },
}));
