import { create } from "zustand";
import { User } from "../types/user-types";
import { api } from "../axiosApi/api";

interface AuthStore {
    accessToken: string | null;
    user: User | null;
    isAuthenticated: boolean;
    fetchUserData: () => Promise<void>;
    resetData: {
        password: string;
        confirmPassword: string;
        otp: string;
    } | null;
}

const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
};

export const useAuthStore = create<AuthStore>((set) => ({
    accessToken: getLocalStorage('accessToken'),
    user: null,
    isAuthenticated: false, // Initialize to false

    fetchUserData: async () => {
        try {
            const response = await api.get('/v1/user');
            set({ user: response.data });
            // Update isAuthenticated based on user and access token
            const isAuthenticated = !!getLocalStorage('accessToken') && response.data.isPasswordReset === true;

            set({ isAuthenticated });

          

        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    },

    resetData: {
        password: '',
        confirmPassword: '',
        otp: ''
    }
}));
