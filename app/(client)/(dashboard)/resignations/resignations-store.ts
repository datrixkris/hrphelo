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
  fetchResignationsWithQuery: (
    optionalLoading?: boolean,
    query?: { initiated: boolean },
  ) => Promise<Resignation[]>;
  fetchResignationById: (
    id: number,
    optionalLoading?: boolean,
  ) => Promise<Resignation>;
  initiateResignation: (
    id: number,
    data?: { status: "initiated" },
  ) => Promise<void>;
}

export const useResignationsStore = create<ResignationsStore>((set, get) => ({
  resignations: [],
  loading: false,
  updatingData: false,
  error: null,

  // functions
  //   fetch resignations...
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

  //   fetch resignations with query
  fetchResignationsWithQuery: async (optionalLoading = true, query) => {
    set({ loading: optionalLoading, error: null });
    let endpoint = "/v1/resignations";
    if (query) {
      const formattedQuery = Object.fromEntries(
        Object.entries(query).map(([key, value]) => [key, String(value)]),
      );
      const params = new URLSearchParams(formattedQuery); // query should be an object, e.g., { key1: value1, key2: value2 }
      endpoint += `?${params.toString()}`;
    }
    try {
      const response = (await api.get(endpoint)).data;
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

  //   fetch one resignation
  fetchResignationById: async (id: number, optionalLoading = true) => {
    set({ loading: optionalLoading, error: null });

    try {
      const response = (await api.get(`/v1/resignations/${id}`)).data;
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

  //   function to initiate resignation
  initiateResignation: async (id, data = { status: "initiated" }) => {
    set({ updatingData: true, error: null });
    try {
      await api.put(`/v1/resignations/${id}`, data);
      await get().fetchResignations(false);
      set(() => ({ updatingData: false }));
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      set(() => ({
        error:
          axiosError?.response?.data.error ??
          axiosError?.response?.data.message ??
          axiosError.message,
        updatingData: false,
      }));
      toast.error(get().error);
    }
  },
}));
