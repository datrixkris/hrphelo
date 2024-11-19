import { useCallback } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Column, useKanbanStore } from "../stores/kanbanStore";
import ColumnComponent from "./ColumnComponent";

export interface IKanbanBoard {
  onEditColumn: (column: Column) => void;
}

const KanbanBoard: React.FC<IKanbanBoard> = ({ onEditColumn }) => {
  const {
    columns,
    columnOrder,
    tasks,
    deleteColumn,
    reorderTasks,
    reorderColumns,
  } = useKanbanStore();

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
              {columnOrder.map((columnId, index) => (
                <ColumnComponent
                  key={columnId}
                  columnId={columnId}
                  index={index}
                  column={columns[columnId]}
                  tasks={tasks}
                  onEditColumn={onEditColumn}
                  deleteColumn={deleteColumn}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
