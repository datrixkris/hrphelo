"use client";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useLeavePolicyStore } from "../leave-settings/leavePolicy-store";
// import { useLeaveStore } from "../leave-store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
// s

const Page = () => {
  const { fetchLeavePolicies, leavePolicies } = useLeavePolicyStore();
  // const { fetchLeaves, leaves } = useLeaveStore();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");

  const filteredLeaves = leaves?.leaves.filter((leave) => {
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
    // const matchesEndDate = endDate
    //   ? dayjs(leave.end_date).isBefore(dayjs(endDate).add(1, "day"))
    //   : true;

    return (
      matchesEmployeeName &&
      matchesLeaveType &&
      matchesLeaveStatus &&
      matchesStartDate 
      // matchesEndDate
    );
  });

  const handleSearch = () => {
    // Additional logic if needed
  };

  useEffect(() => {
    if (!leavePolicies.length) fetchLeavePolicies();
    if (!leaves?.leaves.length) fetchLeaves();
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
      <div className="mb-4 grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-[4px] border p-5 text-center">
          <h6 className="mb-[5px] text-lg font-normal">Today Presents</h6>
          <h4 className="text-2xl">21/60</h4>
        </div>
        <div className="rounded-[4px] border p-5 text-center">
          <h6 className="mb-[5px] text-lg font-normal">Planned Leaves </h6>
          <h4 className="text-2xl">
            8 <span className="text-xs">Today</span>
          </h4>
        </div>
        <div className="rounded-[4px] border p-5 text-center">
          <h6 className="mb-[5px] text-lg font-normal">Unplanned Leaves</h6>
          <h4 className="text-2xl">
            0 <span className="text-xs">Today</span>
          </h4>
        </div>
        <div className="rounded-[4px] border p-5 text-center">
          <h6 className="mb-[5px] text-lg font-normal">Pending Requests</h6>
          <h4 className="text-2xl">5</h4>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
        <div className="relative h-[50px]">
          <input
            id="empName"
            name="empName"
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="peer h-[50px] w-full rounded border px-3 pb-[6px] pt-[21px] placeholder-transparent focus:outline-none focus:dark:border-primary"
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
            className="h-[50px] w-full appearance-none rounded border px-3 pb-2 pt-5 shadow-transparent outline-none focus:shadow-transparent focus:outline-none"
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
            className="h-[50px] w-full appearance-none rounded border px-3 pb-2 pt-5 shadow-transparent outline-none focus:shadow-transparent focus:outline-none"
          >
            <option value="" disabled>
              --Select--
            </option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <label className="absolute top-1 px-3 text-xs font-light">From</label>
          <div className="relative flex h-[50px] w-full items-center border">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
              placeholderText="From "
              className="block!h-full w-full pl-3 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setStartDate(null)}
            >
              <Icon icon="uit:calender" />
            </button>
          </div>
        </div>

        <div>
          <label className="absolute top-1 px-3 text-xs font-light">To</label>
          <div className="relative flex h-[50px] w-full items-center rounded border">
          <div className="relative flex h-[50px] w-full items-center rounded border">
            <DatePicker
              selected={endDate}
              showIcon
              onChange={(date) => setEndDate(date)}
              placeholderText="To"
              className="block !h-full w-full focus:outline-none"
              minDate={startDate}
              filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setEndDate(null)}
              onClick={() => setEndDate(null)}
            >
              <Icon icon="uit:calender" />
            </button>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary w-full uppercase"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="table table-lg w-full rounded border border-base-300 bg-base-100">
          <thead>
            <tr className="text-left">
              <th>Employee</th>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>No of Days</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaves?.map((leave) => (
              <tr key={leave.id}>
                <td>
                  <h2 className="inline-flex items-center whitespace-nowrap align-middle text-[15px] font-normal">
                    <a
                      href="profile.html"
                      className="relative mr-[10px] inline-block h-[38px] w-[38px] rounded-full"
                    >
                      <img
                        alt={leave.staff.name}
                        src={leave.staff.image}
                        className="w-full rounded-full"
                      />
                    </a>
                    <a>
                      {leave.staff.name}
                      <span className="mt-[3px] block text-xs">
                        {leave.staff.role}
                      </span>
                    </a>
                  </h2>
                </td>
                <td>{leave.leavetype.name}</td>
                <td>{dayjs(leave.start_date).format("MMM D, YYYY")}</td>
                <td>{dayjs(leave.end_date).format("MMM D, YYYY")}</td>
                <td>{leave.duration}</td>
                <td>{leave.reason}</td>
                <td className="text-center">
                  <div>
                    <a
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
                    </a>
                  </div>
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <Icon icon="mdi:dots-vertical" className="text-xl" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                    >
                      <li>
                        <a>edit</a>
                      </li>
                      <li>
                        <a>delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
