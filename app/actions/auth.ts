// import axios from "axios";
import { api } from "../axiosApi/api";
import { LoginData } from "../schemas";
import { useAuthStore } from "../stores/auth-store";

export const submitLoginForm = async (formData: LoginData) => {
  try {
    const response = await api.post("/v1/auth/login", formData);
    console.log("response:", response);

    if (response.data.token) {
      // set access token
      useAuthStore.setState({accessToken: response.data.token})
      // store in localhost
      localStorage.setItem('accessToken', JSON.stringify(response.data.token))
      // fetch user data on successful login
      const fetchUserData = useAuthStore.getState().fetchUserData
      fetchUserData()
      

      return response.data;
    } else if (response.data.status === false) { 
      console.error("Login not successful:", response.data.message);
      return { error: "Login not successful" }; 
    }

  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Error logging in" }; 
  }
};
