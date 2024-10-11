import { create } from "zustand";
import { LeavePolicy } from "./types";
import { api } from "@/app/axiosApi/api";

interface LeavePolicyStore {
    leavePolicies: LeavePolicy[];
    leavePolicy: LeavePolicy | null; 
    loading: boolean;
    error: string | null;
    fetchLeavePolicies: () => Promise<void>;
    addLeavePolicy: (data: LeavePolicy) => Promise<boolean>;
    updateLeavePolicy: (id: number, data: Partial<LeavePolicy>) => Promise<boolean>;
    fetchLeavePolicyById: (id: number) => Promise<LeavePolicy | null>; 
    deleteLeavePolicy: (id: number) => Promise<boolean>;
}

export const useLeavePolicyStore = create<LeavePolicyStore>((set) => ({
    // Initial State
    leavePolicies: [],
    leavePolicy: null, 
    loading: false,
    error: null,

    // Fetch all leave policies
    fetchLeavePolicies: async () => {
        set({ loading: true, error: null });
        try {
            const response = (await api.get('/v1/leave-types')).data;
            set({ leavePolicies: response, loading: false });
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to fetch leave policies', loading: false });
        }
    },

    // Fetch a single leave policy by ID
    fetchLeavePolicyById: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = (await api.get(`/v1/leave-types/${id}`)).data;
            set({ leavePolicy: response, loading: false });
            return response;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to fetch leave policy', loading: false });
            return null;
        }
    },

    // Add a new leave policy
    addLeavePolicy: async (data: LeavePolicy) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/v1/leave-types', data);
            set((state) => ({
                leavePolicies: [...state.leavePolicies, response.data],
                loading: false,
            }));
            console.log("creating data");
            
            return true;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to add leave policy', loading: false });
            return false;
        }
    },

    // Update a leave policy by ID
    updateLeavePolicy: async (id: number, data: Partial<LeavePolicy>) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put(`/v1/leave-types/${id}`, data);
            set((state) => ({
                leavePolicies: state.leavePolicies.map((policy) =>
                    policy.id === id ? response.data : policy
                ),
                loading: false,
            }));
            return true;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to update leave policy', loading: false });
            return false;
        }
    },

    // Delete a leave policy by ID
    deleteLeavePolicy: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/v1/leave-types/${id}`);
            set((state) => ({
                leavePolicies: state.leavePolicies.filter(policy => policy.id !== id),
                loading: false,
            }));
            return true;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to delete leave policy', loading: false });
            return false;
        }
    },
}));
