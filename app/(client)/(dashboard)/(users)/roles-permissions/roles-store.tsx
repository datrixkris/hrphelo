import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { UserModules } from "../users-accounts/types";
import { Role } from "./types";

interface RolesStore {
  roles: Role[];
  loading: boolean;
  updatingData: boolean;
  error: string | null;
  fetchRoles: (optionalLoading?: boolean) => Promise<void>;
  createRole: (data: CreateRoleInterface) => Promise<void>;
  editRole: (data: CreateRoleInterface, roleId: number) => Promise<void>;
  deleteRole: (roleId: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
  error?: string;
}

interface CreateRoleInterface {
  roleName: string;
  roleDescription: string;
  permissions: UserModules[];
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
      // create role with name and description
      const role = (
        await api.post("/v1/user/roles", {
          name: data.roleName,
          description: data.roleDescription,
        })
      ).data;

      const permData = {
        userRoleId: role.id,
        permissions: data.permissions?.map((perm) => ({
          moduleId: perm.id,
          create: perm.permissions.create,
          read: perm.permissions.read,
          modify: perm.permissions.modify,
          delete: perm.permissions.delete,
        })),
      };

      // assign permissions to created role
      const permResponse = await api.post(
        "/v1/user/roles/permissions",
        permData,
      );

      console.log(permResponse.data);

      // fetch roles again to update with newly created role
      await get().fetchRoles(false);
      set(() => ({ updatingData: false }));
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

  editRole: async (data, roleId) => {
    set({ updatingData: true, error: null });
    try {
      const response = (
        await api.put(`/v1/user/roles/${roleId}`, {
          name: data.roleName,
          description: data.roleDescription,
        })
      ).data;

      const permData = {
        userRoleId: roleId,
        permissions: data.permissions?.map((perm) => ({
          moduleId: perm.id,
          create: perm.permissions.create,
          read: perm.permissions.read,
          modify: perm.permissions.modify,
          delete: perm.permissions.delete,
        })),
      };

      // assign permissions to created role
      const permResponse = await api.post(
        "/v1/user/roles/permissions",
        permData,
      );

      console.log(permResponse.data);

      await get().fetchRoles(false); //refetch roles to update data
      set(() => ({
        updatingData: false,
      }));
      console.log(response);
      toast.success(permResponse.data.message);
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

  deleteRole: async (roleId) => {
    set({ updatingData: true, error: null });
    try {
      const response = (await api.delete(`/v1/user/roles/${roleId}`)).data;
      await get().fetchRoles(false);
      set(() => ({
        updatingData: false,
      }));
      toast.success(response.message);
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
