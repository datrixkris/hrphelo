export interface DropdownLink {
  name: string;
  link: string;
}

export interface SidebarLink {
  name: string;
  icon: string;
  link?: string; // Optional if there's a dropdown
  dropdown?: DropdownLink[]; // Optional for links that have dropdowns
}
