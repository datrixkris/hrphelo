"use client";
import { requestPasswordResetLink } from "@/app/actions/auth";
import Button from "@/app/components/Button";
import Logo from "@/app/components/Logo";
import { useAuthStore } from "@/app/stores/auth-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await requestPasswordResetLink({ email: email });

      if (response?.message) {
        setMessage(response.message);
        setStatus(response.status);
      }
    } catch (error) {
      console.error("Error:", error);
      // setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        // Check if we have cached user data and tokens
        const isAuthenticated = useAuthStore.getState().isAuthenticated;

        if (!isAuthenticated) {
          // No cached data, try to fetch fresh data
          try {
            await useAuthStore.getState().fetchUserData();
            if (isMounted) {
              const updatedAuth = useAuthStore.getState().isAuthenticated;
              if (updatedAuth) {
                router.push("/");
              }
            }
          } catch (error) {
            console.error("Error checking authentication:", error);
            // If there's an error, clear the invalid tokens
            if (isMounted) {
              useAuthStore.getState().logout();
            }
          }
        } else {
          // Already authenticated, redirect
          if (isMounted) {
            router.push("/");
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []); // Remove router dependency to prevent infinite loops

  return (
    <section className="h-screen bg-base-200 py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 flex max-w-xs justify-center text-center">
            <Link href="/auth/login">
              <Logo width={200} height={150} />
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-8 max-w-md md:mt-16">
          <div className="overflow-hidden rounded-md bg-base-300 shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <div className="mb-5 text-center">
                <h2 className="text-2xl font-bold leading-tight">
                  Forgot your password?
                </h2>
                <p className="mt-2 text-sm leading-relaxed">
                  Please enter your email and we will send you an email with a
                  link to reset your password.
                </p>
              </div>

              {message && (
                <div>
                  {status ? (
                    <p className="mb-4 bg-green-200 p-2 text-center text-sm text-green-800">
                      {message}
                    </p>
                  ) : (
                    <p className="mb-4 bg-red-200 p-2 text-center text-sm text-red-800">
                      {message}
                    </p>
                  )}
                </div>
              )}
              <form onSubmit={onSubmit}>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      Email address
                    </label>
                    <div className="input input-bordered mt-2 flex items-center gap-2 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        type="email"
                        className="grow"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      className="inline-flex w-full items-center justify-center px-4 py-3 text-base font-semibold text-white"
                      disabled={loading}
                    >
                      {loading ? "Requesting..." : "Request for password reset"}
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
