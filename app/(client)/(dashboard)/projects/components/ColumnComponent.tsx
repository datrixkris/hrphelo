import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Column, Task } from "../stores/kanbanStore";
import TaskComponent from "./TaskComponent";
import { useEffect, useRef, useState } from "react";
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
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Toggle Modal
  const openModal = (id: number) => setActiveColumnId(id);
  const closeModal = () => setActiveColumnId(null);

  // Handle Outside Click
  const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback]);
  };
  useOutsideClick(modalRef, closeModal);

  return (
    <Draggable draggableId={String(column.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="w-60 shrink-0 bg-blue-100 px-2"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">{column.name}</h2>
            <details
              className="dropdown"
              open={isDropdownOpen}
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <summary
                className="btn btn-ghost text-white"
                aria-expanded={isDropdownOpen}
              >
                <Icon icon="charm:menu-kebab" />
              </summary>
              {isDropdownOpen && (
                <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
                  <li>
                    <button onClick={() => onEditColumn(column)}>Edit</button>
                  </li>
                  <li>
                    <button onClick={() => deleteColumn(column.id)}>Delete</button>
                  </li>
                </ul>
              )}
            </details>
          </div>
          <Droppable droppableId={String(column.id)} type="task">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[100px]"
              >
                {column.taskIds.map((taskId, index) => (
                  <TaskComponent
                    key={taskId}
                    taskId={taskId}
                    index={index}
                    tasks={tasks}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            onClick={() => openModal(Number(column.id))}
            className="btn btn-primary btn-sm mt-2 w-full"
          >
            Add Task
          </button>
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
