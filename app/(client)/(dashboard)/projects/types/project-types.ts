export interface ProjectData {
  id?: number;
  staffId?: number;
  companyId?: number;
  name: string;
  slug?: string;
  description: string;
  start_date?: string | null; // Nullable if the value can be null
  end_date?: string | null; // Nullable if the value can be null
  status?: "not_started" | "in_progress" | "completed"; // You can define other statuses if necessary
  priority?: "high" | "highest" | "medium" | "low" | null; // Nullable if the value can be null
  leaderId?: number;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  deletedAt?: string | null; // Nullable if the value can be null
  boards?: Board[]; // Array of boards associated with the project
  projectLead?: ProjectLead; // Project lead information
  project_lead?: ProjectLead; // Project lead information
  members?: Member[]; // Array of members associated with the project
  progress?: number; // Percentage or value representing progress
  memberIds?: (number | undefined)[];
}

export interface Board {
  id: number;
  projectId: number;
  name: string;
  slug: string | null; // Nullable if the value can be null
  color: string; // Typically a hex color code
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  deletedAt: string | null; // Nullable if the value can be null
  tasks: Task[]; // Array of tasks associated with the board
}

export interface ProjectLead {
  id: number;
  name: string;
  image: string;
}

export interface Member {
  id: number;
  projectId: number;
  staffId: number | string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
  deletedAt?: string | null; // Nullable if the value can be null
  staff: Staff; // Information about the staff member
}

export interface Staff {
  id: number;
  name: string;
  image: string;
}

export interface Task {
  // Define Task export interface here based on your structure if needed
  id: number;
  name: string;
  description: string;
  companyId?: number;
  staffId?: number;
  slug: string;
}
