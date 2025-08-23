import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserData, UserModules } from "./types";
import { Module } from "../roles-permissions/types";

interface CreateUserInterface {
  email: string;
  permissions: {
    moduleId: number;
    create: boolean;
    read: boolean;
    modify: boolean;
    delete: boolean;
  }[];
}

interface UserAccountStore {
  modules: Module[];
  userAccounts: UserData[];
  loading: boolean;
  updatingData: boolean;
  error: string | null;
  fetchUsers: (optionalLoading?: boolean) => Promise<void>;
  fetchModules: (optionalLoading?: boolean) => Promise<void>;
  createUser: (data: CreateUserInterface, staffId: number) => Promise<void>;
  editUser: (data: CreateUserInterface, staffId: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

export const useUserAccountStore = create<UserAccountStore>((set, get) => ({
  modules: [],
  userAccounts: [],
  loading: false,
  updatingData: false,
  error: null,

  fetchUsers: async (optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });
    try {
      const response = (await api.get("/v1/users")).data;
      set(() => ({ userAccounts: response, loading: false }));
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

  fetchModules: async (optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });
    try {
      const response = (await api.get("/v1/modules")).data;
      set(() => ({ modules: response, loading: false }));
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

  createUser: async (data, staffId) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.post(`/v1/users/${staffId}`, data);
      await get().fetchModules(false);
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

  editUser: async (data, staffId) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.put(`/v1/users/${staffId}`, data);
      await get().fetchModules(false);
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
