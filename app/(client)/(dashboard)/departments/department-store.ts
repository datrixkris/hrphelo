import { create } from "zustand";
import { api } from "../../../axiosApi/api";
import { Department } from "./types";

interface CompanyStore {
    departments: Department[];
    loading?: boolean;
    error?: string | null;
    fetchDepartments: () => Promise<void>;
    addDepartment: (data: Department) => Promise<void>;
    fetchDepartmentById: (id: number) => Promise<Department | null>;
    deleteDepartment: (id: number) => Promise<void>;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
    // State
    departments: [],
    loading: false,
    error: null,

    // Actions

    // Fetch all departments
    fetchDepartments: async () => {
        set({ loading: true, error: null });
        try {
            const response = (await api.get('/v1/departments')).data;
            set({ departments: response, loading: false });
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to fetch departments', loading: false });
        }
    },

    // Fetch a single department by ID
    fetchDepartmentById: async (id: number) => {
        set({ loading: true, error: null });
        try {
            const response = (await api.get(`/v1/departments/${id}`)).data;
            set({ loading: false });
            return response;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to fetch department', loading: false });
            return null;
        }
    },

    // Add a new department
    addDepartment: async (data: Department) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post('/v1/departments', data);
            set((state) => ({
                departments: [...state.departments, response.data],
                loading: false,
            }));
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to add department', loading: false });
        }
    },

    // Delete a department by ID
    deleteDepartment: async (id: number) => {
        set({ loading: true, error: null });
        try {
            await api.delete(`/v1/departments/${id}`);
            set((state) => ({
                departments: state.departments.filter(department => department.id !== id),
                loading: false,
            }));
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to delete department', loading: false });
        }
    },
}));
