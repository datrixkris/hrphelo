import { create } from 'zustand';
import { Task } from './types';



interface Column {
    id: string;
    title: string;
    taskIds: string[];
    color: string;
}

interface KanbanState {
    tasks: { [key: string]: Task };
    columns: { [key: string]: Column };
    columnOrder: string[];
    createColumn: (title: string, color: string) => void; // Action to create column
    editColumn: (columnId: string, title: string, color: string) => void; // Action to edit column
    deleteColumn: (columnId: string) => void; // Action to delete column
    addTask: (columnId: string, task: Task) => void; // Action to add task
    editTask: (taskId: string, updatedTask: Partial<Task>) => void; // Action to edit task
    deleteTask: (columnId: string, taskId: string) => void;
    moveTask: (
        sourceColumnId: string,
        destinationColumnId: string,
        sourceIndex: number,
        destinationIndex: number
    ) => void;
    reorderColumns: (startIndex: number, endIndex: number) => void; // Action to reorder columns
}

export const useKanbanStore = create<KanbanState>((set) => ({
    tasks: {
        'task-1': { id: 'task-1', name: 'Task One', priority: 'High', dueDate: '', assignedTo: [], content: 'Description' },
        'task-2': { id: 'task-2', name: 'Task Two', priority: 'Medium', dueDate: '', assignedTo: [], content: 'Description' },
        'task-3': { id: 'task-3', name: 'Task Three', priority: 'Low', dueDate: '', assignedTo: [], content: 'Description' },
    },
    columns: {
        'column-1': { id: 'column-1', title: 'To Do', taskIds: ['task-1', 'task-2', 'task-3'], color: 'red' },
        'column-2': { id: 'column-2', title: 'In Progress', taskIds: [], color: 'blue' },
        'column-3': { id: 'column-3', title: 'Done', taskIds: [], color: 'green' },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],

    moveTask: (sourceColumnId, destinationColumnId, sourceIndex, destinationIndex) =>
        set((state) => {
            const sourceColumn = state.columns[sourceColumnId];
            const destinationColumn = state.columns[destinationColumnId];
            const sourceTaskIds = Array.from(sourceColumn.taskIds);
            const [removed] = sourceTaskIds.splice(sourceIndex, 1);
            const destinationTaskIds = Array.from(destinationColumn.taskIds);
            destinationTaskIds.splice(destinationIndex, 0, removed);

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [sourceColumnId]: { ...sourceColumn, taskIds: sourceTaskIds },
                    [destinationColumnId]: { ...destinationColumn, taskIds: destinationTaskIds },
                },
            };
        }),

    reorderColumns: (startIndex, endIndex) => set((state) => {
        const newColumnOrder = Array.from(state.columnOrder);
        const [removed] = newColumnOrder.splice(startIndex, 1); // Remove the column from the array
        newColumnOrder.splice(endIndex, 0, removed); // Insert it into the new position

        return { columnOrder: newColumnOrder };
    }),

    createColumn: (title, color) => set((state) => {
        const newColumnId = `column-${Date.now()}`;
        return {
            columns: {
                ...state.columns,
                [newColumnId]: {
                    id: newColumnId,
                    title,
                    taskIds: [],
                    color,
                },
            },
            columnOrder: [...state.columnOrder, newColumnId],
        };
    }),

    editColumn: (columnId, title, color) => set((state) => ({
        columns: {
            ...state.columns,
            [columnId]: {
                ...state.columns[columnId],
                title,
                color,
            },
        },
    })),

    deleteColumn: (columnId) => set((state) => {
        const newColumns = { ...state.columns };
        delete newColumns[columnId];

        const newColumnOrder = state.columnOrder.filter(id => id !== columnId);

        return {
            columns: newColumns,
            columnOrder: newColumnOrder,
        };
    }),


    addTask: (columnId, task) => set((state) => {
        const newTaskId = `task-${Date.now()}`;
        const newTask = { ...task, id: newTaskId };
        
        return {
            tasks: { ...state.tasks, [newTaskId]: newTask },
            columns: {
                ...state.columns,
                [columnId]: {
                    ...state.columns[columnId],
                    taskIds: [...state.columns[columnId].taskIds, newTaskId],
                },
            },
        };
    }),

    editTask: (taskId, updatedTask) => set((state) => ({
        tasks: {
            ...state.tasks,
            [taskId]: {
                ...state.tasks[taskId],
                ...updatedTask,
            },
        },
    })),

    deleteTask: (columnId, taskId) => set((state) => {
        const updatedTaskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
        const newTasks = { ...state.tasks };
        delete newTasks[taskId];

        return {
            tasks: newTasks,
            columns: {
                ...state.columns,
                [columnId]: {
                    ...state.columns[columnId],
                    taskIds: updatedTaskIds,
                },
            },
        };
    }),
}));
