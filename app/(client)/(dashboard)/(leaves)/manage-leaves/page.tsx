"use client";
// import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
// import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useLeavePolicyStore } from "../leave-settings/leavePolicy-store";
import { useLeaveStore } from "../leave-store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { ManageLeaveTable } from "./components/ManageLeaveTable";
import { LeaveRecord } from "../types";
// import { useAuthStore } from "@/app/stores/auth-store";

const Page = () => {
  const { loading, fetchLeavePolicies, leavePolicies } = useLeavePolicyStore();
  const { fetchLeaves, leaves } = useLeaveStore();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");
  // const { user } = useAuthStore();

  // total number of staff in the company
  const totalNumberOfStaff = 60;

  const [filteredLeaves, setFilteredLeaves] = useState<LeaveRecord[]>(); // Add state for filtered leaves

  const numberOfPendingLeave =
    leaves?.leaves.filter((leave) => leave.status === "pending").length || 0;
  const staffOnLeave =
    leaves?.leaves.filter(
      (leave) =>
        leave.staffId &&
        leave.status === "approved" &&
        dayjs(leave.end_date).isAfter(dayjs()),
    ).length || 0;
  const staffPresent = totalNumberOfStaff - staffOnLeave;

  function filterLeaves() {
    const result = leaves?.leaves.filter((leave) => {
      const matchesEmployeeName = leave.staff.name
        .toLowerCase()
        .includes(employeeName.toLowerCase());
      const matchesLeaveType = leaveType
        ? leave.leavetype.id === Number(leaveType)
        : true;
      const matchesLeaveStatus = leaveStatus
        ? leave.status === leaveStatus
        : true;
      const matchesStartDate = startDate
        ? dayjs(leave.start_date).isAfter(dayjs(startDate).subtract(1, "day"))
        : true;
      const matchesEndDate = endDate
        ? dayjs(leave.end_date).isBefore(dayjs(endDate).add(1, "day"))
        : true;

      return (
        matchesEmployeeName &&
        matchesLeaveType &&
        matchesLeaveStatus &&
        matchesStartDate &&
        matchesEndDate
      );
    });
    setFilteredLeaves(result); // Update filteredLeaves state
  }

  useEffect(() => {
    if (!leavePolicies.length) fetchLeavePolicies();
    if (!leaves?.leaves.length) fetchLeaves();
    filterLeaves();
  }, [fetchLeavePolicies, fetchLeaves, leavePolicies, leaves]);

  return (
    <div>
      <div className="mb-7">
        <div className="flex items-center justify-between">
          <PageTitleWithCrumbs
            title="Manage Staff Leaves"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Manage leaves" },
            ]}
          />
          <div>
            {/* <Button>
              <span className="flex items-center gap-1">
                <Icon icon="hugeicons:calendar-add-01" className="text-xl" />{" "}
                Add Leave
              </span>
            </Button> */}
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-[4px] border p-5 text-center">
          <h6 className="mb-[5px] text-lg font-normal">Today Presents</h6>
          <h4 className="text-2xl">
            {staffPresent}/{totalNumberOfStaff}
          </h4>
        </div>

        <div className="rounded-[4px] border p-5 text-center">
          <h6 className="mb-[5px] text-lg font-normal">Pending Requests</h6>
          <h4 className="text-2xl">{numberOfPendingLeave}</h4>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        <div className="relative h-16">
          <input
            id="empName"
            name="empName"
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="peer h-[50px] w-full rounded border bg-transparent px-3 pb-[6px] pt-[21px] placeholder-transparent focus:outline-none focus:dark:border-primary"
            placeholder="Employee Name"
          />

          <label
            htmlFor="empName"
            className="absolute left-3 top-1 text-xs opacity-100 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:opacity-[0.4] peer-focus:top-1 peer-focus:text-xs peer-focus:opacity-100"
          >
            Employee Name
          </label>
        </div>
        <div className="relative">
          <label className="absolute top-1 px-3 text-xs font-light">
            Leave Type
          </label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="h-[50px] w-full appearance-none rounded border bg-transparent px-3 pb-2 pt-5 shadow-transparent outline-none focus:shadow-transparent focus:outline-none"
          >
            <option value="" disabled>
              --Select--
            </option>
            {leavePolicies.map((leavePolicy) => (
              <option key={leavePolicy.id} value={leavePolicy.id}>
                {leavePolicy.name}
              </option>
            ))}
          </select>
        </div>
        <div className="relative">
          <label className="absolute top-1 px-3 text-xs font-light">
            Leave Status
          </label>
          <select
            value={leaveStatus}
            onChange={(e) => setLeaveStatus(e.target.value)}
            className="h-[50px] w-full appearance-none rounded border bg-transparent px-3 pb-2 pt-5 shadow-transparent outline-none focus:shadow-transparent focus:outline-none"
          >
            <option value="" disabled>
              --Select--
            </option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="declined">Declined</option>
          </select>
        </div>
        <div>
          <label className="absolute top-1 px-3 text-xs font-light">From</label>
          <div className="relative flex h-[50px] w-full items-center rounded border">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
              placeholderText="From "
              className="block h-full w-full bg-transparent pl-3 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="absolute top-1 px-3 text-xs font-light">To</label>
          <div className="relative flex h-[50px] w-full items-center rounded border">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="To"
              className="block !h-full w-full bg-transparent pl-3 focus:outline-none"
              minDate={new Date()}
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary w-full uppercase"
            onClick={filterLeaves}
          >
            Search
          </button>
        </div>
      </div>
      {loading ? (
        <div className="">
          <table className="table table-lg w-full rounded border border-base-300 bg-base-100">
            <thead>
              <tr className="text-left">
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>No of Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Approved by</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Display multiple skeleton rows to indicate loading state */}
              {[...Array(3)].map((_, index) => (
                <tr key={index} className="overflow-x-auto">
                  <td>
                    <div className="skeleton h-4 w-24"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-16"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-32"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-24"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                  <td>
                    <div className="skeleton h-4 w-20"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          {filteredLeaves && filteredLeaves.length > 0 ? (
            <ManageLeaveTable filteredLeaves={filteredLeaves} />
          ) : (
            <div className="rounded py-20 text-center">No leaves available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
