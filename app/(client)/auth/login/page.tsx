"use client";
import { submitLoginForm } from "@/app/actions/auth";
import Button from "@/app/components/Button";
import Logo from "@/app/components/Logo";
import { LoginData, loginSchema } from "@/app/schemas";
import { useAuthStore } from "@/app/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const router = useRouter();

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
      const respond = await submitLoginForm(data);
      if (respond?.route) {
        router.push(respond.route);
      }
      if (respond.error) {
        setMessage("Email or Password Incorrect");
      }
    } catch (error) {
      setMessage("Email or Password Incorrect");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    const fetchUser = async () => {
      await useAuthStore.getState().fetchUserData();
      const isAuthenticated = useAuthStore.getState().isAuthenticated;
      // const userData = useAuthStore.getState().user;
      if (isAuthenticated) {
        router.push("/");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <section className="bg-base-100">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side */}
        <div className="relative hidden h-screen items-end bg-base-100 px-4 pb-10 pt-60 sm:px-6 sm:pb-16 lg:flex lg:justify-center lg:px-8 lg:pb-24">
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
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Streamlined HR Management
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Real-Time Insights & Reporting
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Employee Self-Service Portal
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    Secure & Compliant
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex h-screen items-center justify-center bg-base-200 px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mx-auto mb-5 flex w-full max-w-xs justify-center text-center">
              <Logo width={200} height={150} />
            </div>
            <h2 className="text-center text-3xl font-bold leading-tight sm:text-4xl">
              Welcome to HR Phelo
            </h2>
            {message && (
              <p className="bg-red-200 p-2 text-center text-sm text-red-700">
                {message}
              </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium">
                    Email
                  </label>
                  <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                    <input
                      {...register("email")}
                      className="grow"
                      placeholder="Email"
                    />
                  </div>{" "}
                  {errors.email && (
                    <p className="mt-1 text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium">
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
