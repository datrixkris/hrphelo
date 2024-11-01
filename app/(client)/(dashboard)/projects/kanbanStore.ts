// path: /app/store/kanbanStore.ts
import { create } from 'zustand';
import { api } from '@/app/axiosApi/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AddColumn, AddTask } from './types';

export type Task = {
    id: string;
    name: string;
    description: string;
    boardId?: number;
};

export type Column = {
    id: string;
    name: string;
    color: string;
    description: string;
    taskIds: string[]; // Only task IDs
};

interface ApiErrorResponse {
    message?: string;
    code?: number;
}

interface KanbanState {
    tasks: { [key: string]: Task }; // Dictionary of tasks
    columns: { [key: string]: Column };
    projectId: number | null;
    columnOrder: string[];
    loading: boolean;
    error: string | null;

    fetchColumn: (projectId: number) => Promise<void>;
    addColumn: (data: AddColumn) => Promise<void>;
    editColumn: (data: AddColumn) => Promise<void>;
    addTask: (data: AddTask) => Promise<void>;
    editTask: (projectId: number, taskId: string, updatedTask: Partial<Task>) => Promise<void>;
    deleteTask: (projectId: number, taskId: string) => Promise<void>;
    deleteColumn: (columnId: string) => Promise<void>;
    moveTask: (sourceColumnId: string, destinationColumnId: string, sourceIndex: number, destinationIndex: number) => void;
    reorderColumns: (startIndex: number, endIndex: number) => void;
}

export const useKanbanStore = create<KanbanState>((set, get) => {
    const handleError = (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error?.response?.data?.message || error.message;
        toast.error(errorMessage);
        console.error(error);
        return errorMessage;
    };

    const findColumnId = (taskId: string) => {
        return Object.keys(get().columns).find(
            (key) => get().columns[key].taskIds.includes(taskId)
        );
    };

    const fetchColumn = async (projectId: number) => {
        set({ projectId, loading: true, error: null });
        try {
            const response = (await api.get(`/v1/projects/${projectId}/boards`)).data;
            const columnOrder = Object.keys(response);

            const columnsById: { [key: string]: Column } = {};
            const tasksById: { [key: string]: Task } = {};

            columnOrder.forEach((columnKey) => {
                const columnData = response[columnKey];
                const taskIds = Object.keys(columnData.tasks);

                // Populate columnsById
                columnsById[columnKey] = {
                    id: columnData.id.toString(),
                    name: columnData.name,
                    color: columnData.color,
                    description: columnData.description,
                    taskIds: taskIds, // Only store task IDs here
                };

                // Populate tasksById with full task data
                taskIds.forEach((taskKey) => {
                    const taskData = columnData.tasks[taskKey];
                    tasksById[taskKey] = {
                        id: taskData.id.toString(),
                        name: taskData.slug,
                        description: taskData.description,
                        boardId: taskData.boardId,
                    };
                });
            });

            set({ columns: columnsById, columnOrder, tasks: tasksById, loading: false });
        } catch (err) {
            set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
        }
    };

    return {
        tasks: {}, // Initialize tasks as an empty dictionary
        projectId: null,
        columns: {},
        columnOrder: [],
        loading: false,
        error: null,

        fetchColumn,

        addColumn: async (data) => {
            set({ loading: true, error: null });
            try {
                await api.post(`/v1/projects/${get().projectId}/boards`, data);
                toast.success("Column added successfully!");
                await fetchColumn(get().projectId as number);
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        editColumn: async (data) => {
            set({ loading: true, error: null });
            try {
                await api.put(`/v1/projects/${get().projectId}/boards`, data);
                toast.success("Column updated successfully!");
                await fetchColumn(get().projectId as number);
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        addTask: async (data) => {
            set({ loading: true, error: null });
            try {
                const response = await api.post(`/v1/projects/${get().projectId}/tasks`, data);
                const newTask = response.data;
                set((state) => ({
                    tasks: { ...state.tasks, [newTask.id]: newTask },
                    columns: {
                        ...state.columns,
                        [newTask.boardId]: {
                            ...state.columns[newTask.boardId],
                            tasks: [...state.columns[newTask.boardId].taskIds, newTask.id],
                        },
                    },
                }));
                toast.success("Task added successfully!");
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        editTask: async (projectId, taskId, updatedTask) => {
            set({ loading: true, error: null });
            try {
                const response = await api.put(`/v1/projects/${projectId}/tasks/${taskId}`, updatedTask);
                const updatedTaskData = response.data;

                set((state) => ({
                    tasks: {
                        ...state.tasks,
                        [taskId]: updatedTaskData,
                    },
                }));
                toast.success("Task updated successfully!");
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        deleteTask: async (projectId, taskId) => {
            set({ loading: true, error: null });
            try {
                await api.delete(`/v1/projects/${projectId}/tasks/${taskId}`);
                toast.success("Task deleted successfully!");
                await fetchColumn(get().projectId as number);

              
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        deleteColumn: async (columnId: string) => {
            set({ loading: true, error: null });
            try {
                await api.delete(`/v1/boards/${columnId}`);
                await fetchColumn(get().projectId as number);
                toast.success("Column deleted successfully!");
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        moveTask: (sourceColumnId, destinationColumnId, sourceIndex, destinationIndex) =>
            set((state) => {
                // Get source and destination columns
                const sourceColumn = state.columns[sourceColumnId];
                const destinationColumn = state.columns[destinationColumnId];

                // Create copies of the task lists for immutability
                const sourceTasks = [...sourceColumn.taskIds];
                const destinationTasks = [...destinationColumn.taskIds];

                // Remove the task from the source and add it to the destination
                const [movedTaskId] = sourceTasks.splice(sourceIndex, 1);
                destinationTasks.splice(destinationIndex, 0, movedTaskId);

                return {
                    columns: {
                        ...state.columns,
                        [sourceColumnId]: { ...sourceColumn, tasks: sourceTasks },
                        [destinationColumnId]: { ...destinationColumn, tasks: destinationTasks },
                    },
                };
            }),

        reorderColumns: (startIndex, endIndex) =>
            set((state) => {
                const updatedColumnOrder = Array.from(state.columnOrder);
                const [movedColumnId] = updatedColumnOrder.splice(startIndex, 1);
                updatedColumnOrder.splice(endIndex, 0, movedColumnId);
                return { columnOrder: updatedColumnOrder };
            }),
    };
});
