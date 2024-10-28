import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { useKanbanStore } from "../kanbanStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AddTaskBoardProps, Color, colorKeys } from "../types";

export const AddTaskBoard: React.FC<AddTaskBoardProps> = ({
  onClose,
  column,
}) => {
  const [taskBoardName, setTaskBoardName] = useState("");
  const [selectedColor, setSelectedColor] = useState<Color>("orange");

  const colorClassMap: Record<Color, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    orange: "bg-orange-500",
  };

  const { createColumn, editColumn } = useKanbanStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (column) {
      // Assuming you have an updateColumn function in your store
      editColumn(column.id, taskBoardName, selectedColor);
    } else {
      createColumn(taskBoardName, selectedColor);
    }
    console.log({ taskBoardName, selectedColor });
    // Clear the input fields after submission
    setTaskBoardName("");
    setSelectedColor("orange"); // Reset to the default color
    onClose();
  };

  useEffect(() => {
    if (column) {
      setTaskBoardName(column.title);
      setSelectedColor(column.color);
    } else {
      // Reset to defaults when no column is passed
      setTaskBoardName("");
      setSelectedColor("orange");
    }
  }, [column]); // Added column to dependency array

  return (
    <div className="h-full w-full">
      {/* Backdrop to close the modal */}
      <div
        className="fixed inset-0 right-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <dialog open className="modal z-10" aria-labelledby="modal-title">
        <div className="modal-box">
          <div className="mb-4 flex items-center justify-between">
            <h4 id="modal-title" className="modal-title">
              Add Task Board
            </h4>
            <button type="button" className="btn-close" onClick={onClose}>
              <Icon icon="material-symbols:close" className="text-lg" />{" "}
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <label className="form-control mb-4 w-full">
                <div className="label">
                  <span className="label-text">Task Board Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Task Board Name"
                  className="input input-bordered w-full"
                  value={taskBoardName}
                  onChange={(e) => setTaskBoardName(e.target.value)}
                  required
                />
              </label>
              <div className="input-block task-board-color mb-3">
                <label className="col-form-label">Task Board Color</label>
                <div className="flex gap-3">
                  {colorKeys.map((color) => (
                    <label key={color} className="relative flex items-center">
                      <input
                        name="color"
                        type="radio"
                        className="hidden"
                        value={color}
                        checked={selectedColor === color}
                        onChange={() => setSelectedColor(color as Color)}
                      />
                      <span
                        className={cn(
                          "block h-10 w-10 cursor-pointer border-2 border-gray-300",
                          colorClassMap[color],
                        )}
                      >
                        {selectedColor === color && (
                          <span className="absolute inset-0 flex items-center justify-center font-bold text-white">
                            <Icon
                              icon="material-symbols:check"
                              className="text-lg"
                            />
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};
