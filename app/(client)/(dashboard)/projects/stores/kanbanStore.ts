import { create } from "zustand";
import { api } from "@/app/axiosApi/api";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AddColumn, AddTask, ApiResponse, ApiTask, Color } from "../types";

export type Task = {
  id: string;
  name: string;
  description: string;
  boardId?: number;
  due_date?: string | null;
  priority?: "high" | "highest" | "medium" | "low";
  staffId?: number;
  slug: string;
  assignee?: {
    id: number;
    name: string;
    email: string;
    image: string;
  };
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
  editTask: (
    // projectId: number,
    taskId: string,
    updatedTask: Partial<Task>,
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>;
  reorderColumns: (startIndex: number, newColumnOrder: ColumnOrder) => void;
  reorderTasks: (projectId: number, taskId: string, updateTask: Task) => void;
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
          staffId: task.staffId,
          due_date: task.due_date,
          priority: task.priority,
          assignee: task.assignee,
          slug: task.slug,
        };
      });
    });

    set({
      columns: columnsById,
      columnOrder,
      tasks: tasksById,
      loading: false,
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

  const performApiUpdate = async (
    action: () => Promise<void>,
    successMessage?: string,
  ) => {
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
      if (successMessage) {
        toast.success(successMessage);
      }
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
        "Column added successfully!",
      );
    },

    editColumn: async (data) => {
      await performApiUpdate(
        () => api.put(`/v1/projects/${get().projectId}/boards`, data),
        "Column updated successfully!",
      );
    },

    addTask: async (data) => {
      await performApiUpdate(() =>
        api.post(`/v1/projects/${get().projectId}/tasks`, data),
      );
    },

    editTask: async (taskId, updatedTask) => {
      await performApiUpdate(() =>
        api.put(`/v1/projects/${get().projectId}/tasks/${taskId}`, updatedTask),
      );
    },

    deleteTask: async (taskId) => {
      await performApiUpdate(() =>
        api.delete(`/v1/projects/${get().projectId}/tasks/${taskId}`),
      );
    },

    deleteColumn: async (columnId) => {
      await performApiUpdate(
        () => api.delete(`/v1/boards/${columnId}`),
        "Column deleted successfully!",
      );
    },

    reorderColumns: (projectId, newColumnOrder: ColumnOrder) => {
      // Optimistically update the store
      const prevColumnOrder = get().columnOrder;

      set({ columnOrder: newColumnOrder.map((col) => col.slug) });

      // Make the API request
      performApiUpdate(
        async () => {
          await api.patch(`/v1/projects/${projectId}/boards`, newColumnOrder);
        },
        // "Column order updated successfully!"
      ).catch(() => {
        // Revert the store if the API call fails
        set({ columnOrder: prevColumnOrder });
        toast.error("Failed to update column order. Reverting changes.");
      });
    },

    reorderTasks: async (
      projectId: number,
      taskId: string,
      updateTask: Task,
    ) => {
      // Update the store first for an instant UI response
      // set((state) => {
      //   const columns = { ...state.columns };
      //   const tasks = { ...state.tasks };

      //   // Remove task from the source column
      //   Object.keys(columns).forEach((columnId) => {
      //     const taskIndex = columns[columnId].taskIds.indexOf(taskId);
      //     if (taskIndex !== -1) {
      //       columns[columnId].taskIds.splice(taskIndex, 1);
      //     }
      //   });

      //   // Add task to the destination column (newBoardId corresponds to columnId)
      //   const destinationColumn = columns[updateTask.newBoardId.toString()];
      //   if (destinationColumn) {
      //     destinationColumn.taskIds.push(taskId);
      //   }

      //   // Update the task details in the store
      //   tasks[taskId] = {
      //     ...tasks[taskId],
      //     name: updateTask.name,
      //     description: updateTask.description,
      //     boardId: updateTask.newBoardId,
      //   };

      //   return { columns, tasks };
      // });

      // Send the changes to the backend
      await performApiUpdate(() =>
        api.put(
          `/v1/projects/${projectId}/tasks/${Number(taskId)}`,
          updateTask,
        ),
      );
    },
  };
});
