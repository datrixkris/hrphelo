"use client";

import React from "react";
import { progressColor } from "../../projects/components/ProgressBar";
import { Icon } from "@iconify/react/dist/iconify.js";
// import OnboardingNewHireChecklist from "./OnboardingNewHireChecklist";
import Link from "next/link";

const NewHireTable = () => {
  //   const [openModal, setOpenModal] = useState(false);
  return (
    <div className="rounded bg-base-100 p-4">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">New Hire Onboarding Progress</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-sm">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Date Hired</th>
              <th>Progress</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <td>Cy Ganderton</td>
              <td>IT</td>
              <td>14th Feb, 2025</td>
              <td>
                <p className={`${"text-" + progressColor(20)} font-bold`}>
                  20% completed
                </p>
              </td>
              <td>
                <Link href={`/onboarding/2/onboarding-details`}>
                  <div
                    className="inline-block cursor-pointer text-nowrap rounded bg-success px-2 py-1 text-sm font-semibold text-white"
                    //   onClick={() => setOpenModal(true)}
                  >
                    <Icon
                      icon="heroicons:eye-16-solid"
                      className="inline-block text-lg"
                    />
                    <span className="relative ml-0.5 text-xs">Details</span>
                  </div>
                </Link>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>Hart Hagerty</td>
              <td>Logistics</td>
              <td>14th Feb, 2025</td>
              <td>
                <p className={`${"text-" + progressColor(94)} font-bold`}>
                  94% completed
                </p>
              </td>
              <td>
                <Link href={`/onboarding/2/onboarding-details`}>
                  <div
                    className="inline-block cursor-pointer text-nowrap rounded bg-success px-2 py-1 text-sm font-semibold text-white"
                    //   onClick={() => setOpenModal(true)}
                  >
                    <Icon
                      icon="heroicons:eye-16-solid"
                      className="inline-block text-lg"
                    />
                    <span className="relative ml-0.5 text-xs">Details</span>
                  </div>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* staffchecklist
      {openModal && (
        <OnboardingNewHireChecklist
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      )} */}
    </div>
  );
};

export default NewHireTable;
