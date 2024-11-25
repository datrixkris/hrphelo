import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../stores/kanbanStore";
import { Icon } from "@iconify/react/dist/iconify.js";

type TaskComponentProps = {
  taskId: string;
  index: number;
  tasks: { [key: string]: Task };
};

const TaskComponent: React.FC<TaskComponentProps> = ({
  taskId,
  index,
  tasks,
}) => {
  const task = tasks[taskId];
  if (!task) return null;

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps} // Ensure this is applied to the container
          {...provided.dragHandleProps} // Ensure this is applied to the drag handle
          className="group mb-2 rounded bg-white p-2 shadow-md"
        >
          <div className="flex w-full text-left">
            <div className="flex-1">
              {" "}
              <p>{task.description}</p>
            </div>
            <div>
              <div className="relative hidden text-left group-hover:inline-block">
                <div className="group">
                  <button type="button" className="px-4 py-2 text-primary">
                    <Icon icon="octicon:kebab-horizontal-24" />{" "}
                  </button>

                  {/* <!-- Dropdown menu --> */}
                  <div className="invisible absolute right-0 mt-1 w-40 z-50 origin-top-left divide-y divide-gray-100 rounded-md bg-white opacity-0 shadow-lg transition duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Option 1
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Option 2
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Option 3
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dropdown hidden group-hover:inline">
                <div tabIndex={0} role="button" className="m-1"></div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-end">
            <div className="avatar">
              <div className="w-6 rounded-full">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  alt="Tailwind-CSS-Avatar-component"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskComponent;
