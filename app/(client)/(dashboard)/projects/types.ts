// kanban Types
// export type Task = {
//     id: number;
//     description: string;
//     content: string;
//     startDate: string;
//     endDate: string;
//     priority?: string;
//     dueDate?: string;
//     assignedTo?: ProjectLead[];
//     color?: Color;
// };


export type Task = {
    id: number;
    name: string;
    status: string;
};


export type AddColumn = {
    id?: number;
    name: string;
    color?: Color;
    description: string;
};

export type AddTask = {
    id?: string;
    name: string;
    description: string;
    boardId: number
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
    column?: AddColumn;
}
