import { cn } from "@/utils/cn";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AddTaskBoardProps, Color, colorKeys, AddColumn } from "../types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKanbanStore } from "../stores/kanbanStore";

const boardSchema = z.object({
  name: z
    .string()
    .min(1, "Task board name is required")
    .max(50, "Task board name must be less than 50 characters"),
  // color: z.enum([
  //   "red",
  //   "blue",
  //   "green",
  //   "yellow",
  //   "indigo",
  //   "purple",
  //   "pink",
  //   "orange",
  // ]),
  description: z.string().min(1, "Task description is required"),
});

export const AddTaskBoard: React.FC<AddTaskBoardProps> = ({
  onClose,
  column,
}) => {
  // Ensure selectedColor has a valid default
  const [selectedColor, setSelectedColor] = useState<Color>("orange"); // Default color set to 'orange'

  const { addColumn, editColumn } = useKanbanStore();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddColumn>({
    resolver: zodResolver(boardSchema),
  });

  useEffect(() => {
    if (column) {
      setValue("name", column.name);
      setValue("color", column.color);
      setValue("description", column.description);
      if (column.color) {
        setSelectedColor(column.color); // Ensure selectedColor is set from column
      }
    }
  }, [column, setValue]);

  const onSubmit = (data: AddColumn) => {
    // Ensure color from data matches selectedColor if using state
    const columnData = {
      name: data.name,
      color: selectedColor, // Use selectedColor for the color field
      description: data.description,
    };

    if (column) {
      editColumn(columnData);
    } else {
      addColumn(columnData); // Use columnData to include color
    }
    onClose();
  };

  return (
    <div className="h-full w-full">
      <div className="fixed inset-0 right-0 opacity-50" onClick={onClose}></div>
      <dialog open className="modal z-10" aria-labelledby="modal-title">
        <div className="modal-box">
          <div className="mb-4 flex items-center justify-between">
            <h4 id="modal-title" className="modal-title">
              {column ? "Edit Task Board" : "Add Task Board"}
            </h4>
            <button type="button" className="btn-close" onClick={onClose}>
              <Icon icon="material-symbols:close" className="text-lg" />
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="form-control mb-4 w-full">
                <div className="label">
                  <span className="label-text">Task Board Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Task Board Name"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </label>
              <label className="form-control mb-4 w-full">
                <div className="label">
                  <span className="label-text">Task Board Description</span>
                </div>
                <input
                  type="text"
                  placeholder="Task Board Description"
                  className="input input-bordered w-full"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </label>
              <div className="input-block task-board-color mb-3">
                <label className="col-form-label">Task Board Color</label>
                <div className="flex gap-3">
                  {colorKeys.map((color) => (
                    <label key={color} className="relative flex items-center">
                      <input
                        // {...register("color")}
                        type="radio"
                        value={color}
                        className="hidden"
                        onChange={() => setSelectedColor(color as Color)} // Update selectedColor
                      />
                      <span
                        className={cn(
                          "block h-10 w-10 cursor-pointer border-2 border-gray-300",
                          colorClassMap[color],
                          selectedColor === color
                            ? "ring-2 ring-black ring-offset-2"
                            : "",
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
                {errors.color && (
                  <p className="text-sm text-red-500">{errors.color.message}</p>
                )}
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
