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
  },
  {
    name: "Staff Management",
    icon: "hugeicons:user-group",
    dropdown: [
      {
        name: "Staff List",
        link: "/staff",
      },
      {
        name: "Departments",
        link: "/departments",
      },
      {
        name: "Designations",
        link: "/designations",
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
    name: "Payroll Management",
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
    name: "Resignations",
    icon: "hugeicons:user-remove-01",
    link: "/resignations",
  },
  {
    name: "Users Accounts",
    icon: "hugeicons:user-account",
    link: "/users-accounts",
  },
];
