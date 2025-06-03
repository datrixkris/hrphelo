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

interface DataItems extends Record<string, string | number | boolean> {
  name: string;
  value: string | number;
}

// Sample Data
const leaveData = [
  { id: 1, type: "Annual", value: 12, color: "#FF6F61" },
  { id: 2, type: "Sick", value: 5, color: "#6A5ACD" },
  { id: 3, type: "Maternity", value: 2, color: "#32CD32" },
  { id: 4, type: "Friendly", value: 2, color: "#FFD700" },
];

const employeeLeaveData = [
  { id: 1, type: "Annual", value: 5, color: "#FF6F61" },
  { id: 2, type: "Sick", value: 5, color: "#6A5ACD" },
  { id: 3, type: "Maternity", value: 2, color: "#32CD32" },
  { id: 4, type: "Friendly", value: 0, color: "#FFD700" },
];

const department = [
  { id: 1, department: "Human Resource", value: 32, color: "#ff000080" },
  { id: 2, department: "Development", value: 14, color: "#00ff0080" },
  { id: 3, department: "UI/UX", value: 55, color: "#0000ff80" },
];

const employees = [
  { id: 1, gender: "Male", value: 74, color: "#038db3" },
  { id: 1, gender: "Female", value: 32, color: "#c7f933" },
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

export function SimpleDonutChart({
  data,
  colors,
}: {
  data: DataItems[];
  colors: string[];
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
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

export const DepartmentsChart = () => {
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Departments Overview</h2>
        <p className="text-xs italic">Employee distribution over departments</p>
      </div>
      <div className="flex">
        <div className="w-[30%]">
          {department.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">
                {item.department}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[70%]">
          <SimpleDonutChart
            colors={department.map((item) => item.color)}
            data={department.map((item) => {
              return { name: item.department, ...item };
            })}
          />
        </div>
      </div>
      <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Add Department</button>
      </div>
    </DashCard>
  );
};

export const EmployeeChart = () => {
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Employee Overview</h2>
        <p className="text-xs italic">Employee gender distribution</p>
      </div>
      <div className="flex">
        <div className="w-[30%]">
          {employees.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">
                {item.gender}
              </span>
            </div>
          ))}
        </div>
        <div className="w-[70%]">
          <SimpleDonutChart
            colors={employees.map((item) => item.color)}
            data={employees.map((item) => {
              return { name: item.gender, ...item };
            })}
          />
        </div>
      </div>
      <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Add Staff</button>
      </div>
    </DashCard>
  );
};

export const LeaveChart = () => {
  return (
    <DashCard>
      <div className="mb-5">
        <h2 className="font-semibold">Leaves Overview</h2>
        <p className="text-xs italic">Employees on leave: 44</p>
      </div>
      <div className="flex">
        <div className="w-[30%]">
          {leaveData.map((item) => (
            <div key={item.id}>
              <span
                className={`inline-block size-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              ></span>{" "}
              <span className="relative bottom-[1px] text-xs">{item.type}</span>
            </div>
          ))}
        </div>
        <div className="w-[70%]">
          <SimpleDonutChart
            colors={leaveData.map((item) => item.color)}
            data={leaveData.map((item) => {
              return { name: item.type, ...item };
            })}
          />
        </div>
      </div>
      <p className="text-sm font-semibold text-warning">Pending leaves: 5</p>
      <div className="mt-4 border-t pt-3">
        <button className="btn btn-primary w-full">Process leaves</button>
      </div>
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
