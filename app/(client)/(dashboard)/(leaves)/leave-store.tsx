import { create } from "zustand";
import { api } from "../../../axiosApi/api";
import { LeaveData, LeaveType } from "./types";

interface LeaveStore {
  leaves: LeaveData | null;
  leave: LeaveType | null;
  loading: boolean;
  error: string | null;
  fetchLeaves: () => Promise<void>;
  addLeave: (data: LeaveType) => Promise<boolean>;
  updateLeave: (id: number, data: Partial<LeaveType>) => Promise<boolean>;
  fetchLeaveById: (id: number) => Promise<LeaveType | null>;
  deleteLeave: (id: number) => Promise<boolean>;
  clearLeave: () => void;
}

export const useLeaveStore = create<LeaveStore>((set, get) => ({
  // Initial state
  leaves: null,
  leave: null,
  loading: false,
  error: null,

  // Fetch all leaves
  fetchLeaves: async () => {
    set({ loading: true, error: null });
    try {
      const response = (await api.get<LeaveData>("/v1/leaves")).data;
      set({ leaves: response, loading: false });
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to fetch leaves",
        loading: false,
      });
    }
  },

  // Fetch a single leave by ID
  fetchLeaveById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = (await api.get<LeaveType>(`/v1/leaves/${id}`)).data;
      set({ leave: response });
      return response;
    } catch (err) {
      console.error(err);
      set({ error: "Failed to fetch leave", loading: false });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  // Add a new leave
  addLeave: async (data: LeaveType) => {
    set({ loading: true, error: null });
    const previousLeaves = get().leaves;
    try {
      await api.post<LeaveType>("/v1/leaves", data);
      await get().fetchLeaves();
      return true;
    } catch (err) {
      console.error(err);
      set({
        error: "Failed to add leave",
        loading: false,
        leaves: previousLeaves,
      });
      return false;
    }
  },

  // Update a leave by ID
  updateLeave: async (id: number, data: Partial<LeaveType>) => {
    set({ loading: true, error: null });
    try {
      await api.put<LeaveData>(`/v1/leaves/${id}`, data);
      await get().fetchLeaves();
      return true;
    } catch (err) {
      set({
        error: "Failed to update leave",
        loading: false,
      });
      console.error(err);
      return false;
    }
  },

  // Delete a leave by ID
  deleteLeave: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/v1/leaves/${id}`);
      await get().fetchLeaves();
      return true;
    } catch (err) {
      console.error(err);
      set({ error: "Failed to delete leave", loading: false });
      return false;
    }
  },

  // Clear leave state
  clearLeave: () => set({ leave: null, error: null }),
}));
