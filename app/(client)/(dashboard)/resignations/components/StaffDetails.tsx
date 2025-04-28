import React from "react";
import { StaffDetail } from "../../(employee)/staff/types";
import dayjs from "dayjs";
import Button from "@/app/components/Button";
import { Resignation } from "../types";
import { useStaffStore } from "../../(employee)/staff/staff-store";
import { useRouter } from "next/navigation";

const StaffDetails = ({
  staff,
  resignation,
}: {
  staff: StaffDetail | null;
  resignation: Resignation | null;
}) => {
  const { loading, archiveStaff } = useStaffStore();
  const router = useRouter();

  async function archiveThisStaff(staffId: number | undefined) {
    if (staffId) {
      await archiveStaff(staffId);
      setTimeout(() => {
        // navigate
        router.push("/resignations");
      }, 4000);
    }
  }

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
          <p className="text-sm text-neutral-400">
            {staff?.designations?.map((designation, index, array) => {
              return (
                <span key={designation.id}>
                  {designation.name}
                  {index !== array.length - 1 ? " | " : ""}
                </span>
              );
            })}
          </p>

          {/* <p className="mt-4 font-semibold">Staff ID: {staff?.staffId}</p> */}
          <p className="mt-4 text-sm text-neutral-400">
            Date Joined:{" "}
            {staff?.hiring_date
              ? dayjs(staff.hiring_date).format("MMM D, YYYY")
              : "N/A"}
          </p>

          <p className="mb-1 mt-4 text-sm text-neutral-400">
            Resignation Date:{" "}
            {staff?.hiring_date
              ? dayjs(staff.hiring_date).format("MMM D, YYYY")
              : "N/A"}
          </p>
          <p className="text-sm text-neutral-400">
            Reason: {resignation?.reason}
          </p>
          {/* <p className="mb-1 font-semibold">Staff ID: {staff?.staffId}</p> */}
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
        <Button onClick={() => archiveThisStaff(staff?.id)}>Clear Staff</Button>
      </div>
    </div>
  );
};

export default StaffDetails;
