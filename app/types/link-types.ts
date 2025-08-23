import { ModuleName } from "@/app/(client)/(dashboard)/(users)/roles-permissions/types";

export interface DropdownLink {
  name: string;
  link: string;
  module: ModuleName; // Optional for links that are not module-specific
  icon?: string; // Optional icon for dropdown items
}

export interface SidebarLink {
  name: string;
  icon: string;
  link?: string; // Optional if there's a dropdown
  module?: ModuleName; // Optional for links that are not module-specific
  dropdown?: DropdownLink[]; // Optional for links that have dropdowns
}
