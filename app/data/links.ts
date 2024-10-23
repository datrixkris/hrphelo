import { SidebarLink } from "../types/link-types";
export const clientSidebarLinks: SidebarLink[] = [
  {
    name: "Dashboard",
    icon: "hugeicons:dashboard-square-03",
    link: "/dashboard",
  },
  {
    name: "Departments",
    icon: "hugeicons:departement",
    link: "/departments",
  },
  {
    name: "Staff",
    icon: "hugeicons:user-group",
    link: "/staff",
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
    name: "Projects",
    icon: "hugeicons:analytics-up",
    link: "/projects",
  },
];
