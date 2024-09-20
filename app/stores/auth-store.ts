import { create } from "zustand";
import { User } from "../types/user-types";
import { api } from "../axiosApi/api";

interface AuthStore {
    accessToken: string | null;
    user: User | null;
    fetchUserData: () => Promise<void>;
    resetData: {
        password: string;
        confirmPassword: string;
        otp: string;
    } | null;
}

// Helper function to load data from localStorage
const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
};

export const useAuthStore = create<AuthStore>((set) => ({
    // State variables
    accessToken: getLocalStorage('accessToken'),
    user: null,

    // Actions
    fetchUserData: async () => {
        try {
            const response = await api.get('/v1/user');
            set({ user: response.data });
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    },

    // Initialize resetData
    resetData: {
        password: '',
        confirmPassword: '',
        otp: ''
    }
}));
