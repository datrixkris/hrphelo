import { create } from "zustand"
import { User } from "../types/user-types";
import { api } from "../axiosApi/api";

interface AuthStore {
    accessToken: string;
    user: User | null;
    fetchUserData: () => Promise<void>
}

// Helper function to load data from localStorage
const getLocalStorage = (key: string) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

export const useAuthStore = create<AuthStore>((set) => ({
    // state variables
    accessToken: getLocalStorage('accessToken'),
    user: null,

    // Actions
    fetchUserData: async() => {
        try {
            const response = await api.get('/v1/user')
            set({user: response.data})
        } catch (err) {
            console.error(err)
        }
    }
}))
