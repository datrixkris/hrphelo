"use client";

import React from "react";
import { progressColor } from "../../projects/components/ProgressBar";
import { Icon } from "@iconify/react/dist/iconify.js";
// import OnboardingNewHireChecklist from "./OnboardingNewHireChecklist";
import Link from "next/link";
import useGetNewHire, { getNewHireProgress } from "@/app/hooks/useGetNewHire";
import { StaffData } from "../../(employee)/staff/types";
import dayjs from "dayjs";

const NewHireTable = () => {
  //   const [openModal, setOpenModal] = useState(false);
  const { newHires } = useGetNewHire();
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
            {newHires.map((staff) => {
              return <NewHireTableRow key={staff.id} staff={staff} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewHireTable;

const NewHireTableRow = ({ staff }: { staff: StaffData }) => {
  return (
    <tr>
      <th>{staff.name}</th>
      <td>{staff.department?.name}</td>
      <td>{dayjs(staff?.hiring_date).format("MMM D, YYYY")}</td>
      <td>
        <p
          className={`${"text-" + progressColor(getNewHireProgress(staff))} font-bold`}
        >
          {getNewHireProgress(staff)}%
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
  );
};
