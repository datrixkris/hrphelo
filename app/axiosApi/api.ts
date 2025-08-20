import axios from "axios";
import { useAuthStore } from "../stores/auth-store";

// export const baseURL = "https://hrphelo.wavebeep.com/";
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const api = axios.create({
  baseURL,
  // timeout: 50000,
  headers: {},
});

// Helper function to check if we're on an auth page
const isAuthPage = (): boolean => {
  if (typeof window === "undefined") return false;

  const pathname = window.location.pathname;
  return pathname.startsWith("/auth/login");
};

// Helper function to check if the request is for auth-related endpoints
const isAuthEndpoint = (url: string): boolean => {
  return url.includes("/v1/auth/login");
};

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log("Api request intercepted");
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
// api.interceptors.response.use(
//   (response) => {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log("Api response intercepted");
//     return response;
//   },
//   async (error) => {
//     // if (error.response?.status === 401) {
//     //   if (typeof window !== "undefined") {
//     //     localStorage.removeItem("accessToken");
//     //     console.log(
//     //       "lksjdlfkjslkjdlkfjslkjldkjfflskjlkdjfflksjlkjdlkfjslkjdfs",
//     //     );
//     //   }
//     // }

//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     const originalRequest = error.config;
//     originalRequest._retry = originalRequest._retry || false;

//     console.log(originalRequest);
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         console.log(useAuthStore.getState().refreshToken);
//         const response = await api.post("/v1/auth/refresh-token", {
//           refresh_token: useAuthStore.getState().refreshToken,
//         });
//         console.log(response);
//         useAuthStore.setState({ accessToken: response.data.token });
//         return api(originalRequest);
//       } catch (err) {
//         console.log(err);
//         // logout()
//         useAuthStore.getState().logout();
//       }
//     }
//     console.log("Api response error");
//     // useAuthStore.getState().logout();
//     return Promise.reject(error);
//   },
// );

api.interceptors.response.use(
  (response) => {
    // Handle successful responses
    // console.log("Api response intercepted");
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Initialize `_retry` if not set
    originalRequest._retry = originalRequest._retry || false;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Prevent retrying the refresh-token API itself
      if (originalRequest.url.includes("/v1/auth/refresh-token")) {
        return Promise.reject(error);
      }

      // Skip logout for auth pages and auth endpoints
      if (isAuthPage() || isAuthEndpoint(originalRequest.url)) {
        console.log(
          "Skipping logout for auth page/endpoint:",
          originalRequest.url,
        );
        return Promise.reject(error);
      }

      try {
        // Retrieve refreshToken and other methods from the auth store
        const { refreshToken, logout } = useAuthStore.getState();

        if (!refreshToken) {
          logout();
          return Promise.reject(error);
        }

        // Attempt to refresh the token
        const response = await api.post("/v1/auth/refresh-token", {
          refresh_token: refreshToken,
        });

        // Update the accessToken in the auth store and localStorage
        const newToken = response.data.accessToken || response.data.token;
        if (!newToken) {
          throw new Error("No access token received from refresh");
        }

        useAuthStore.setState({ accessToken: newToken });

        // Update localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", JSON.stringify(newToken));
        }

        // Optionally refresh user data to ensure it's up to date
        try {
          const userResponse = await api.get("/v1/user");
          const userData = userResponse.data;
          localStorage.setItem("userData", JSON.stringify(userData));
          useAuthStore.setState({ user: userData });
        } catch (userError) {
          console.warn("Failed to refresh user data:", userError);
          // Don't fail the token refresh if user data refresh fails
        }

        // Retry the original request with the new token
        originalRequest.headers.Authorization = newToken;
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    // console.error("Api response error:", error);
    return Promise.reject(error);
  },
);
