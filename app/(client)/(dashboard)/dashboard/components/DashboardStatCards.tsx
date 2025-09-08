import DashCard from "@/app/components/DashCard";
import dayjs from "dayjs";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  //   Legend,
  ResponsiveContainer,
} from "recharts";
import PriorityComponent from "../../projects/components/PriorityComponent";
import {
  DepartmentOverview,
  EmployeeOverview,
  LeaveHistoryItem,
  LeaveOverview,
  PayrollHistoryItem,
} from "../types";
import useRandomGrey from "../hooks/useRandomGrey";

interface DataItems extends Record<string, string | number | boolean> {
  name: string;
  value: string | number;
}

// Sample Data

const employeeLeaveData = [
  { id: 1, type: "Annual", value: 5, color: "#FF6F61" },
  { id: 2, type: "Sick", value: 5, color: "#6A5ACD" },
  { id: 3, type: "Maternity", value: 2, color: "#32CD32" },
  { id: 4, type: "Friendly", value: 0, color: "#FFD700" },
];

type Priority = "high" | "highest" | "medium" | "low";

const projects = [
  {
    name: "Prepare onboarding documents",
    priority: "high",
    deadline: "2025-06-05",
    status: "In Progress",
  },
  {
    name: "Design UI for leave application",
    priority: "medium",
    deadline: "2025-06-10",
    status: "Not Started",
  },
  {
    name: "Payroll verification for May",
    priority: "high",
    deadline: "2025-06-03",
    status: "Completed",
  },
  {
    name: "Departmental structure review",
    priority: "low",
    deadline: "2025-06-15",
    status: "In Progress",
  },
  {
    name: "Finalize resignation policy update",
    priority: "medium",
    deadline: "2025-06-07",
    status: "Pending Review",
  },
];

// const leaveHistory = [
//   { date: "2025-01-01", type: "Annual", status: "Approved" },
//   { date: "2025-01-02", type: "Sick", status: "Pending" },
//   { date: "2025-01-03", type: "Maternity", status: "Rejected" },
//   { date: "2025-01-04", type: "Annual", status: "Approved" },
//   { date: "2025-01-05", type: "Sick", status: "Pending" },
// ];

// const payrollHistory = [
//   { date: "2025-01-01", amount: 1000 },
//   { date: "2025-01-02", amount: 2000 },
//   { date: "2025-01-03", amount: 3000 },
//   { date: "2025-01-04", amount: 4000 },
//   { date: "2025-01-05", amount: 5000 },
// ];

export function SimpleDonutChart({
  data,
  colors,
}: {
  data: DataItems[];
  colors: string[];
}) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={"50%"}
          outerRadius={"100%"}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        {/* <Legend /> Uncomment if you want to show legend */}
      </PieChart>
    </ResponsiveContainer>
  );
}

export const DepartmentsChart = ({ data }: { data: DepartmentOverview }) => {
  const randomGrey = useRandomGrey();
  const department = Object.values(data).map((item, index) => {
    return {
      id: index + 1,
      department:
        Object.keys(data)[index].charAt(0).toUpperCase() +
        Object.keys(data)[index].slice(1),
      value: item,
      color: randomGrey(),
    };
  });

  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Departments Overview</h2>
        <p className="text-xs italic">Employee distribution over departments</p>
      </div>
      <div className="flex">
        <div className="w-[40%]">
          {department.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">
                {item.department} - {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[60%]">
          <SimpleDonutChart
            colors={department.map((item) => item.color)}
            data={department.map((item) => {
              return { name: item.department, ...item };
            })}
          />
        </div>
      </div>
      {/* <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Add Department</button>
      </div> */}
    </DashCard>
  );
};

export const EmployeeChart = ({ data }: { data: EmployeeOverview }) => {
  const employees = [
    { id: 1, status: "Active", value: data.active, color: "#038db3" },
    {
      id: 2,
      status: "On Leave",
      value: data.on_leave,
      color: "#c7f933",
    },
    {
      id: 3,
      status: "On Probation",
      value: data.on_probation,
      color: "#c7f933",
    },
  ];
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Employee Overview</h2>
        <p className="text-xs italic">Employee status distribution</p>
      </div>
      <div className="flex">
        <div className="w-[40%]">
          {employees.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">
                {item.status} - {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[60%]">
          <SimpleDonutChart
            colors={employees.map((item) => item.color)}
            data={employees.map((item) => {
              return { name: item.status, ...item };
            })}
          />
        </div>
      </div>
      {/* <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Add Staff</button>
      </div> */}
    </DashCard>
  );
};

export const LeaveChart = ({ data }: { data: LeaveOverview }) => {
  const leaveData = [
    { id: 1, type: "Pending", value: data.pending, color: "#ff980d" },
    { id: 2, type: "Approved", value: data.approved, color: "#4CAF50" },
    { id: 3, type: "Rejected", value: data.rejected, color: "#B22222" },
  ];

  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Leaves Overview</h2>
        <p className="text-xs italic">Leave status distribution</p>
      </div>
      <div className="flex">
        <div className="w-[40%]">
          {leaveData.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">
                {item.type} - {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[60%]">
          <SimpleDonutChart
            colors={leaveData.map((item) => item.color)}
            data={leaveData.map((item) => {
              return { name: item.type, ...item };
            })}
          />
        </div>
      </div>
      {/* <p className="text-sm font-semibold text-warning">Pending leaves: 5</p>
      <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Process leaves</button>
      </div> */}
    </DashCard>
  );
};

export const EmployeeLeaveChart = () => {
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Your Leaves</h2>
        <p className="text-xs italic">Total leave entitlement: 20</p>
      </div>
      <div className="flex">
        <div className="w-[30%]">
          {employeeLeaveData.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">
                {item.type} - {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[70%]">
          <SimpleDonutChart
            colors={employeeLeaveData.map((item) => item.color)}
            data={employeeLeaveData.map((item) => {
              return { name: item.type, ...item };
            })}
          />
        </div>
      </div>
      <p className="text-sm font-semibold text-warning">Remaining leaves: 5</p>
      <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Apply new leave</button>
      </div>
    </DashCard>
  );
};

export const EmployeeProjectsTable = () => (
  <DashCard>
    <div className="mb-5">
      <h2 className="font-semibold">Your Projects</h2>
      <p className="text-xs italic">Projects you are currently working on</p>
    </div>
    <div className="overflow-x-auto">
      <table className="table table-zebra table-xs">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
            <th>Priority</th>
            <th>Deadline</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {projects.map((project) => (
            <tr key={project.name}>
              <td>{project.name}</td>
              <td>
                <div className="avatar-group -space-x-4">
                  <div className="avatar">
                    <div className="w-8">
                      <img src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4841.jpg?semt=ais_items_boosted&w=740" />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-8">
                      <img src="https://t4.ftcdn.net/jpg/02/79/66/93/360_F_279669366_Lk12QalYQKMczLEa4ySjhaLtx1M2u7e6.jpg" />
                    </div>
                  </div>
                  <div className="avatar placeholder">
                    <div className="w-8 bg-gray-700 text-neutral-content">
                      <span>+3</span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <PriorityComponent priority={project.priority as Priority} />{" "}
              </td>
              <td>{dayjs(project.deadline).format("DD MMM YYYY")}</td>
              <td>{project.status}</td>
              <td>
                <div className="text-nowrap rounded bg-neutral px-2 py-1 text-center font-semibold text-white">
                  View
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="mt-4 border-t pt-3">
      <button className="btn btn-primary w-full">View All Projects</button>
    </div>
  </DashCard>
);

export const LeaveHistoryTable = ({ data }: { data: LeaveHistoryItem[] }) => {
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Leave History</h2>
        <p className="text-xs italic">Your leave history</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td>{dayjs(item.date).format("DD MMM YYYY")}</td>
                <td>{item.type}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length == 0 && (
          <div className="flex justify-center py-4">
            <p className="text-sm text-gray-500">No leave history</p>
          </div>
        )}
      </div>
    </DashCard>
  );
};

export const PayrollHistoryTable = ({
  data,
}: {
  data: PayrollHistoryItem[];
}) => {
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Payroll History</h2>
        <p className="text-xs italic">Your payroll history</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.date}>
                <td>{dayjs(item.date).format("DD MMM YYYY")}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {data.length == 0 && (
          <div className="flex justify-center py-4">
            <p className="text-sm text-gray-500">No payroll history</p>
          </div>
        )}
      </div>
    </DashCard>
  );
};
