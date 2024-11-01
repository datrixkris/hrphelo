import { create } from 'zustand';
import { api } from '@/app/axiosApi/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { AddColumn, AddTask } from './types';

export type Task = {
    id: string;
    name: string;
    description: string;
    boardId?: number
};


export type Column = {
    id: string; // Changed to string for consistency
    name: string;
    color: string;
    description: string;
    tasks: Task[];
};

interface ApiErrorResponse {
    message?: string;
    code?: number;
}

interface KanbanState {
    columns: { [key: string]: Column }; // Changed key type to string
    projectId: number | null; // Consistent type
    columnOrder: number[];
    loading: boolean;
    error: string | null;

    fetchColumn: (projectId: number) => Promise<void>;
    addColumn: (data: AddColumn) => Promise<void>;
    editColumn: (data: AddColumn) => Promise<void>;
    addTask: (data: AddTask) => Promise<void>;
    editTask: (projectId: number, taskId: string, updatedTask: Partial<Task>) => Promise<void>;
    deleteTask: (projectId: number, taskId: string) => Promise<void>;
    deleteColumn: (columnId: number) => void;
    moveTask: (sourceColumnId: number, destinationColumnId: number, sourceIndex: number, destinationIndex: number) => void;
    reorderColumns: (startIndex: number, endIndex: number) => void;
}

export const useKanbanStore = create<KanbanState>((set, get) => {
    const handleError = (error: AxiosError<ApiErrorResponse>) => {
        const errorMessage = error?.response?.data?.message ?? error.message;
        toast.error(errorMessage);
        console.error(error); // Log for debugging
        return errorMessage;
    };

    const findColumnId = (taskId: string) => {
        const columnId = Object.keys(get().columns).find((key) =>
            get().columns[+key].tasks.some((task) => task.id === taskId)
        );
        return columnId;
    };

    const fetchColumn = async (projectId: number) => {
        set({ projectId, loading: true, error: null });
        try {
            const response = (await api.get(`/v1/projects/${projectId}/boards`)).data;
            const columnOrder = Object.keys(response).map(Number);

            const columnsById = columnOrder.reduce((acc: { [key: string]: Column }, columnId: number) => {
                const columnData = response[columnId];
                acc[columnId] = {
                    id: columnData.id.toString(), // Ensure id is a string
                    name: columnData.name,
                    color: columnData.color,
                    description: columnData.description,
                    tasks: columnData.tasks || [],
                };
                return acc;
            }, {});

            set({ columns: columnsById, columnOrder, loading: false });
        } catch (err) {
            set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
        }
    };

    return {
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

                await fetchColumn(get().projectId as number); // Type assertion
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },
        editColumn: async (data) => {
            set({ loading: true, error: null });
            try {
                await api.post(`/v1/projects/${get().projectId}/boards`, data);
                toast.success("Column added successfully!");

                // await fetchColumn();
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        addTask: async (data) => {
            set({ loading: true, error: null });
            try {
                await api.post(`/v1/projects/${get().projectId}/tasks`, data);
                await fetchColumn(get().projectId as number);


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

                set((state) => {
                    const columnId = findColumnId(taskId);
                    if (!columnId) return state;

                    const updatedTasks = state.columns[columnId].tasks.map((task) =>
                        task.id === taskId ? { ...task, ...updatedTaskData } : task
                    );

                    return {
                        columns: {
                            ...state.columns,
                            [columnId]: { ...state.columns[columnId], tasks: updatedTasks },
                        },
                    };
                });
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

                set((state) => {
                    const columnId = findColumnId(taskId);
                    if (!columnId) return state;

                    const updatedTasks = state.columns[columnId].tasks.filter((task) => task.id !== taskId);

                    return {
                        columns: {
                            ...state.columns,
                            [columnId]: { ...state.columns[columnId], tasks: updatedTasks },
                        },
                    };
                });
                toast.success("Task deleted successfully!");
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        deleteColumn: async (columnId) => {
            set({ loading: true, error: null });
            try {
                await api.delete(`/v1/boards/${columnId}`);

                await fetchColumn(get().projectId as number);

                toast.success("Task deleted successfully!");
            } catch (err) {
                set({ error: handleError(err as AxiosError<ApiErrorResponse>), loading: false });
            } finally {
                set({ loading: false });
            }
        },

        moveTask: (sourceColumnId, destinationColumnId, sourceIndex, destinationIndex) =>
            set((state) => {
                const sourceColumn = state.columns[sourceColumnId];
                const destinationColumn = state.columns[destinationColumnId];

                const sourceTasks = Array.from(sourceColumn.tasks);
                const [removedTask] = sourceTasks.splice(sourceIndex, 1);

                const destinationTasks = Array.from(destinationColumn.tasks);
                destinationTasks.splice(destinationIndex, 0, removedTask);

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
