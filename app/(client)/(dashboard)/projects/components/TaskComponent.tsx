import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../stores/kanbanStore";

type TaskComponentProps = {
  taskId: string;
  index: number;
  tasks: { [key: string]: Task };
};

const TaskComponent: React.FC<TaskComponentProps> = ({ taskId, index, tasks }) => {
  const task = tasks[taskId];
  if (!task) return null;

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps} // Ensure this is applied to the container
          {...provided.dragHandleProps} // Ensure this is applied to the drag handle
          className="mb-2 rounded-lg bg-white p-2 shadow-md"
        >
          {task.description}
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
