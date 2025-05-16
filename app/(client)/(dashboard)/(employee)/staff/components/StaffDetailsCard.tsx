"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import EditStaffForm from "./EditStaffForm";
import { StaffDetail } from "../types";
import dayjs from "dayjs";
import Link from "next/link";
import { useHasPermission } from "@/app/hooks/permissions";
import { useAuthStore } from "@/app/stores/auth-store";

interface StaffDetailsProps {
  staffDetails: StaffDetail | null;
  refreshData: () => Promise<void>;
  defaultAccount?: boolean; //this is to determine the company owner. and hide sometins
}

const StaffDetailsCard = ({
  staffDetails,
  refreshData,
  defaultAccount,
}: StaffDetailsProps) => {
  const [openModal, setOpenModal] = useState(false);
  const hasEditPermission = useHasPermission("modify", "Staff");
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <div className="relative">
        <div className="flex flex-col gap-3 divide-y divide-dashed divide-base-300 rounded border border-base-300 bg-base-100 p-5 md:flex-row md:divide-x md:divide-y-0">
          <div className="pb-5 md:w-1/2 md:pb-0 lg:w-[45%]">
            {/* image and staff details */}
            <div className="flex flex-col items-start justify-center gap-4 text-center sm:flex-row sm:justify-start sm:text-left">
              {/* image */}
              <div className="avatar mx-auto shrink-0 sm:mx-0">
                <div
                  className={`rounded-full ${defaultAccount ? "w-24 lg:w-28" : "w-32 lg:w-36"}`}
                >
                  <img src={staffDetails?.image} />
                </div>
              </div>

              {/* staff Details */}
              <div className="mx-auto sm:mx-0">
                <p className="text-2xl font-bold">{staffDetails?.name}</p>
                <p className="cursor-pointer text-hr-yellow transition-colors hover:text-hr-yellow-dark">
                  {staffDetails?.department?.name}
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  {staffDetails?.designations?.map(
                    (designation, index, array) => {
                      return (
                        <span key={designation.id}>
                          {designation.name}
                          {index !== array.length - 1 ? " | " : ""}
                        </span>
                      );
                    },
                  )}
                </p>

                <p className="mt-4 font-semibold">
                  Staff ID: {staffDetails?.staffId}{" "}
                </p>
                <p className="mb-1 text-sm text-neutral-400">
                  Date Joined:{" "}
                  {staffDetails?.hiring_date
                    ? dayjs(staffDetails?.hiring_date).format("MMM D, YYYY")
                    : "N/A"}
                </p>
                <p className="text-sm text-error">
                  {defaultAccount && "Default account"}
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 md:w-1/2 md:py-0 lg:w-[55%]">
            <table className="text-[15px]">
              <tbody>
                {/* phone */}
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">Phone:</td>
                  <td className="text-neutral-400">
                    {staffDetails?.contact ? staffDetails?.contact : "N/A"}
                  </td>
                </tr>
                {/* Email */}
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">Email:</td>
                  <td className="text-neutral-400">
                    {staffDetails?.email ? staffDetails?.email : "N/A"}
                  </td>
                </tr>
                {/* Birthday */}
                {!defaultAccount && (
                  <tr>
                    <td className="py-2 pr-3 font-semibold lg:w-32">
                      Birthday:
                    </td>
                    <td className="text-neutral-400">
                      {staffDetails?.date_of_birth
                        ? dayjs(staffDetails?.date_of_birth).format(
                            "MMM D, YYYY",
                          )
                        : "N/A"}
                    </td>
                  </tr>
                )}
                {/* Address */}
                {/* {!defaultAccount && (
                <tr>
                  <td className="py-2 pr-3 font-semibold lg:w-32">Address:</td>
                  <td className="text-neutral-400"> N/A </td>
                </tr>
              )} */}
                {/* Gender */}
                {!defaultAccount && (
                  <tr>
                    <td className="py-2 pr-3 font-semibold lg:w-32">Gender:</td>
                    <td className="text-neutral-400">
                      {staffDetails?.gender ? staffDetails?.gender : "N/A"}
                    </td>
                  </tr>
                )}
                {/* Supervisor */}
                {!defaultAccount && (
                  <tr>
                    <td className="py-2 pr-3 font-semibold lg:w-32">
                      Supervisor:
                    </td>
                    <td className="">
                      {staffDetails?.supervisorId ? (
                        <div className="flex cursor-pointer items-center gap-2 text-hr-yellow transition-colors hover:text-hr-yellow-dark">
                          {/* <div className="avatar">
                      <div className="w-8 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div> */}
                          <Link href={`/staff/${staffDetails.supervisorId}`}>
                            {staffDetails?.supervisorId}
                          </Link>
                        </div>
                      ) : (
                        <p className="text-sm text-neutral-400">Not assigned</p>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* edit button */}
        {!defaultAccount && (
          <>
            {/* Check if user has permissions to edit or user is the staff */}
            {(hasEditPermission || user?.staff.id === staffDetails?.id) && (
              <div
                onClick={() => setOpenModal(true)}
                className="absolute right-5 top-5 flex size-10 cursor-pointer items-center justify-center rounded-full bg-hr-yellow text-black transition-colors hover:bg-hr-yellow-dark"
              >
                <Icon icon="heroicons:pencil" className="text-xl" />
              </div>
            )}
          </>
        )}
      </div>
      {openModal && (
        <EditStaffForm
          staffDetails={staffDetails}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          refreshData={refreshData}
        />
      )}
    </>
  );
};

export default StaffDetailsCard;
