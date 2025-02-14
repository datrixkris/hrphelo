import dayjs from "dayjs";
import React from "react";
import ProgressBar from "../../projects/components/ProgressBar";

const NewHireInformation = () => {
  return (
    <div className="rounded bg-base-100 p-5">
      <div className="flex flex-col items-start justify-center gap-4 text-center sm:flex-row sm:justify-start sm:text-left">
        {/* image */}
        <div className="avatar mx-auto shrink-0 sm:mx-0">
          <div className={`w-32 rounded-full bg-base-300 lg:w-36`}>
            {/* <img src={staffDetails?.image} /> */}
          </div>
        </div>

        {/* staff Details */}
        <div className="mx-auto sm:mx-0">
          <p className="text-2xl font-bold">Christian Amoakohene</p>
          <p className="cursor-pointer text-hr-yellow transition-colors hover:text-hr-yellow-dark">
            IT department
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            {[{ name: "Front-End", id: 1 }].map((designation, index, array) => {
              return (
                <span key={designation.id}>
                  {designation.name}
                  {index !== array.length - 1 ? " | " : ""}
                </span>
              );
            })}
          </p>

          <p className="mt-4 font-semibold">Staff ID: STF-U</p>
          <p className="mb-1 text-sm text-neutral-400">
            Date Joined:{" "}
            {true ? dayjs("2025-03-03").format("MMM D, YYYY") : "N/A"}
          </p>
        </div>
      </div>

      {/* Progress */}
      {/* progress bar */}
      <div className="mt-5 flex items-center gap-3">
        <p className="text-nowrap text-sm font-bold">Onboarding Progress</p>
        <ProgressBar progress={80} />
        <p className="text-sm font-bold">20%</p>
      </div>
    </div>
  );
};

export default NewHireInformation;
