"use client";
import { verifyChangePasswordOtp } from "@/app/actions/auth";
import Button from "@/app/components/Button";
import Logo from "@/app/components/Logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePasswordOtpPage = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      // Join the OTP array into a single string
      const otpData = otp.join("");

      if (otpData.length !== 4) {
        setMessage("Please enter a valid 4-digit OTP");
        return;
      }

      const response = await verifyChangePasswordOtp(otpData);

      if (response.success) {
        toast.success(response.message || "Password changed successfully");
        // Redirect to dashboard after successful password change
        router.push("/");
      } else {
        setMessage(response.message || "Failed to verify OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("There was an error processing your OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Check if password data exists in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("changePasswordData");
    if (!storedData) {
      toast.error("No password change data found. Please try again.");
      router.push("/auth/change-password");
    }
  }, [router]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-base-200">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-7 flex w-full max-w-xs justify-center text-center">
          <Link href="/auth/login">
            <Logo width={200} height={150} />
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md rounded-lg bg-base-300 px-8 py-10 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Enter OTP</h1>
        <p className="mb-6 text-center text-gray-400 dark:text-gray-400">
          Code sent to your email to verify password change
        </p>
        {message && (
          <p className="bg-red-200 p-2 text-center text-sm text-red-700">
            {message}
          </p>
        )}

        <div className="my-6 grid grid-cols-4 place-items-center gap-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              autoComplete="off"
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              className="flex aspect-square w-14 cursor-text items-center justify-center rounded-lg bg-base-100 text-center text-2xl text-gray-400 dark:text-gray-400"
            />
          ))}
        </div>

        <Button
          className="inline-flex w-full justify-center rounded-md px-4 py-2 text-lg font-medium text-white"
          onClick={() => onSubmit()}
          disabled={loading}
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="h-7 w-7" />
          ) : (
            "Verify & Change Password"
          )}
        </Button>

        <div className="mt-4 text-center">
          <button
            onClick={() => router.push("/auth/change-password")}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            ← Back to Change Password
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordOtpPage;
