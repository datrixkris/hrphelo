import { create } from "zustand";
import { User } from "../types/user-types";
import { api } from "../axiosApi/api";
import dayjs from "dayjs";
import { toast } from "react-toastify";

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  fetchUserData: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  logout: () => void;
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
  accessToken: getLocalStorage("accessToken"),
  refreshToken: getLocalStorage("refreshToken"),
  user: getLocalStorage("userData"),
  isAuthenticated:
    !!getLocalStorage("accessToken") && !!getLocalStorage("userData"),

  fetchUserData: async () => {
    try {
      const response = await api.get("/v1/user");
      const userData = response.data;

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Update isAuthenticated based on user and access token
      const isAuthenticated =
        !!getLocalStorage("accessToken") &&
        // !dayjs(userData.nextPasswordResetDate).isBefore(dayjs());
        !!userData;

      set({ user: userData, isAuthenticated });
    } catch (err) {
      console.error("Error fetching user data:", err);
      // If fetch fails, clear cached data
      localStorage.removeItem("userData");
      set({ user: null, isAuthenticated: false });
    }
  },

  refreshUserData: async () => {
    try {
      const refreshToken = useAuthStore.getState().refreshToken;
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await api.post("/v1/auth/refresh-token", {
        refresh_token: refreshToken,
      });

      const newAccessToken = response.data.accessToken || response.data.token;
      if (!newAccessToken) {
        throw new Error("No access token received from refresh");
      }

      // Update localStorage first
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

      // Update store state
      useAuthStore.setState({
        accessToken: newAccessToken,
      });

      console.info("Access token refreshed:");

      // Fetch user with new access token
      const userResponse = await api.get("/v1/user");
      const user = userResponse.data;

      // Update isAuthenticated based on user and access token
      const isAuthenticated =
        !!newAccessToken &&
        !dayjs(user.nextPasswordResetDate).isBefore(dayjs());

      // Store updated user data in localStorage
      localStorage.setItem("userData", JSON.stringify(user));

      useAuthStore.setState({
        user,
        isAuthenticated,
      });
    } catch (err) {
      console.error("Error refreshing user data:", err);
      // If refresh fails, logout the user
      // useAuthStore.getState().logout();
      toast.error("Unable to refresh user data");
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      refreshToken: null,
    });
    // redirect to login page
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  },

  resetData: {
    password: "",
    confirmPassword: "",
    otp: "",
  },
}));
