import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import AddMembersField from "./AddMembersField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Task, useKanbanStore } from "../stores/kanbanStore";
import dayjs from "dayjs";

// Zod schema for form validation
const taskSchema = z.object({
  description: z.string().min(1, "Description is required"),
  priority: z.enum(["high", "medium", "low", "highest"]),
  // .optional()
  // .or(z.literal("")),
  // dueDate: z.preprocess(
  //   (arg) => (typeof arg === "string" ? new Date(arg) : arg), // Parse string to Date
  //   z
  //     .date()
  //     .refine(
  //       (date) => date >= new Date(), // Ensure it's not in the future
  //       { message: "Date of birth must be in the future" },
  //     )
  //     .optional()
  //     .or(z.literal("")),
  // ),
  dueDate: z.string().nullable(),
});

// Infer the TypeScript types from the Zod schema
type TaskFormValues = z.infer<typeof taskSchema>;

const EditTask = ({
  onClose,
  task,
  columnId,
}: {
  onClose: () => void;
  task: Task;
  columnId: number;
}) => {
  // useForm with Zod validation schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });
  const [memberId, setMemberId] = useState<number | undefined>();
  const [memberError] = useState("");
  const { loading, editTask } = useKanbanStore();

  useEffect(() => {
    reset({
      description: task.description,
      dueDate: task.due_date
        ? dayjs(task.due_date).format("YYYY-MM-DD")
        : task.due_date,
      priority: task.priority,
    });
  }, []);

  const onSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    // check if assigned member Id exist... if it does proceed else halt the submit process
    // if (memberId == undefined) {
    //   setMemberError("Select project lead");
    //   return;
    // } else {
    //   setMemberError("");
    // }

    // setting data to be passed to the backend
    const editedTask = {
      description: data.description,
      due_date: data.dueDate ? data.dueDate : null,
      priority: data.priority,
      boardId: columnId,
      staffId: memberId,
    };

    console.log("data", editedTask);

    // passing data to backend using editTask function from the KanbanStore
    await editTask(task.id, editedTask);

    // If no errors encounted, close the edit modal
    if (!useKanbanStore.getState().error) {
      onClose();
    }
  };

  return (
    <div className="cursor-default">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="modal-box relative z-20 w-full max-w-md rounded-md bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold">Edit Task</h4>
            <button
              type="button"
              className="text-lg"
              aria-label="Close modal"
              onClick={onClose}
            >
              <Icon icon="material-symbols:close" />
            </button>
          </div>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            {/* task */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label">Task Description</span>
              </div>
              <textarea
                {...register("description")}
                rows={2}
                className="textarea textarea-bordered mt-1 w-full"
              />
              <div className="label">
                {errors.description && (
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </label>

            {/* Task priority */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Task priority</span>
              </div>
              <select
                defaultValue=""
                className="select select-bordered"
                {...register("priority")}
              >
                <option disabled value="">
                  Pick one
                </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="highest">Highest</option>
              </select>
              <div className="label">
                {errors.priority && (
                  <span className="label-text-alt text-error">
                    {errors.priority?.message}
                  </span>
                )}
              </div>
            </label>

            {/* due date */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Due date</span>
              </div>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("dueDate")}
              />
              <div className="label">
                {errors.dueDate && (
                  <span className="label-text-alt text-error">
                    {errors.dueDate?.message}
                  </span>
                )}
              </div>
            </label>

            {/* Assign member */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Assign task to</span>
              </div>
              <AddMembersField getIds={(ids) => setMemberId(ids[0])} />
              <div className="label">
                {memberError && (
                  <span className="label-text-alt text-error">
                    {memberError}
                  </span>
                )}
              </div>
            </label>

            <div className="submit-section mt-4 text-center">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
