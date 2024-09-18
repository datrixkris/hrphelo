import axios from "axios";
import { LoginData } from "../schemas";

export const submitLoginForm = async (formData: LoginData) => {
  try {
    const response = await axios.post("https://hrphelo.wavebeep.com/v1/auth/login", formData);
    console.log("response:", response);

    if (response.data.token) {
      // Store the token using Zustand (assuming you have a store setup)
      // import { useStore } from "@/app/store"; 
      // const setToken = useStore((state) => state.setToken);
      // setToken(response.data.token);

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
