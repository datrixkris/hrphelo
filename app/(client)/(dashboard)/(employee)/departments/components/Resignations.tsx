"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import ResignationsChecklist from "./ResignationsChecklist";
// import { StaffData } from "../../staff/types";
import { useResignationsStore } from "../../../resignations/resignations-store";
import { Resignation } from "../../../resignations/types";
import TableSkeleton from "@/app/components/TableSkeleton";
import dayjs from "dayjs";

const Resignations = () => {
  const { loading, fetchResignationsWithQuery } = useResignationsStore();
  const [resignations, setResignations] = useState<Resignation[]>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchResignationsWithQuery(true, { initiated: true });
      setResignations(data);
    };
    console.log("shittttttt");

    fetchData();
  }, []);

  return (
    <div className="space-y-5 p-4">
      {/* description  */}

      <p className="text-sm">Manage clearance of resigning staff here</p>

      {/* table */}
      <div className="overflow-x-auto">
        {loading ? (
          <TableSkeleton />
        ) : (
          <div className="">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Staff Name</th>
                  <th>Reason</th>
                  <th>Notice Date</th>
                  <th>Resignation Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {resignations?.map((resignation) => (
                  <TableRow key={resignation.id} resignation={resignation} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resignations;

const TableRow = ({ resignation }: { resignation: Resignation }) => {
  const [openModal, setOpenModal] = useState(false);
  //   const [staff] = useState<StaffData | null>(null);
  return (
    <tr>
      <th>{resignation.staff.name}</th>
      <td>{resignation.reason}</td>
      <td>{dayjs(resignation?.createdAt).format("MMM D, YYYY")}</td>
      <td>{dayjs(resignation?.resignation_date).format("MMM D, YYYY")}</td>
      <td>
        {" "}
        <div
          className="inline-block cursor-pointer text-nowrap rounded bg-success px-2 py-1 text-sm font-semibold text-white"
          onClick={() => setOpenModal(true)}
        >
          <Icon
            icon="heroicons:eye-16-solid"
            className="inline-block text-lg"
          />
          <span className="relative ml-0.5 text-xs">Details</span>
        </div>
      </td>

      {/* modal */}
      {openModal && (
        <td>
          <ResignationsChecklist
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            resignation={resignation}
          />
        </td>
      )}
    </tr>
  );
};
