import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  DepartmentsChart,
  EmployeeChart,
  LeaveChart,
} from "./DashboardStatCards";
import Link from "next/link";

const CompanyOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-hr-yellow">Company Overview</h2>

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-medium">Key Statistics</h3>
        <KPISection />
      </div>

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-medium">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon
              icon="hugeicons:plus-sign-circle"
              className="inline text-2xl"
            />
            <span className="">Add Employee</span>
          </button>
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon
              icon="hugeicons:bitcoin-money-01"
              className="inline text-2xl"
            />
            <span className="">Run Payroll</span>
          </button>
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon
              icon="hugeicons:checkmark-circle-01"
              className="inline text-2xl"
            />
            <span className="">Approve Leave</span>
          </button>
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon icon="hugeicons:building-01" className="inline text-2xl" />
            <span className="">Add Department</span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-medium">Core Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <EmployeeChart />
          <DepartmentsChart />
          <LeaveChart />
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;

// Sample Data
const kpiCards = [
  { title: "Total Employees", value: 152 },
  { title: "Departments", value: 4 },
  { title: "New Hires", value: 3 },
  { title: "Resignations", value: 3 },
];

const KPISection = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 2xl:grid-cols-5">
    {kpiCards.map((card, i) => (
      <div
        key={i}
        className="flex flex-col justify-between rounded-md bg-base-100 p-3"
      >
        <h2 className="mb-2 font-semibold">{card.title}</h2>
        <p className="flex justify-between">
          <span className="text-2xl font-bold text-primary">{card.value}</span>
          <span className="self-end">
            <Link
              href="/dashboard"
              className="hover:text-primar text-xs underline"
            >
              View
            </Link>
          </span>
        </p>
      </div>
    ))}
    {/* Payroll */}
    <div className="flex flex-col justify-between rounded-md bg-base-100 p-3">
      <div className="flex items-start justify-between">
        <h2 className="mb-2 font-semibold">Payroll Processed</h2>
        <p className="btn btn-xs">
          <Icon icon="hugeicons:calendar-03" className="inline" />{" "}
          <span className="text-xs">May</span>{" "}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="">
          <p className="">
            {" "}
            <span className="text-2xl font-bold text-primary">148</span>{" "}
            <span className="text-sm font-semibold text-green-600">
              Processed
            </span>{" "}
          </p>
        </div>
        <p className="self-end text-xs text-warning">4 pending</p>
      </div>
    </div>

    {/* Users */}
    {/* <div className="flex flex-col justify-between rounded-md bg-base-100 p-3">
        <h2 className="mb-2 font-semibold">Users</h2>
        <div className="flex justify-between">
          <div className="">
            <p className="">
              {" "}
              <span className="text-2xl font-bold text-primary">148</span>{" "}
              <span className="text-sm font-semibold text-green-600">Active</span>{" "}
            </p>
            <p className="text-xs text-warning">4 pending</p>
          </div>
          <span className="self-end">
            <Link
              href="/dashboard"
              className="text-xs underline hover:text-primary"
            >
              Add User
            </Link>
          </span>
        </div>
      </div> */}
  </div>
);
