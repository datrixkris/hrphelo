import axios from "axios";
import { useAuthStore } from "../stores/auth-store";

const baseURL = "https://hrphelo.wavebeep.com/";

export const api = axios.create({
  baseURL,
  timeout: 50000,
  headers: {},
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = token;
    }
    console.log("I am going hahahhahahahha ");
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("i am heere");
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // const originalRequest = error.config
    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true

    //   try {
    //     const response = await api.get('/v1/auth/refresh-token')
    //     useAuthStore.setState({accessToken: response.data.accessToken})
    //     return api(originalRequest)
    //   } catch (err){
    //     console.log(err)
    //     // logout()
    //   }
    // }
    console.log("i am here too");
    return Promise.reject(error);
  },
);
