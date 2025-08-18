import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LeaveHistoryTable, PayrollHistoryTable } from "./DashboardStatCards";
// import Link from "next/link";

const StaffOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-hr-yellow">Your Overview</h2>

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-medium">Key Statistics</h3>
        <KPISection />
      </div>

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-medium">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon
              icon="hugeicons:checkmark-square-01"
              className="inline text-2xl"
            />
            <span className="">Request Leave</span>
          </button>
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon
              icon="hugeicons:document-validation"
              className="inline text-2xl"
            />
            <span className="">View Payslip</span>
          </button>
          <button className="btn btn-primary flex h-20 items-center gap-2 py-4 text-lg">
            <Icon icon="hugeicons:user-circle" className="inline text-2xl" />
            <span className="">Update Profile</span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="mb-2 text-lg font-medium">Personal Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <LeaveHistoryTable />
          <PayrollHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default StaffOverview;

// Sample Data
const kpiCards = [
  { title: "Your Leave Balance", value: "10 days" },
  { title: "Your Upcoming Leave", value: "Sept 15" },
  { title: "Your Payroll Summary", value: "Aug 31" },
  { title: "Assigned Projects", value: 4 },
];

const KPISection = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
    {kpiCards.map((card, i) => (
      <div
        key={i}
        className="flex flex-col justify-between rounded-md bg-base-100 p-3"
      >
        <h2 className="mb-2 font-semibold">{card.title}</h2>
        <p className="flex justify-between">
          <span className="text-2xl font-bold text-primary">{card.value}</span>
          {/* <span className="self-end">
            <Link
              href="/dashboard"
              className="hover:text-primar text-xs underline"
            >
              View
            </Link>
          </span> */}
        </p>
      </div>
    ))}
  </div>
);
