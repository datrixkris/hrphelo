import React from "react";
import { StaffDetail } from "../../(employee)/staff/types";
import dayjs from "dayjs";
import Button from "@/app/components/Button";

const StaffDetails = ({ staff }: { staff: StaffDetail | null }) => {
  return (
    <div className="rounded bg-base-100 p-5">
      <div className="flex flex-col items-start justify-center gap-4 text-center sm:flex-row sm:justify-start sm:text-left">
        {/* image */}
        <div className="avatar mx-auto shrink-0 sm:mx-0">
          <div className={`w-32 rounded-full bg-base-300 lg:w-36`}>
            <img src={staff?.image} />
          </div>
        </div>

        {/* staff Details */}
        <div className="mx-auto sm:mx-0">
          <p className="text-2xl font-bold">{staff?.name}</p>
          <p className="cursor-pointer text-hr-yellow transition-colors hover:text-hr-yellow-dark">
            {staff?.department?.name}
          </p>
          <p className="mt-1 text-sm text-neutral-400">
            {staff?.designations?.map((designation, index, array) => {
              return (
                <span key={designation.id}>
                  {designation.name}
                  {index !== array.length - 1 ? " | " : ""}
                </span>
              );
            })}
          </p>

          <p className="mt-4 font-semibold">Staff ID: {staff?.staffId}</p>
          <p className="mb-1 text-sm text-neutral-400">
            Date Joined:{" "}
            {staff?.hiring_date
              ? dayjs(staff.hiring_date).format("MMM D, YYYY")
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Progress */}
      {/* progress bar */}
      {/* <div className="mt-5 flex items-center gap-3">
    <p className="text-nowrap text-sm font-bold">Onboarding Progress</p>
    <ProgressBar progress={getNewHireProgress(staff as StaffData)} />
    <p className="text-sm font-bold">
      {getNewHireProgress(staff as StaffData)}%
    </p>
  </div> */}

      {/* clear staff */}
      <div className="mt-5 flex items-center justify-end gap-3">
        <Button>Clear Staff</Button>
      </div>
    </div>
  );
};

export default StaffDetails;
