import Button from "@/app/components/Button";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="py-10 bg-base-100 sm:py-16 lg:py-24 h-screen">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-full flex justify-center text-center mb-5">
            <Image
              src="/images/HRphelo.png"
              alt="logo"
              width="200"
              height="150"
            />
          </div>
        </div>

        <div className="relative max-w-md mx-auto mt-8 md:mt-16">
          <div className="overflow-hidden bg-base-300 rounded-md shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-7">
              <div className="text-center mb-10">
                {" "}
                <h2 className="text-2xl font-bold leading-tight text-black dark:text-white">
                  Forgot your password?{" "}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  please enter your email and we will send you an email with a
                  link to reset your your password.
                </p>
              </div>
              <form action="#" method="POST">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      Email address{" "}
                    </label>
                    <div className="input rounded mt-2 input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input type="text" className="grow" placeholder="Email" />
                    </div>
                  </div>

                  <div>
                    <Button className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white">
                      Request for password reset
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

export default page;
