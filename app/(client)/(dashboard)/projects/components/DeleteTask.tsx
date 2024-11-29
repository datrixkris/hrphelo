import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Task, useKanbanStore } from "../stores/kanbanStore";

const DeleteTask = ({ onClose, task }: { onClose: () => void; task: Task }) => {
  const deleteTask = useKanbanStore((state) => state.deleteTask);
  const loading = useKanbanStore((state) => state.loading);

  const handleDeleteTask = async () => {
    await deleteTask(task.id);

    // If no errors encounted, close the delete modal
    if (!useKanbanStore.getState().error) {
      onClose();
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="modal-box relative z-20 w-full max-w-md rounded-md bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold">Delete Task</h4>
            <button
              type="button"
              className="text-lg"
              aria-label="Close modal"
              onClick={onClose}
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          <div className="">
            <p className="text-lg font-semibold">{task.description}</p>
            <p className="text-base">
              Are you sure you want to delete this task? {task.id}
            </p>
          </div>

          <div className="submit-section mt-4 text-center">
            <button
              type="button"
              onClick={handleDeleteTask}
              className="btn btn-error"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
