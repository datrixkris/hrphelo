import { create } from "zustand";
import { api } from "../../../axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { StaffData, StaffDetail } from "./types";

interface StaffStore {
  staff: StaffData[];
  loading?: boolean;
  error?: string | null;
  fetchStaff: () => Promise<void>;
  addStaff: (data: StaffData) => Promise<void>;
  fetchStaffById: (id: number) => Promise<StaffDetail>;
  updateStaffDetails: (data: StaffDetail, id: number) => Promise<void>;
}

interface ApiErrorResponse {
  message?: string;
  code?: number;
}

export const useStaffStore = create<StaffStore>((set, get) => ({
  staff: [],
  loading: false,
  error: null,

  fetchStaff: async () => {
    set({ loading: true, error: null });

    try {
      const response = (await api.get("/v1/staff")).data;
      set(() => ({ staff: response, loading: false }));
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

  fetchStaffById: async () => {
    return "ok";
  },

  updateStaffDetails: async () => {},
}));
