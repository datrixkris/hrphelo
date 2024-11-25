import { create } from 'zustand';
import { api } from '@/app/axiosApi/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AddColumn, AddTask, ApiResponse, ApiTask, Color } from '../types';

export type Task = {
    id: string;
    name: string;
    description: string;
    boardId?: number;
};

export type Column = {
    id: string;
    name: string;
    color: Color;
    description: string;
    taskIds: string[];
};

interface ApiErrorResponse {
    message?: string;
    code?: number;
}

type ColumnOrder = { slug: string }[];


interface KanbanState {
    tasks: { [key: string]: Task };
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
    reorderColumns: (startIndex: number, newColumnOrder: ColumnOrder) => void;

    reorderTasks: (
        startColumnId: string,
        finishColumnId?: string,
        taskId?: string,
        sourceIndex?: number,
        destinationIndex?: number
    ) => void;
}

export const useKanbanStore = create<KanbanState>((set, get) => {
    const setLoading = (loading: boolean) => set({ loading });
    const setError = (error: string | null) => set({ error });

    const handleApiError = (error: AxiosError<ApiErrorResponse>) => {
        const message = error?.response?.data?.message || error.message;
        toast.error(message);
        setError(message);
        console.error("API Error:", error);
    };

    const updateStoreWithFetchedData = (data: ApiResponse) => {
        const columnsById: { [key: string]: Column } = {};
        const tasksById: { [key: string]: Task } = {};
        const columnOrder = Object.keys(data); // Retrieve the keys as column order

        columnOrder.forEach((columnKey) => {
            const columnData = data[columnKey];
            const taskIds = Object.keys(columnData.tasks);

            // Map column data
            columnsById[columnKey] = {
                id: columnData.id.toString(),
                name: columnData.name,
                color: columnData.color,
                description: columnData.description,
                taskIds, // List of task IDs for ordering
            };

            // Map each task in the column
            Object.entries(columnData.tasks).forEach(([taskKey, taskData]) => {
                const task = taskData as ApiTask;
                tasksById[taskKey] = {
                    id: task.id.toString(),
                    name: task.slug,
                    description: task.description,
                    boardId: task.boardId,
                };
            });
        });

        set({
            columns: columnsById,
            columnOrder,
            tasks: tasksById,
            loading: false
        });
    };


    const fetchColumn = async (projectId: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = (await api.get(`/v1/projects/${projectId}/boards`)).data;
            set({ projectId });
            updateStoreWithFetchedData(response);
        } catch (err) {
            handleApiError(err as AxiosError<ApiErrorResponse>);
        } finally {
            setLoading(false);
        }
    };

    const performApiUpdate = async (action: () => Promise<void>, successMessage: string) => {
        setLoading(true);
        setError(null);
        const projectId = get().projectId;
        if (!projectId) {
            setError("Project ID is not set");
            setLoading(false);
            return;
        }
        try {
            await action();
            toast.success(successMessage);
            await fetchColumn(projectId);
        } catch (err) {
            handleApiError(err as AxiosError<ApiErrorResponse>);
        } finally {
            setLoading(false);
        }
    };

    return {
        tasks: {},
        projectId: null,
        columns: {},
        columnOrder: [],
        loading: false,
        error: null,

        fetchColumn,

        addColumn: async (data) => {
            await performApiUpdate(
                () => api.post(`/v1/projects/${get().projectId}/boards`, data),
                "Column added successfully!"
            );
        },

        editColumn: async (data) => {
            await performApiUpdate(
                () => api.put(`/v1/projects/${get().projectId}/boards`, data),
                "Column updated successfully!"
            );
        },

        addTask: async (data) => {
            await performApiUpdate(
                () => api.post(`/v1/projects/${get().projectId}/tasks`, data),
                "Task added successfully!"
            );
        },

        editTask: async (projectId, taskId, updatedTask) => {
            await performApiUpdate(
                () => api.put(`/v1/projects/${projectId}/tasks/${taskId}`, updatedTask),
                "Task updated successfully!"
            );
        },

        deleteTask: async (projectId, taskId) => {
            await performApiUpdate(
                () => api.delete(`/v1/projects/${projectId}/tasks/${taskId}`),
                "Task deleted successfully!"
            );
        },

        deleteColumn: async (columnId) => {
            await performApiUpdate(
                () => api.delete(`/v1/boards/${columnId}`),
                "Column deleted successfully!"
            );
        },

        reorderColumns: async (projectId, newColumnOrder:ColumnOrder) => {
            console.log("oder:",newColumnOrder);
            
            await performApiUpdate(
                () => api.patch(`/v1/projects/${projectId}/boards`, newColumnOrder),
                "Column updated successfully!"
            );
        },



        reorderTasks: (startColumnId, finishColumnId, taskId, sourceIndex, destinationIndex) => {
            set((state) => {
                const startColumn = state.columns[startColumnId];
                if (!startColumn || sourceIndex == null || destinationIndex == null) return {};

                // Reorder within the same column
                if (!finishColumnId || finishColumnId === startColumnId) {
                    const updatedTaskIds = Array.from(startColumn.taskIds);
                    const [movedTaskId] = updatedTaskIds.splice(sourceIndex, 1);
                    updatedTaskIds.splice(destinationIndex, 0, movedTaskId);
                    return {
                        columns: {
                            ...state.columns,
                            [startColumnId]: {
                                ...startColumn,
                                taskIds: updatedTaskIds,
                            },
                        },
                    };
                }
                // Reorder across different columns
                else {
                    const finishColumn = state.columns[finishColumnId];
                    if (!finishColumn || !taskId) return {};

                    const startTaskIds = Array.from(startColumn.taskIds);
                    const finishTaskIds = Array.from(finishColumn.taskIds);

                    startTaskIds.splice(sourceIndex, 1);
                    finishTaskIds.splice(destinationIndex, 0, taskId);

                    return {
                        columns: {
                            ...state.columns,
                            [startColumnId]: {
                                ...startColumn,
                                taskIds: startTaskIds,
                            },
                            [finishColumnId]: {
                                ...finishColumn,
                                taskIds: finishTaskIds,
                            },
                        },
                    };
                }
            });
        }
    };
});
