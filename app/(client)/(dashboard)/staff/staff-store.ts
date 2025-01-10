import { create } from "zustand";
import { api } from "../../../axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { StaffData, StaffDetail, StaffProfile, EditProfile } from "./types";

interface StaffStore {
  staffs: StaffData[];
  profile: StaffProfile | null;
  loading?: boolean; //for fetching
  updatingData?: boolean; //for updating data
  error?: string | null;
  fetchStaff: () => Promise<void>;
  addStaff: (data: StaffData) => Promise<void>;
  fetchStaffById: (
    id: number,
    optionalLoading?: boolean,
  ) => Promise<StaffDetail>;
  updateStaffDetails: (data: StaffDetail, id: number) => Promise<void>;
  fetchStaffProfile: (id: number, optionalLoading?: boolean) => Promise<void>;
  updateStaffProfileDetails: (data: EditProfile, id: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
}

export const useStaffStore = create<StaffStore>((set, get) => ({
  staffs: [],
  profile: null,
  loading: false,
  updatingData: false,
  error: null,

  fetchStaff: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/staff")).data;
      set(() => ({ staffs: response, loading: false }));
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

  //optional loading help us not show loading state when we are just updating data instead of fetching
  fetchStaffProfile: async (id: number, optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

    try {
      const response = (await api.get(`/v1/profile/${id}`)).data;

      set(() => ({ loading: false, profile: response[0] }));
      // return response;
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

  addStaff: async (data) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post("/v1/staff", data);
      set(() => ({ loading: false }));
      console.log(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error: axiosError?.response?.data.message ?? axiosError.message,
        loading: false,
      }));

      console.error(err);
    }
  },

  fetchStaffById: async (id: number, optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

    try {
      const response = (await api.get(`/v1/staff/${id}`)).data;
      set(() => ({ loading: false }));
      return response;
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

  updateStaffDetails: async (data, id) => {
    set({ updatingData: true, error: null });

    try {
      const response = await api.put(`/v1/staff/${id}`, data);
      set(() => ({ updatingData: false }));
      console.log(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error: axiosError?.response?.data.message ?? axiosError.message,
        updatingData: false,
      }));

      console.error(err);
    }
  },

  updateStaffProfileDetails: async (data, id) => {
    // set updating and error states to true and null
    set({ updatingData: true, error: null });

    try {
      const response = await api.put(`/v1/profile/${id}`, data); //update data
      await get().fetchStaffProfile(id, false); //fetch profile data when update is successful
      set(() => ({ updatingData: false })); //change updating state to false
      console.log(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      set(() => ({
        error: axiosError?.response?.data.message ?? axiosError.message,
        updatingData: false,
      }));

      console.error(err);
    }
  },
}));
