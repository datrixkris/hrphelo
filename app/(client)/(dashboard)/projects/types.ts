import { Column } from "./stores/kanbanStore";

export type Task = {
  id: number;
  name: string;
  status?: string;
  description?: string;
};

export interface ApiTask {
  id: number;
  staffId: number;
  projectId: number;
  boardId: number;
  slug: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
}

export interface ApiColumn {
  id: number;
  projectId: number;
  name: string;
  color: Color;
  description: string;
  tasks: {
    [taskId: string]: ApiTask;
  };
}

export interface ApiResponse {
  [columnKey: string]: ApiColumn;
}

export type AddColumn = {
  id?: number;
  name: string;
  color?: Color;
  description: string;
};

export type AddTask = {
  id?: string;
  description: string;
  boardId: number;
};

export type ProjectLead = {
  id: number;
  name: string;
  role?: string;
  email?: string;
};

export const colorKeys = [
  "red",
  "blue",
  "green",
  "yellow",
  "indigo",
  "purple",
  "pink",
  "orange",
] as const;

export type Color = (typeof colorKeys)[number];

export interface AddTaskBoardProps {
  onClose: () => void;
  column?: Column;
}
