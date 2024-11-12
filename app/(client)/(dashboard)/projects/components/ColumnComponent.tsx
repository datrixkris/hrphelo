import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";
import { Column } from "../stores/kanbanStore";
import TaskComponent from "./TaskComponent";
import { useState } from "react";

type ColumnComponentProps = {
  columnId: string;
  index: number;
  column: Column;
  tasks: { [key: string]: any };
  onEditColumn: (column: Column) => void;
  deleteColumn: (id: string) => void;
};

const ColumnComponent: React.FC<ColumnComponentProps> = ({
  columnId,
  index,
  column,
  tasks,
  onEditColumn,
  deleteColumn,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);

  const openModal = (id: number) => {
    setActiveColumnId(id);
    setModalOpen(true);
  };

  return (
    <Draggable draggableId={String(column.id)} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          className="h-full w-60 shrink-0 bg-blue-100 p-4"
        >
          <div className={cn("mb-4 flex items-center justify-between")}>
            <h2 className="text-lg font-semibold text-white">{column.name}</h2>
            <details className="dropdown">
              <summary className="btn btn-ghost text-white">
                <Icon icon="charm:menu-kebab" />
              </summary>
              <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
                <li>
                  <button onClick={() => onEditColumn(column)}>Edit</button>
                </li>
                <li>
                  <button onClick={() => deleteColumn(column.id)}>Delete</button>
                </li>
              </ul>
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
        </div>
      )}
    </Draggable>
  );
};

export default ColumnComponent;
