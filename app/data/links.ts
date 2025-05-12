import { SidebarLink } from "../types/link-types";
export const clientSidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    icon: "hugeicons:dashboard-square-03",
    link: "/dashboard",
  },
  {
    name: "Onboarding",
    icon: "hugeicons:user-add-01",
    link: "/onboarding",
    module: "Checklist",
  },
  {
    name: "Staff Management",
    icon: "hugeicons:user-group",
    dropdown: [
      {
        name: "Staff List",
        link: "/staff",
        module: "Staff",
      },
      {
        name: "Departments",
        link: "/departments",
        module: "Department",
      },
      {
        name: "Designations",
        link: "/designations",
        module: "Department",
      },
    ],
  },
  {
    name: "Leave Management",
    icon: "hugeicons:calendar-remove-01",
    dropdown: [
      {
        name: "Your leaves",
        link: "/leaves",
        module: "Leave",
      },
      {
        name: "Manage leaves",
        link: "/manage-leaves",
        module: "Leave",
      },
      {
        name: "Leave Settings",
        link: "/leave-settings",
        module: "Leave",
      },
    ],
  },
  {
    name: "Payroll Management",
    icon: "hugeicons:bitcoin-money-01",
    dropdown: [
      {
        name: "Employee Salary",
        link: "/employee-salary",
        module: "Payroll",
      },
      {
        name: "Payroll Policy",
        link: "/payroll-policy",
        module: "Payroll Policy",
      },
    ],
  },
  {
    name: "Projects",
    icon: "hugeicons:analytics-up",
    link: "/projects",
    module: "Project",
  },
  {
    name: "Resignations",
    icon: "hugeicons:user-remove-01",
    link: "/resignations",
    module: "Resignation",
  },
  {
    name: "Users Management",
    icon: "hugeicons:user-account",
    dropdown: [
      {
        name: "Users Accounts",
        link: "/users-accounts",
        module: "User Role",
      },
      {
        name: "Roles & Permissions",
        link: "/roles-permissions",
        module: "User Role",
      },
    ],
  },
];
