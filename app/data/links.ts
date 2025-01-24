import { SidebarLink } from "../types/link-types";
export const clientSidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    icon: "hugeicons:dashboard-square-03",
    link: "/dashboard",
  },
  {
    name: "Staff",
    icon: "hugeicons:user-group",
    dropdown: [
      {
        name: "Departments",
        link: "/departments",
      },
      {
        name: "Staff List",
        link: "/staff",
      },
      {
        name: "Designations",
        link: "/designations",
      },
    ],
  },
  {
    name: "Leaves",
    icon: "hugeicons:calendar-remove-01",
    dropdown: [
      {
        name: "Your leaves",
        link: "/leaves",
      },
      {
        name: "Manage leaves",
        link: "/manage-leaves",
      },
      {
        name: "Leave Settings",
        link: "/leave-settings",
      },
    ],
  },
  {
    name: "Payroll",
    icon: "hugeicons:bitcoin-money-01",
    dropdown: [
      {
        name: "Employee Salary",
        link: "/employee-salary",
      },
      {
        name: "Payroll Policy",
        link: "/payroll-policy",
      },
    ],
  },
  {
    name: "Projects",
    icon: "hugeicons:analytics-up",
    link: "/projects",
  },
  {
    name: "Users Accounts",
    icon: "hugeicons:user-account",
    link: "/users-accounts",
  },
];
