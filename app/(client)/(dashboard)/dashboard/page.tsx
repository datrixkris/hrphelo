"use client";

import DashCard from "@/app/components/DashCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";
import {
  DepartmentsChart,
  EmployeeChart,
  EmployeeLeaveChart,
  EmployeeProjectsTable,
  LeaveChart,
} from "./components/DashboardStatCards";
import { useAuthStore } from "@/app/stores/auth-store";

// Sample Data
const kpiCards = [
  { title: "Total Employees", value: 152 },
  { title: "Departments", value: 4 },
  { title: "New Hires", value: 3 },
  { title: "Resignations", value: 3 },
];

const KPISection = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
      <p className="flex justify-between">
        <div className="">
          <p className="">
            {" "}
            <span className="text-2xl font-bold text-primary">148</span>{" "}
            <span className="text-sm font-semibold text-green-600">
              Processed
            </span>{" "}
          </p>
          <p className="text-xs text-warning">4 pending</p>
        </div>
        <span className="self-end">
          <Link
            href="/dashboard"
            className="text-xs underline hover:text-primary"
          >
            Process Payroll
          </Link>
        </span>
      </p>
    </div>

    {/* Users */}
    <div className="flex flex-col justify-between rounded-md bg-base-100 p-3">
      <h2 className="mb-2 font-semibold">Users</h2>
      <p className="flex justify-between">
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
      </p>
    </div>
  </div>
);

const Page = () => {
  const user = useAuthStore((state) => state.user);
  // console.log(user);

  return (
    <div>
      {/* Welcome */}
      <div className="">
        <h1 className="mb-2 text-2xl font-bold">
          Welcome to your dashboard, {user?.staff.name.split(" ")[0]}!
        </h1>
        <p className="text-gray-600">
          Have a quick overview of your current status and activities.
        </p>
      </div>

      {/* dashboard split into two */}
      <div className="mt-10 flex gap-4">
        {/* statistics */}
        <div className="w-4/5">
          {/* KPI Section */}
          <KPISection />

          {/* Leave Chart */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <EmployeeChart />
            <DepartmentsChart />
            <LeaveChart />
            <EmployeeLeaveChart />
            <div className="col-span-2">
              <EmployeeProjectsTable />
            </div>
          </div>
        </div>

        {/* notifs, quick action and checklist */}
        <div className="w-1/5">
          <div className="grid gap-4">
            <DashCard>
              <div className="h-[250px]">
                <h2 className="mb-2 font-semibold">Quick Actions</h2>
              </div>
            </DashCard>
            <DashCard>
              <div className="h-[250px]">
                <h2 className="mb-2 font-semibold">Checklists</h2>
              </div>
            </DashCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
