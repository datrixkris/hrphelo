import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useKanbanStore } from "../kanbanStore";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";
import { AddTask } from "./AddTask";

const KanbanBoard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const {
    tasks,
    columns,
    columnOrder,
    moveTask,
    deleteColumn,
    reorderColumns,
  } = useKanbanStore();

  // Handle the result when a drag ends
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    // If no destination, do nothing
    if (!destination) return;

    // Handle column reordering
    if (type === "column") {
      reorderColumns(source.index, destination.index);
      return;
    }

    // Handle task reordering (within or between columns)
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // If the task is dropped in the same position
    }

    moveTask(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
    );
  };

  return (
    <div className="card h-full bg-base-100 p-5">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex space-x-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                const tasksInColumn = column.taskIds.map(
                  (taskId) => tasks[taskId],
                );

                return (
                  <Draggable
                    draggableId={column.id}
                    index={index}
                    key={column.id}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`w-64 bg-blue-100`}
                      >
                        <div
                          className={cn(
                            "mb-4 flex items-center justify-between bg-blue-600 px-2",
                            {},
                          )}
                        >
                          <h2 className="text-lg font-semibold text-white">
                            {column.title}
                          </h2>

                          <details className="dropdown">
                            <summary className="btn btn-ghost">
                              {" "}
                              <Icon icon="charm:menu-kebab" />
                            </summary>
                            <ul className="menu dropdown-content z-[1] w-32 rounded-box bg-base-100 p-2 shadow">
                              <li>
                                <a>Edit</a>
                              </li>
                              <li>
                                <a onClick={() => deleteColumn(column.id)}>
                                  Delete
                                </a>
                              </li>
                            </ul>
                          </details>
                        </div>
                        <div className="p-4">
                          {" "}
                          <Droppable droppableId={column.id} type="task">
                            {(provided) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-h-[100px]"
                              >
                                {tasksInColumn.map((task, index) => (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-2 rounded-lg bg-white p-2 shadow-md"
                                      >
                                        {task.content}
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          <div className="mt-4">
                            <button
                              className="mt-4"
                              onClick={() => setModalOpen(true)}
                            >
                              Add New Task
                            </button>
                          </div>
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
      {isModalOpen && <AddTask onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default KanbanBoard;
