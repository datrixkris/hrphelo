import { useState, useRef, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Column, useKanbanStore } from "../kanbanStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";
import { useParams } from "next/navigation";
import { useProjectStore } from "../stores/project-store";
import { AddTasks } from "./AddTasks";
import { Color } from "../types";
type KanbanBoardProps = {
  onEditColumn: (column: Column) => void;
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ onEditColumn }) => {
  const params = useParams<{ projectSlug: string }>();
  const { projects, fetchProjects } = useProjectStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [columnId, setColumnId] = useState<number>(0);
  const dropdownRef = useRef<HTMLDetailsElement | null>(null);

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
    columns,
    columnOrder,
    fetchColumn,
    moveTask,
    deleteColumn,
    reorderColumns,
  } = useKanbanStore();

  // Handle the result when a drag ends
  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    if (!destination) return;

    if (type === "column") {
      reorderColumns(source.index, destination.index);
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    moveTask(
      Number(source.droppableId),
      Number(destination.droppableId),
      source.index,
      destination.index,
    );
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.open = false; // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchProjects();
    const project = projects.find(
      (project) => project.slug === params.projectSlug,
    );

    if (project) {
      fetchColumn(project.id);
    } else {
      console.log("Project not found");
    }
  }, [params.projectSlug, fetchProjects, fetchColumn]);

  return (
    <div className="card h-full w-full bg-base-100 p-5">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex h-full w-full space-x-4 overflow-x-scroll border"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];

                return (
                  <Draggable
                    draggableId={String(column.id)}
                    index={index}
                    key={column.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="relative h-72 w-60 shrink-0 bg-blue-100"
                      >
                        <div
                          className={cn(
                            "mb-4 flex items-center justify-between px-2",
                            colorClassMap[column.color] || "bg-gray-500",
                          )}
                        >
                          <h2 className="text-lg font-semibold text-white">
                            {column.name}
                          </h2>
                          <details ref={dropdownRef} className="dropdown">
                            <summary className="b btn btn-ghost text-white">
                              <Icon icon="charm:menu-kebab" />
                            </summary>
                            <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
                              <li>
                                <button onClick={() => onEditColumn(column)}>
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() =>
                                    deleteColumn(Number(column.id))
                                  }
                                >
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </details>
                        </div>
                        <div className="mb-5 p-4">
                          <Droppable
                            droppableId={String(column.id)}
                            type="task"
                          >
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-h-[100px]"
                              >
                                {column.tasks.map((task, index) => (
                                  
                                  <Draggable
                                    key={task.id}
                                    draggableId={String(task.id)}
                                    index={index}
                                     
                                  >
                                    
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-2 rounded-lg bg-white p-2 shadow-md"
                                      >
                                        <div className="flex justify-between font-semibold text-black">
                                          <p>{task.description}</p>{" "}
                                          <Icon icon="mingcute:down-fill" />
                                        </div>
                                        {task.description && (
                                          <p className="text-sm text-gray-600">
                                           
                                            {task.description}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </div>
                        <div className="absolute bottom-3 left-1/2 mt-4 -translate-x-1/2 transform">
                          <button
                            onClick={() => {
                              setModalOpen(true);
                              setColumnId(Number(column.id));
                            }}
                          >
                            Add New Task
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal */}
      {isModalOpen && (
        <AddTasks
          onClose={() => setModalOpen(false)}
          columnId={columnId} // Pass the current columnId
        />
      )}
    </div>
  );
};

export default KanbanBoard;
