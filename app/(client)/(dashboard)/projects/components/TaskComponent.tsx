import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../stores/kanbanStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import DropdownComponent from "@/app/components/DropdownComponent";

type TaskComponentProps = {
  taskId: string;
  index: number;
  tasks: { [key: string]: Task };
};

const TaskComponent: React.FC<TaskComponentProps> = ({
  taskId,
  index,
  tasks,
}) => {
  const task = tasks[taskId];
  if (!task) return null;

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps} // Ensure this is applied to the container
          {...provided.dragHandleProps} // Ensure this is applied to the drag handle
          className="mb-2 rounded border bg-white p-2 py-3 text-left text-sm"
        >
          {/* heading */}
          <div className="flex items-start justify-between">
            <p className="l leading-4">{task.description}</p>
            <div className="w-fit shrink-0">
              <DropdownComponent
                dropdownContent={[{ item: "Edit" }, { item: "Delete" }]}
              >
                <Icon
                  icon="charm:menu-kebab"
                  className="!text-xs hover:cursor-pointer"
                />
              </DropdownComponent>
            </div>
          </div>

          {/* due date, priority and members */}
          <div className="mt-5 flex items-end justify-between">
            {/* due date and priority */}
            <div className="text-xs">
              <div className="flex items-center gap-1">
                <Icon icon="heroicons:clock" className="inline-block" />{" "}
                <span>Sept 26</span>
              </div>
              <div className="mt-1 w-fit rounded-lg bg-error/20 px-2 py-0.5">
                <span className="font-bold text-error">High</span>
              </div>
            </div>

            {/* members */}
            <div className="">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
