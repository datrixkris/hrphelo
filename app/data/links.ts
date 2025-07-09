import { SidebarLink } from "../types/link-types";
export const clientSidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    icon: "hugeicons:dashboard-square-03",
    link: "/dashboard",
  },
  {
    name: "Staff Management",
    icon: "hugeicons:user-group",
    dropdown: [
      {
        name: "Checklist",
        icon: "hugeicons:check-list",
        link: "/onboarding",
        module: "Checklist",
      },
      {
        name: "Staff List",
        icon: "hugeicons:user-multiple-02",
        link: "/staff",
        module: "Staff",
      },
      {
        name: "Departments",
        icon: "hugeicons:building-01",
        link: "/departments",
        module: "Department",
      },
      {
        name: "Designations",
        icon: "hugeicons:job-link",
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
        icon: "hugeicons:calendar-01",
        link: "/leaves",
        module: "Leave",
      },
      {
        name: "Manage leaves",
        icon: "hugeicons:calendar-check-in-01",
        link: "/manage-leaves",
        module: "Leave",
      },
      {
        name: "Leave Settings",
        icon: "hugeicons:calendar-setting-01",
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
        icon: "hugeicons:money-01",
        link: "/employee-salary",
        module: "Payroll",
      },
      {
        name: "Payroll Policy",
        icon: "hugeicons:money-safe",
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
    icon: "hugeicons:account-setting-01",
    dropdown: [
      {
        name: "Users Accounts",
        icon: "hugeicons:user-account",
        link: "/users-accounts",
        module: "User Role",
      },
      {
        name: "Roles & Permissions",
        icon: "hugeicons:user-lock-01",
        link: "/roles-permissions",
        module: "User Role",
      },
    ],
  },
  {
    name: "Settings",
    icon: "hugeicons:settings-01",
    link: "/settings",
  },
];
