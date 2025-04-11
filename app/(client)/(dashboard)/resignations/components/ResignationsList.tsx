"use client";

import TableSkeleton from "@/app/components/TableSkeleton";
import React, { useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useResignationsStore } from "../resignations-store";
import { Resignation } from "../types";

const ResignationsList = () => {
  const { loading, resignations, fetchResignations } = useResignationsStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchResignations();
    };

    fetchData();
  }, []);

  return (
    <div className="rounded bg-base-100 p-4">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Resignation List</h2>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton />
        ) : (
          <div>
            <table className="table table-sm">
              {/* head */}
              <thead>
                <tr>
                  <th>Resigning Staff</th>
                  <th>Department</th>
                  <th>Reason</th>
                  <th>Notice Date</th>
                  <th>Resignation Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resignations.map((resignation) => {
                  return (
                    <ResignationRow
                      key={resignation.id}
                      resignation={resignation}
                    />
                  );
                })}
              </tbody>
            </table>
            {resignations.length === 0 && (
              <div className="mt-4 text-center text-gray-400">
                No data to display
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResignationsList;

const ResignationRow = ({ resignation }: { resignation: Resignation }) => {
  return (
    <tr>
      <th>{resignation.staff.name}</th>
      <td>{resignation.staff.department?.name}</td>
      <td>{resignation.reason}</td>
      <td>{dayjs(resignation?.createdAt).format("MMM D, YYYY")}</td>
      <td>{dayjs(resignation?.resignation_date).format("MMM D, YYYY")}</td>
      <td>
        <Link href={`/onboarding/${resignation.id}/onboarding-details`}>
          <div
            className="inline-block cursor-pointer text-nowrap rounded bg-success px-2 py-1 text-sm font-semibold text-white"
            //   onClick={() => setOpenModal(true)}
          >
            <Icon
              icon="heroicons:eye-16-solid"
              className="inline-block text-lg"
            />
            <span className="relative ml-0.5 text-xs">Initiate process</span>
          </div>
        </Link>
      </td>
    </tr>
  );
};
