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
    // reorderTasks
  } = useKanbanStore();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

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
    }

    // Handle task reordering within a column or across columns
    // if (type === "task") {
    //   console.log("task");
      
    //   const { draggableId: taskId } = result;
    //   const sourceColumnId = source.droppableId;
    //   const destinationColumnId = destination.droppableId;
    
    //   // Skip if the task wasn't moved
    //   if (sourceColumnId === destinationColumnId && source.index === destination.index) return;
    
    //   const task = tasks[taskId];
    
    //   // Prepare the update payload
    //   const updateTask = {
    //     name: task.name,
    //     description: task.description,
    //     newBoardId: Number(destinationColumnId),
    //   };
    
    //   // Call the store's reorderTasks function
    //   reorderTasks(projectId, taskId, updateTask);
    // }
    
  };

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
              className="flex h-full w-full space-x-4 overflow-x-scroll"
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
