"use client";
import { submitLoginForm } from "@/app/actions/auth";
import Button from "@/app/components/Button";
import { LoginData, loginSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    try {
      await submitLoginForm(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <section className="bg-base-300">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side */}
        <div className="relative flex h-screen items-end bg-gray-50 px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover object-top"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/4/girl-thinking.jpg"
              alt="hr phelo"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                One tool for all your <br className="hidden xl:block" />
                key HR functions.
              </h3>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex items-center justify-center bg-base-200 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-5 flex w-full justify-center text-center">
              <Image
                src="/images/hrphelo.png"
                alt="logo"
                width="200"
                height="150"
              />
            </div>
            <h2 className="text-center text-3xl font-bold leading-tight text-black sm:text-4xl dark:text-white">
              Welcome to HR Phelo
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                    <input
                      {...register("email")}
                      className="grow"
                      placeholder="Email"
                    />
                    {errors.email && (
                      <p className="text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>

                    <Link
                      href="/auth/forgot-password"
                      className="text-sm font-medium text-hr-yellow-light transition-all duration-200 hover:text-hr-yellow hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                    <input
                      {...register("password")}
                      type="password"
                      className="grow"
                      placeholder="Password"
                    />
                    {errors.password && (
                      <p className="text-red-500">{errors.password.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Button
                    disabled={loading}
                    className="inline-flex w-full items-center justify-center px-4 py-3 text-base font-semibold text-white"
                  >
                    {loading ? (
                      <Icon icon="line-md:loading-loop" className="h-7 w-7" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
