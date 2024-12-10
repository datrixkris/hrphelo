import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Column, useKanbanStore } from "../stores/kanbanStore";
import ColumnComponent from "./ColumnComponent";
import { useParams } from "next/navigation";

export interface IKanbanBoard {
  onEditColumn: (column: Column) => void;
}

const KanbanBoard: React.FC<IKanbanBoard> = ({ onEditColumn }) => {
  const params = useParams<{ projectId: string; projectSlug: string }>();

  const projectId = Number(params.projectId);

  const {
    columns,
    columnOrder,
    tasks,
    deleteColumn,
    reorderColumns,
    reorderTasks,
  } = useKanbanStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    // If dropped outside a valid destination, do nothing
    if (!destination) return;

    // Handle column reordering
    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      const [movedColumnId] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, movedColumnId);

      // Update column order in the store

      // Extract slugs (column IDs) and log them
      const formattedSlugs = newColumnOrder.map((slug) => ({ slug }));
      reorderColumns(projectId, formattedSlugs);

      console.log("Formatted Column Slugs:", formattedSlugs);
      return;
    }

    // board source and destination are the same, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving tasks between columns
    const { board: start, boardKey: startKey } = findBoardById(
      columns,
      source.droppableId,
    )!;
    const { board: finish, boardKey: finishKey } = findBoardById(
      columns,
      destination.droppableId,
    )!;
    console.log(
      "these aer the collumns :",
      columns,
      start,
      finish,
      source,
      tasks,
    );

    // if within the same column
    if (start?.id == finish?.id) {
      const newTaskIds = Array.from(start!.taskIds);
      const [movedTaskId] = newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, movedTaskId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newColumns = {
        ...columns,
        [startKey]: newColumn,
      };

      useKanbanStore.setState({ columns: newColumns });
      console.log(columns, newColumns);
      return;
    }

    // handle task moving from one board to the other
    const startTaskIds = Array.from(start.taskIds);
    const [movedTaskId] = startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, movedTaskId);
    const newFinishColumn = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newColumns = {
      ...columns,
      [startKey]: newStartColumn,
      [finishKey]: newFinishColumn,
    };
    useKanbanStore.setState({ columns: newColumns });

    const updatedTask = {
      ...tasks[movedTaskId],
      boardId: Number(newFinishColumn.id),
    };

    console.log(updatedTask, draggableId, newFinishColumn.id);
    reorderTasks(projectId, draggableId, updatedTask);
  };

  function findBoardById(
    data: { [key: string]: Column },
    boardId: number | string,
  ) {
    for (const boardKey in data) {
      const board = data[boardKey];
      if (board.id === boardId) {
        return { board, boardKey }; // Return the board directly
      }
    }
    return null; // Return null if no matching board is found
  }

  return (
    <div className="h-full w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex space-x-4 overflow-x-scroll"
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
