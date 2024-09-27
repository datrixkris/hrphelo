import { create } from "zustand";
import { api } from "../../../axiosApi/api";
import { CreateDepartment, Department, GetDepartment } from "./types";

interface DepartmentStore {
    departments: Department[];
    department: GetDepartment | null; 
    loading: boolean;
    error: string | null;
    fetchDepartments: () => Promise<void>;
    addDepartment: (data: CreateDepartment) => Promise<boolean>;
    updateDepartment: (id: number, data: Partial<CreateDepartment>) => Promise<boolean>;
    fetchDepartmentById: (id: number) => Promise<GetDepartment | null>; // Make return type nullable
    deleteDepartment: (id: number) => Promise<boolean>;
}

export const useDepartmentStore = create<DepartmentStore>((set) => ({
    // State
    departments: [],
    department: null, // Initialize as null
    loading: false,
    error: null,

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
            set({ department: response });
            return response;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to fetch department', loading: false });
            return null;
        } finally {
            set({ loading: false }); // Always set loading to false at the end
        }
    },

    // Add a new department
    addDepartment: async (data: CreateDepartment) => {
        set({ loading: true, error: null });
        try {
            const response = await api.post<Department>('/v1/departments', data);
            set((state) => ({
                departments: [...state.departments, response.data],
                loading: false,
            }));
            return true;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to add department', loading: false });
            return false;
        }
    },

    // Update a department by ID
    updateDepartment: async (id: number, data: Partial<CreateDepartment>) => {
        set({ loading: true, error: null });
        try {
            const response = await api.put<Department>(`/v1/departments/${id}`, data);
            set((state) => ({
                departments: state.departments.map((department) =>
                    department.id === id ? response.data : department
                ),
                loading: false,
            }));
            return true;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to update department', loading: false });
            return false;
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
            return true;
        } catch (err) {
            console.error(err);
            set({ error: 'Failed to delete department', loading: false });
            return false;
        }
    },
}));
