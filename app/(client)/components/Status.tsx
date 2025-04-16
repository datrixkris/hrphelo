import React from "react";
import { LeaveRecord } from "../(dashboard)/(leaves)/types";
import { Icon } from "@iconify/react/dist/iconify.js";

interface StatusProp {
  leave: LeaveRecord;
}

export const Status = ({ leave }: StatusProp) => {
  return (
    <div>
      <div
        className={`inline-flex min-w-[103px] items-center justify-center rounded-[50px] border p-1 text-center ${
          leave.status === "pending"
            ? "border-yellow-500 bg-yellow-100 text-yellow-500"
            : leave.status === "approved"
              ? "border-green-600 bg-green-100 text-green-600"
              : "border-red-600 bg-red-100 text-red-600"
        }`}
      >
        <Icon
          icon="fa6-regular:circle-dot"
          className={`pr-1 ${
            leave.status === "pending"
              ? "text-yellow-500"
              : leave.status === "approved"
                ? "text-green-600"
                : "text-red-600"
          }`}
        />
        {leave.status}
      </div>
    </div>
  );
};
