import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <section className="py-10 bg-base-100 sm:py-16 lg:py-24 h-screen">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-full flex justify-center text-center mb-5">
            <Image
              src="/images/hrphelo.png"
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
                  Reset new password{" "}
                </h2>
              </div>
              <form action="#" method="POST">
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      Password{" "}
                    </label>
                    <div className="input rounded mt-2 input-bordered flex items-center gap-2">
                      <Icon
                        icon="mdi:password"
                        className="h-4 w-4 opacity-70"
                      />

                      <input
                        type="password"
                        className="grow"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <div className="input  rounded mt-2 input-bordered flex items-center gap-2">
                      <Icon
                        icon="mdi:password"
                        className="h-4 w-4 opacity-70"
                      />

                      <input
                        type="password"
                        className="grow"
                        placeholder="  Confirm Password"
                      />
                    </div>
                  </div>

                  <div>
                    <Button className="inline-flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white">
                      Reset password{" "}
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
