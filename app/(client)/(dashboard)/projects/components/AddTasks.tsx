import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useKanbanStore } from "../stores/kanbanStore";

// Zod schema for form validation
const taskSchema = z.object({
  description: z.string().min(1, "Description is required"),
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
    const newTask = {
      description: data.description,
      boardId: columnId,
    };

    addTask(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="modal-box relative z-20 p-6 bg-white rounded-md shadow-lg max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
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
            <span className="label">Task Description</span>
            <textarea
              {...register("description")}
              rows={4}
              className="textarea textarea-bordered mt-1 w-full"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </label>
          <div className="submit-section mt-4 text-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
