"use client";
import Button from "@/app/components/Button";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

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

  return (
    <section className="flex h-screen w-full flex-col items-center justify-center bg-base-100">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-7 flex w-full justify-center text-center">
          <Image
            src="/images/HRphelo.png"
            alt="logo"
            width="200"
            height="150"
          />
        </div>
      </div>
      <div className="w-full max-w-md rounded-lg bg-base-300 px-8 py-10 shadow-md">
        <h1 className="mb-4 text-center text-2xl font-semibold">Enter OTP</h1>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-200">
          Code sent to your email
        </p>
        <div className="my-2 grid grid-cols-4 gap-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              className="flex aspect-square w-14 cursor-text items-center justify-center rounded-lg bg-base-100 text-center text-2xl text-gray-700  dark:text-gray-100"
            />
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-200">
            Didn't receive code?
          </p>
          <button className="rounded px-3 py-2 text-center text-sm font-medium text-hr-yellow-light hover:bg-hr-yellow">
            Request Again
          </button>
        </div>
        <Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-lg font-medium text-white">
          Verify
        </Button>
      </div>
    </section>
  );
};

export default Page;
