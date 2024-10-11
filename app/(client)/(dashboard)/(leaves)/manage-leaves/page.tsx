"use client";
import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { useLeavePolicyStore } from "../leave-settings/leavePolicy-store";
import { useLeaveStore } from "../leave-store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Page = () => {
  const { fetchLeavePolicies, loading, leavePolicies } = useLeavePolicyStore();
  const { fetchLeaves, leaves } = useLeaveStore();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    fetchLeavePolicies();
  }, []);
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
            <Button>
              <span className="flex items-center gap-1">
                <Icon icon="hugeicons:calendar-add-01" className="text-xl" />{" "}
                Add Leave
              </span>
            </Button>
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
          <select className=" h-[50px] w-full appearance-none rounded border px-3 pb-2 pt-5 shadow-transparent outline-none focus:shadow-transparent focus:outline-none">
            <option value="" disabled selected>
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
          <select className=" h-[50px] w-full appearance-none rounded border px-3 pb-2 pt-5 shadow-transparent outline-none focus:shadow-transparent focus:outline-none">
            <option value="" disabled selected>
              --Select--
            </option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="absolute top-1 px-3 text-xs font-light">From</label>
          <div className="relative flex h-[50px] w-full items-center border">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
          <div className="relative flex h-[50px] rounded border  w-full items-center">
            <DatePicker
              selected={endDate}
              showIcon
              onChange={(date) => setEndDate(date)}
              placeholderText="To"
              className="block !h-full w-full  focus:outline-none"
              minDate={startDate} // Prevents selecting a date before the start date
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setEndDate(null)} 
            >
              <Icon icon="uit:calender" />
            </button>
          </div>
        </div>
        <div>
          <a href="" className="btn btn-primary w-full uppercase">
            search
          </a>
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
            <tr>
              <td>
                <h2 className="inline-flex items-center whitespace-nowrap align-middle text-[15px] font-normal">
                  <a
                    href="profile.html"
                    className="relative mr-[10px] inline-block h-[38px] w-[38px] rounded-full"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      className="w-full rounded-full"
                    />
                  </a>
                  <a>
                    {" "}
                    John Doe{" "}
                    <span className="mt-[3px] block text-xs">Web Designer</span>
                  </a>
                </h2>
              </td>
              <td>Medical Leave</td>
              <td>27 Feb 2019</td>
              <td>27 Feb 2019</td>
              <td>1 day</td>
              <td>Going to Hospital</td>
              <td>ggg</td>
              <td>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn m-1">
                    Click
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
