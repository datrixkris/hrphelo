import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Permissions } from "../users-accounts/types";
import { Role } from "./types";

interface RolesStore {
  roles: Role[];
  loading: boolean;
  updatingData: boolean;
  error: string | null;
  fetchRoles: (optionalLoading?: boolean) => Promise<void>;
  createRole: (data: CreateRoleInterface) => Promise<void>;
  editRole: (data: string, roleId: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

interface CreateRoleInterface {
  name: string;
  description?: string;
  permissions?: Permissions[];
}

export const useRolesStore = create<RolesStore>((set, get) => ({
  roles: [],
  loading: false,
  updatingData: false,
  error: null,

  fetchRoles: async (optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });
    try {
      const response = (await api.get("/v1/user/roles")).data;
      set(() => ({ roles: response, loading: false }));
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

  createRole: async (data) => {
    set({ updatingData: true, error: null });
    try {
      const response = (await api.post("/v1/user/roles", data)).data;
      await get().fetchRoles(false);
      set(() => ({ updatingData: false }));
      console.log(response);
      toast.success("Role created successfully");
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

  editRole: async (data: string, roleId: number) => {
    set({ updatingData: true, error: null });
    try {
      const response = (
        await api.put(`/v1/user/roles/${roleId}`, { name: data })
      ).data;
      await get().fetchRoles(false);
      set(() => ({
        updatingData: false,
      }));
      console.log(response);
      toast.success("Role updated successfully");
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
