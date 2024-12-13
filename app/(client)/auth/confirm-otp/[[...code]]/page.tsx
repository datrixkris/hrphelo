"use client";
import {
  requestResetOtp,
  requestOtp,
  submitOtpForm,
  storeResetOtp,
} from "@/app/actions/auth";
import Button from "@/app/components/Button";
import Logo from "@/app/components/Logo";
import { useAuthStore } from "@/app/stores/auth-store";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

const Page = ({ params }: { params: { code: string } }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [canRequestOtp, setCanRequestOtp] = useState(true);
  const [timer, setTimer] = useState(0);
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
    setLoading(true); // Start loading state
    try {
      // Join the OTP array into a single string
      const otpData = otp.join("");

      let response;

      if (params.code) {
        // If there's a code in params, store reset OTP
        response = await storeResetOtp(otpData);
      } else {
        // Otherwise, submit the OTP form
        response = await submitOtpForm(otpData);
      }

      // Handle routing or message from the response
      if (response?.route) {
        router.push(response.route);
      } else if (response?.message) {
        setMessage(response.message);
      } else {
        // Handle a case where the response doesn't contain expected data
        setMessage("Unexpected response format");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      // Optionally, set an error message in the UI for the user
      setMessage("There was an error processing your OTP.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleOtpRequest = async () => {
    try {
      const response = await requestOtp();
      setMessage(response.message);
      setCanRequestOtp(false); // Disable the request button
      setTimer(30); // Set the timer to 30 seconds
    } catch (error) {
      console.error("Error requesting OTP:", error);
    }
  };

  useEffect(() => {
    // Countdown timer logic
    let countdownInterval: NodeJS.Timeout | null = null;
    if (timer > 0) {
      countdownInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !canRequestOtp) {
      setCanRequestOtp(true); // Re-enable the request button after 30 seconds
    }

    return () => {
      if (countdownInterval) clearInterval(countdownInterval);
    };
  }, [timer, canRequestOtp]);

  useLayoutEffect(() => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (params.code) {
      requestResetOtp(params.code);
    }

    if (isAuthenticated) {
      router.push("/");
    }
  }, [router]);

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-base-200">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-7 flex w-full justify-center text-center">
          <Logo width={200} height={150} />
        </div>
      </div>
      <div className="w-full max-w-md rounded-lg bg-base-300 px-8 py-10 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Enter OTP</h1>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-200">
          Code sent to your email
        </p>
        {message && (
          <p className="bg-red-200 p-2 text-center text-sm text-red-700">
            {message}
          </p>
        )}

        <div className="my-2 grid grid-cols-4 gap-x-4">
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
              className="flex aspect-square w-14 cursor-text items-center justify-center rounded-lg bg-base-100 text-center text-2xl text-gray-700 dark:text-gray-100"
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-200">
            Didn&apos;t receive code?
          </p>
          <button
            onClick={handleOtpRequest}
            disabled={!canRequestOtp} // Disable the button if OTP can't be requested yet
            className={`rounded px-3 py-2 text-center text-sm font-medium ${canRequestOtp ? "text-hr-yellow-light hover:bg-hr-yellow" : "text-gray-400"}`}
          >
            {canRequestOtp ? "Request Again" : `Request in ${timer}s`}
          </button>
        </div>
        <Button
          className="inline-flex w-full justify-center rounded-md px-4 py-2 text-lg font-medium text-white"
          onClick={() => onSubmit()}
          disabled={loading}
        >
          {loading ? (
            <Icon icon="line-md:loading-loop" className="h-7 w-7" />
          ) : (
            "Verify"
          )}
        </Button>
      </div>
    </section>
  );
};

export default Page;
