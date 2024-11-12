import { useState, useCallback, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useKanbanStore } from "../stores/kanbanStore";
import { AddTasks } from "./AddTasks";
import ColumnComponent from "./ColumnComponent";

const KanbanBoard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeColumnId, setActiveColumnId] = useState<number | null>(null);

  const {
    columns,
    columnOrder,
    tasks,
    deleteColumn,
    reorderTasks,
    reorderColumns,
  } = useKanbanStore();

  const openModal = (id: number) => {
    setActiveColumnId(id);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;
      if (!destination) return;

      if (type === "column") {
        reorderColumns(source.index, destination.index);
      } else {
        const startColumn = columns[source.droppableId];
        const finishColumn = columns[destination.droppableId];

        if (!startColumn || !finishColumn) return;

        if (startColumn === finishColumn) {
          reorderTasks(
            startColumn.id,
            undefined,
            undefined,
            source.index,
            destination.index,
          );
        } else {
          reorderTasks(
            startColumn.id,
            finishColumn.id,
            draggableId,
            source.index,
            destination.index,
          );
        }
      }
    },
    [columns, reorderTasks, reorderColumns],
  );

  // Custom hook for handling outside click
  const useOutsideClick = (callback: () => void) => {
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const openDropdowns = document.querySelectorAll(".dropdown[open]");
        openDropdowns.forEach((dropdown) => {
          if (!dropdown.contains(event.target as Node)) {
            dropdown.removeAttribute("open");
          }
        });
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [callback]);
  };

  useOutsideClick(closeModal);

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
              className="flex h-full w-full space-x-8 overflow-x-scroll border"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnOrder.map((columnId, index) => (
                <ColumnComponent
                  key={columnId}
                  columnId={columnId}
                  index={index}
                  column={columns[columnId]}
                  tasks={tasks}
                  onEditColumn={(column) => openModal(Number(column.id))}
                  deleteColumn={deleteColumn}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal */}
      {isModalOpen && activeColumnId && (
        <AddTasks onClose={closeModal} columnId={activeColumnId} />
      )}
    </div>
  );
};

export default KanbanBoard;
