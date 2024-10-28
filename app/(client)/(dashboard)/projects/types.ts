// kanban Types
export type Task = {
    id: string;
    content: string;
}

export type Column = {
    id: string;
    title: string;
    taskIds: string[];
    color: Color;
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
