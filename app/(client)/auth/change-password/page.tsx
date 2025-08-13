"use client";
import { changePassword } from "@/app/actions/auth";
import Button from "@/app/components/Button";
import Logo from "@/app/components/Logo";
import { ResetFormData, resetSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    setLoading(true);
    try {
      const response = await changePassword(data);

      if (response.success) {
        if (response.route) {
          // Redirect to OTP page
          router.push(response.route);
        } else {
          toast.success(
            response.message || "Password change initiated successfully",
          );
        }
      } else {
        toast.error(response.message || "Failed to initiate password change");
      }
    } catch (error) {
      console.error("Error during password change:", error);
      toast.error("An error occurred while initiating password change");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-base-200 py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex w-full max-w-xs justify-center text-center">
            <Link href="/auth/login">
              <Logo width={200} height={150} />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-md md:mt-16">
          <div className="overflow-hidden rounded-md bg-base-300 shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold leading-tight">
                  Change Password
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Please enter your new password below
                </p>
                <div className="mt-4 rounded-md border border-yellow-200 bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Icon
                        icon="mdi:alert-circle"
                        className="h-5 w-5 text-yellow-400"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-800">
                        <strong>Password Expired:</strong> Your password has
                        expired and must be changed to continue.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="password" className="text-base font-medium">
                      New Password
                    </label>
                    <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                      <Icon
                        icon="mdi:password"
                        className="h-4 w-4 opacity-70"
                      />
                      <input
                        {...register("password")}
                        type={passwordVisible ? "text" : "password"}
                        className="grow"
                        placeholder="Enter new password"
                        id="password"
                      />
                      <Icon
                        icon={passwordVisible ? "mdi:eye-off" : "mdi:eye"}
                        className="cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="text-base font-medium"
                    >
                      Confirm New Password
                    </label>
                    <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                      <Icon
                        icon="mdi:password"
                        className="h-4 w-4 opacity-70"
                      />
                      <input
                        {...register("confirmPassword")}
                        type={confirmPasswordVisible ? "text" : "password"}
                        className="grow"
                        placeholder="Confirm new password"
                        id="confirmPassword"
                      />
                      <Icon
                        icon={
                          confirmPasswordVisible ? "mdi:eye-off" : "mdi:eye"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button
                      buttonType="submit"
                      className="inline-flex w-full items-center justify-center px-4 py-3 text-base font-semibold text-white"
                      disabled={loading}
                    >
                      {loading ? (
                        <Icon icon="line-md:loading-loop" className="h-7 w-7" />
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangePasswordPage;
