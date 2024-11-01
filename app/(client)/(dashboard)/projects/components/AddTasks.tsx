import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useKanbanStore } from "../kanbanStore";

// Zod schema for form validation
const taskSchema = z.object({
  name: z.string().min(1, "Task Name is required"),
  description: z.string(),
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

  const { addTask } = useKanbanStore();

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    // Create a new task object based on form data
    const newTask = {
      name: data.name,
      description: data.description,
      boardId: columnId,
    };

    addTask(newTask);
    onClose();
  };

  return (
    <div className="h-full w-full">
      <div
        className="fixed right-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <dialog
        open
        className="modal z-10"
        id="my_modal_2"
        aria-labelledby="modal-title"
      >
        <div className="modal-box">
          <div className="mb-4 flex items-center justify-between">
            <h4 id="modal-title" className="modal-title">
              Add Task
            </h4>
            <button type="button" className="btn-close" onClick={onClose}>
              <Icon icon="material-symbols:close" className="text-lg" />
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Task Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Task Name"
                  className="input input-bordered w-full"
                  {...register("name")}
                />
                {errors.name && (
                  <div className="label-text-alt text-red-500">
                    {errors.name.message}
                  </div>
                )}
              </label>

              <label className="form-control w-full">
                <div className="label">Task Description</div>
                <textarea
                  {...register("description")}
                  rows={4}
                  className="textarea textarea-bordered mt-1 w-full"
                />
              </label>

              <div className="submit-section mt-4 text-center">
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
