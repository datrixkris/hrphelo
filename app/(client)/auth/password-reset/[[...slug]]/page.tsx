"use client";
import { submitForgotPasswordForm, submitSetForm } from "@/app/actions/auth";
import Button from "@/app/components/Button";
import Logo from "@/app/components/Logo";
import { ResetFormData, resetSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = ({ params }: { params: { slug: string } }) => {
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
      let response;

      if (params.slug) {
        console.log("Processing password reset");

        response = await submitForgotPasswordForm(data);
      } else {
        response = await submitSetForm(data);
      }

      if (response?.route) {
        router.push(response.route);
        console.log("Redirecting to:", response.route);
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-screen bg-base-200 py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 flex w-full justify-center text-center">
            <Logo width={200} height={150} />
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-md md:mt-16">
          <div className="overflow-hidden rounded-md bg-base-300 shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <div className="mb-10 text-center">
                {" "}
                <h2 className="text-2xl font-bold leading-tight">
                  Reset new password{" "}
                </h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-5">
                  <div>
                    <label htmlFor="" className="text-base font-medium">
                      Password{" "}
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
                        placeholder="Password"
                      />
                         <Icon
                        icon={passwordVisible ? "mdi:eye-off" : "mdi:eye"}
                        className="cursor-pointer"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="text-base font-medium">
                      Confirm Password
                    </label>
                    <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                      <Icon
                        icon="mdi:password"
                        className="h-4 w-4 opacity-70"
                      />

                      <input
                        type={confirmPasswordVisible ? "text" : "password"} 
                        {...register("confirmPassword")}
                        className="grow"
                        placeholder="  Confirm Password"
                      />
                      <Icon
                        icon={confirmPasswordVisible ? "mdi:eye-off" : "mdi:eye"}
                        className="cursor-pointer"
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Button className="inline-flex w-full items-center justify-center px-4 py-3 text-base font-semibold text-white">
                      {loading ? (
                        <Icon icon="line-md:loading-loop" className="h-7 w-7" />
                      ) : (
                        "continue"
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

export default Page;
