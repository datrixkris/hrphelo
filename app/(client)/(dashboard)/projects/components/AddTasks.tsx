import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useKanbanStore } from "../stores/kanbanStore";
import AddMembersField from "./AddMembersField";
import { useState } from "react";

// Zod schema for form validation
const taskSchema = z.object({
  description: z.string().min(1, "Description is required"),
  dueDate: z.string().nullable(),
  priority: z.enum(["high", "medium", "low", "highest"]),
});

// Infer the TypeScript types from the Zod schema
type TaskFormValues = z.infer<typeof taskSchema>;

type AddTaskProps = {
  onClose: () => void;
  columnId: number;
};

export const AddTasks: React.FC<AddTaskProps> = ({ onClose, columnId }) => {
  // useForm with Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
  });

  const [memberId, setMemberId] = useState<number | undefined>();
  const [memberError] = useState("");
  const { addTask, loading } = useKanbanStore();

  const onSubmit: SubmitHandler<TaskFormValues> = async (data) => {
    const newTask = {
      description: data.description,
      due_date: data.dueDate ? data.dueDate : null,
      priority: data.priority,
      boardId: columnId,
      staffId: memberId ? memberId : null,
    };

    console.log("data", newTask);

    await addTask(newTask);

    // If no errors encounted, close the edit modal
    if (!useKanbanStore.getState().error) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="modal-box relative z-20 w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold">Add Task</h4>
          <button
            type="button"
            className="text-lg"
            aria-label="Close modal"
            onClick={onClose}
          >
            <Icon icon="material-symbols:close" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full">
            <span className="label">Task Description *</span>
            <textarea
              {...register("description")}
              rows={2}
              className="textarea textarea-bordered mt-1 w-full"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </label>

          {/* Task priority */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Task priority *</span>
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
                <span className="label-text-alt text-error">{memberError}</span>
              )}
            </div>
          </label>

          <div className="submit-section mt-4 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
