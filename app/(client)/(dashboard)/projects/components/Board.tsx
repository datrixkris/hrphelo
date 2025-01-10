import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Column, useKanbanStore } from "../stores/kanbanStore";
import ColumnComponent from "./ColumnComponent";
import { useParams } from "next/navigation";
import { useProjectDetailsContext } from "./project-details/ProjectDetailsContext";
// import { useProjectStore } from "../stores/project-store";

export interface IKanbanBoard {
  onEditColumn: (column: Column) => void;
}

const KanbanBoard: React.FC<IKanbanBoard> = ({ onEditColumn }) => {
  const params = useParams<{ projectId: string; projectSlug: string }>();

  const projectId = Number(params.projectId);
  const refreshData = useProjectDetailsContext()?.refreshData;
  // const projectSlug = params.projectSlug;

  const {
    columns,
    columnOrder,
    tasks,
    deleteColumn,
    reorderColumns,
    reorderTasks,
  } = useKanbanStore();

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;

    // If dropped outside a valid destination, do nothing
    if (!destination) return;

    // Handle column reordering
    if (type === "column") {
      const newColumnOrder = Array.from(columnOrder);
      const [movedColumnId] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, movedColumnId);

      // Extract slugs (column IDs) and log them
      const formattedSlugs = newColumnOrder.map((slug) => ({ slug }));
      reorderColumns(projectId, formattedSlugs);

      console.log("Formatted Column Slugs:", formattedSlugs);
      return;
    }

    // if the item isn't moved, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // moving tasks between columns and stuff like that
    // get board data and board object keys for source board and destination board
    const { board: start, boardKey: startKey } = findBoardById(
      columns,
      source.droppableId,
    )!;
    const { board: finish, boardKey: finishKey } = findBoardById(
      columns,
      destination.droppableId,
    )!;

    // if item is dragged and dropped within within the same column
    if (start?.id == finish?.id) {
      // rearrange the taasks in the board acordinly
      const newTaskIds = Array.from(start!.taskIds);
      const [movedTaskId] = newTaskIds.splice(source.index, 1); //this here gets the string key used to identify the task in the object.
      newTaskIds.splice(destination.index, 0, movedTaskId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newColumns = {
        ...columns,
        [startKey]: newColumn,
      };

      // save new column data to persist for the ui
      useKanbanStore.setState({ columns: newColumns });

      const updatedTask = tasks[movedTaskId];
      // hit the api to save the arrangement... how this is working to preserve the arrangement beats me
      await reorderTasks(projectId, updatedTask.id, updatedTask);
      return;
    }

    // handle task moving from one board to the other
    // arrange the tasks in the source column/board by removing the task
    const startTaskIds = Array.from(start.taskIds);
    const [movedTaskId] = startTaskIds.splice(source.index, 1);
    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };

    // arrange the tasks in the destination column/board by adding the task
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, movedTaskId);
    const newFinishColumn = {
      ...finish,
      taskIds: finishTaskIds,
    };

    // save the columns and persist in the store
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

    // hit the api to save the arrangement... again, how this is working to preserve the arrangement beats me
    await reorderTasks(projectId, updatedTask.id, updatedTask);
    if (
      finish.name.toLowerCase() === "completed" ||
      start.name.toLowerCase() === "completed"
    ) {
      if (refreshData) {
        refreshData(false);
        console.log("progress updated");
      }
    }
  };

  // function to find board using the boards integer id
  function findBoardById(
    data: { [key: string]: Column }, //all columns data
    boardId: number | string, //integer id
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
