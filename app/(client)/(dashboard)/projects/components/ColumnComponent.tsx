import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Column, Task } from "../stores/kanbanStore";
import TaskComponent from "./TaskComponent";
import { useRef, useState } from "react";
import { AddTasks } from "./AddTasks";

type ColumnComponentProps = {
  columnId: string;
  index: number;
  column: Column;
  tasks: { [key: string]: Task };
  onEditColumn: (column: Column) => void;
  deleteColumn: (id: string) => void;
};

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  index,
  column,
  tasks,
  onEditColumn,
  deleteColumn,
}) => {
  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const modalRef = useRef<HTMLDivElement>(null);

  // Toggle Modal
  const openModal = (id: number) => setActiveColumnId(id);
  const closeModal = () => setActiveColumnId(null);

  return (
    <Draggable draggableId={String(column.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex w-60 shrink-0 flex-col bg-base-100"
        >
          <div
            {...provided.dragHandleProps}
            className="group sticky top-0 z-20 mb-2 flex items-center justify-between bg-base-100 px-2 py-3 shadow-[rgba(0,0,15,0.2)_0px_0px_10px_0]"
          >
            <h2 className="font-semibold text-primary">{column.name}</h2>
            <div className="dropdown hidden group-hover:inline-block">
              <div className="px-2 py-1 text-primary">
                <Icon
                  icon="octicon:kebab-horizontal-24"
                  onClick={toggleDropdown}
                />{" "}
              </div>
              {isDropdownOpen && (
                <ul
                  tabIndex={0}
                  className="absolute right-1 top-7 z-10 w-32 rounded bg-base-100 p-2 shadow"
                >
                  <li className="hover:bg-base-200">
                    <button
                      onClick={() => onEditColumn(column)}
                      className="h-full w-full"
                    >
                      Edit
                    </button>
                  </li>

                  {!(
                    column.name === "To Do" ||
                    column.name === "Completed" ||
                    column.name === "In Progress"
                  ) && (
                    <li className="hover:bg-base-200">
                      <button
                        onClick={() => deleteColumn(column.id)}
                        className="h-full w-full"
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <Droppable droppableId={String(column.id)} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[300px] grow px-2"
              >
                {column.taskIds.map((taskId, index) => (
                  <TaskComponent
                    key={taskId}
                    taskId={taskId}
                    index={index}
                    tasks={tasks}
                    columnId={Number(column.id)}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {column.name === "To Do" && (
            <div className="p-2 pb-4">
              <button
                onClick={() => openModal(Number(column.id))}
                className="btn btn-ghost btn-sm mt-2 w-full"
              >
                <Icon icon="heroicons:plus" />
                Add Task
              </button>
            </div>
          )}

          {/* Modal */}
          {activeColumnId !== null && (
            <div ref={modalRef}>
              <AddTasks onClose={closeModal} columnId={activeColumnId} />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
