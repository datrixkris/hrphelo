import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../stores/kanbanStore";
import { Icon } from "@iconify/react/dist/iconify.js";
// import DropdownComponent from "@/app/components/DropdownComponent";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { useEffect, useRef, useState } from "react";
import PriorityComponent from "./PriorityComponent";
import dayjs from "dayjs";

type TaskComponentProps = {
  taskId: string;
  index: number;
  tasks: { [key: string]: Task };
  columnId: number;
};

const TaskComponent: React.FC<TaskComponentProps> = ({
  taskId,
  index,
  tasks,
  columnId,
}) => {
  const task = tasks[taskId];
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!task) return null;
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps} // Ensure this is applied to the container
          {...provided.dragHandleProps} // Ensure this is applied to the drag handle
          className="relative mb-2 rounded border bg-white p-2 py-3 text-left text-sm"
        >
          {/* heading */}
          <div className="flex items-start justify-between">
            <p className="l leading-4">{task.description}</p>
            <div className="w-fit shrink-0">
              {/* <DropdownComponent
                dropdownContent={[{ item: "Edit" }, { item: "Delete" }]}
              > */}
              <Icon
                onClick={toggleDropdown}
                icon="charm:menu-kebab"
                className="!text-xs hover:cursor-pointer"
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-1 top-7 z-10 w-28 border bg-white shadow-sm"
                >
                  <div
                    onClick={() => {
                      setShowEdit(true), toggleDropdown();
                    }}
                    className="cursor-pointer px-3 py-1 hover:bg-neutral-200"
                  >
                    Edit
                  </div>
                  <div
                    onClick={() => {
                      setShowDelete(true), toggleDropdown();
                    }}
                    className="cursor-pointer px-3 py-1 hover:bg-neutral-200"
                  >
                    Delete
                  </div>
                </div>
              )}
              {/* </DropdownComponent> */}
            </div>
          </div>

          {/* due date, priority and members */}
          <div className="mt-5 flex items-end justify-between">
            {/* due date and priority */}
            <div className="text-xs">
              <div className="flex items-center gap-1">
                <Icon
                  icon="heroicons:clock"
                  className="inline-block shrink-0"
                />{" "}
                <span>
                  {task.due_date
                    ? dayjs(task.due_date).format("MMM D")
                    : "Not set"}
                </span>
              </div>
              {task.priority ? (
                <PriorityComponent priority={task.priority} />
              ) : (
                ""
              )}
            </div>

            {/* members */}
            <div className="">
              <div
                className="tooltip tooltip-left"
                data-tip={
                  task.assignee?.name ? task.assignee?.name : "Not assigned"
                }
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    {task.assignee ? (
                      <img src={task.assignee.image} />
                    ) : (
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit task modal */}
          {showEdit && (
            <EditTask
              onClose={() => setShowEdit(false)}
              task={task}
              columnId={columnId}
            />
          )}

          {/* delete task modal */}
          {showDelete && (
            <DeleteTask onClose={() => setShowDelete(false)} task={task} />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
