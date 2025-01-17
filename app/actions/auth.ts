// Import necessary modules and types
import { api } from "../axiosApi/api";
import {
  FirstResetData,
  LoginData,
  ResetData,
  ResetFormData,
} from "../schemas";
import { useAuthStore } from "../stores/auth-store";

// Submit login form
export const submitLoginForm = async (formData: LoginData) => {
  try {
    const response = await api.post("/v1/auth/login", formData);
    console.log("response:", response);

    if (response.data.token) {
      // Set access and refresh token in Zustand store
      useAuthStore.setState({ accessToken: response.data.token });
      useAuthStore.setState({ refreshToken: response.data.refreshToken });

      // Store tokens in localStorage
      localStorage.setItem("accessToken", JSON.stringify(response.data.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data.refreshToken),
      );

      // Fetch user data on successful login
      const userResponse = await api.get("/v1/user");
      useAuthStore.setState({ user: userResponse.data });

      // Check if it's a first-time user
      if (userResponse.data.isPasswordReset === false) {
        // Provide route to confirm OTP and reset password
        return { route: "/auth/password-reset" };
      }

      // Redirect to dashboard
      return { route: "/" };
    } else {
      console.error("Login not successful:", response.data.message);
      return { error: "Login not successful", route: "" };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return { error: "Error logging in" };
  }
};

// Submit form for setting new password and requesting OTP
export const submitSetForm = async (formData: ResetFormData) => {
  try {
    // Store form data in localStorage
    localStorage.setItem(
      "resetData",
      JSON.stringify({
        password: formData.password,
        confirm_password: formData.confirmPassword,
        otp: "", // OTP to be filled later
      }),
    );

    console.log("Password data set");

    // Request OTP for user
    await requestOtp();

    // Route to OTP confirmation
    return { route: "/auth/confirm-otp" };
  } catch (error) {
    console.error("Error submitting set form:", error);
    return { error: "Error submitting set form" };
  }
};

// Request OTP
export const requestOtp = async () => {
  try {
    const response = await api.get("/v1/auth/request/otp");
    if (response.data.status === true) {
      return { status: "success", message: response.data.message };
    } else {
      return { status: "fail", message: "Error sending OTP" };
    }
  } catch (error) {
    console.error("Error requesting OTP:", error);
    return { status: "fail", message: "Error sending OTP" };
  }
};

// Request password reset with the OTP
export const requestPasswordReset = async (data: FirstResetData) => {
  try {
    const response = await api.post("/v1/auth/set-password", data);
    if (response.data.status === false) {
      console.error("Error resetting password:", response.data.message);
      return { error: response.data.message };
    }
  } catch (error) {
    console.error("Error in requestPasswordReset:", error);
    return { error: "Error resetting password" };
  }
};

// Submit OTP form for verification for first-time users
export const submitOtpForm = async (otp: string) => {
  try {
    // Retrieve existing reset data from localStorage
    const storedResetData = localStorage.getItem("resetData");
    const resetData: FirstResetData | null = storedResetData
      ? JSON.parse(storedResetData)
      : null;

    if (resetData) {
      // Add the OTP to the reset data
      const updatedResetData = {
        ...resetData,
        otp: otp,
      };

      // Store the updated data in Zustand or localStorage
      localStorage.setItem("resetData", JSON.stringify(updatedResetData));

      // Call the function to reset the password for the first-time user
      const response = await requestPasswordReset(updatedResetData);

      if (response?.error) {
        console.log("otp submission:", response?.error);

        return { message: response.error };
      }
      return { route: "/" };
    } else {
      // Handle the case where resetData is null
      console.error("Reset data is not available");
      return { error: "Reset data not available" };
    }
  } catch (error) {
    console.error("Error submitting OTP:", error);
    return { error: "Error submitting OTP" };
  }
};

// Request password reset
export const requestPasswordResetLink = async (formData: { email: string }) => {
  try {
    const response = await api.post(
      "/v1/auth/request-password-reset",
      formData,
    );

    return {
      message: response.data.message,
      status: response.status,
    };
  } catch (error) {
    console.error("Error requesting password reset link:");

    // return {
    // //   message: error.response?.data?.message || "An error occurred. Please try again.",
    // //   status: error.response?.status || 500
    // };
  }
};

// Request OTP for verification during password reset
export const requestResetOtp = async (code: string) => {
  try {
    const response = await api.get(`/v1/auth/otp/${code}`);

    if (response.data.status === true) {
      // Store the reset token in localStorage (preserving other data)
      const existingData = JSON.parse(
        localStorage.getItem("resetPassData") || "{}",
      );
      localStorage.setItem(
        "resetPassData",
        JSON.stringify({
          ...existingData,
          reset_token: code, // Add reset_token or update if already present
        }),
      );

      return { status: "success", message: response.data.message };
    } else {
      return { status: "fail", message: "Error sending OTP" };
    }
  } catch (error) {
    console.error("Error requesting OTP:", error);
    return { status: "fail", message: "Error sending OTP" };
  }
};

// Store OTP in localStorage during reset
export const storeResetOtp = async (code: string) => {
  try {
    // Retrieve the existing resetPassData and merge the OTP with it
    const existingData = JSON.parse(
      localStorage.getItem("resetPassData") || "{}",
    );
    localStorage.setItem(
      "resetPassData",
      JSON.stringify({
        ...existingData,
        otp: code, // Add or update OTP in the resetPassData
      }),
    );

    // Return the route to the reset password page
    return { route: "/auth/password-reset/reset", message: "" };
  } catch (error) {
    console.error("Error storing OTP:", error);
    return { route: "", message: "Error storing OTP" };
  }
};

// Submit the form to set the new password
export const submitForgotPasswordForm = async (formData: ResetFormData) => {
  try {
    // Retrieve the existing reset data from localStorage

    const storedResetData = localStorage.getItem("resetPassData");
    const resetData: ResetData | null = storedResetData
      ? JSON.parse(storedResetData)
      : null;

    if (resetData && resetData.reset_token && resetData.otp) {
      // Prepare the updated reset data with password and confirm password
      const updatedResetData = {
        otp: resetData.otp,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      };

      // Send the data to the API to reset the password
      const response = await api.post(
        `/v1/auth/set-password/${resetData.reset_token}`,
        updatedResetData,
      );

      if (response.status === 200) {
        // Successfully set the password, route to the login page
        return { route: "/auth/login" };
      } else {
        return { error: "Failed to set password." };
      }
    } else {
      return { error: "Reset data is incomplete or expired." };
    }
  } catch (error) {
    console.error("Error submitting set form:", error);
    return { error: "Error submitting the password reset form." };
  }
};
