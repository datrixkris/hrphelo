import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import KanbanBoard from "../Board";
import { AddTaskBoard } from "../AddTaskBoard";
import { Column } from "../../kanbanStore";
import ProgressBar from "../ProgressBar";
import { ProjectData } from "../../types/project-types";

interface TaskboardProps {
  project: ProjectData | null;
}

const Taskboard = ({ project }: TaskboardProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | undefined>();

  const handleEditColumn = (column: Column) => {
    setSelectedColumn(column);
    setModalOpen(true);
  };

  return (
    <div>
      {/* lead and team with create column button */}
      <div className="flex flex-wrap justify-between gap-5">
        {/* teams and lead tin */}
        <div className="">
          <div className="flex gap-4">
            {/* lead */}
            <div className="flex items-center gap-2">
              <p className="font-semibold">Lead</p>

              <div className="tooltip" data-tip={project?.project_lead?.name}>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={project?.project_lead?.image}
                      alt={project?.project_lead?.name}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="">{project?.createdAt}</div>

            {/* Team */}
            <div className="flex items-center gap-2">
              <p className="font-semibold">Team</p>

              <div className="-space-x-4 rtl:space-x-reverse">
                {project?.members?.map((member) => {
                  return (
                    <div
                      className="tooltip"
                      data-tip={member.staff.name}
                      key={member.id}
                    >
                      <div className="avatar">
                        <div className="w-10 rounded-full border">
                          <img
                            src={member.staff.image}
                            alt={member.staff.name}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* create column button */}
        <div className="">
          <button
            className="btn btn-outline"
            onClick={() => setModalOpen(true)}
          >
            <div className="flex items-center gap-1">
              <Icon icon="heroicons:plus" /> Create column
            </div>
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-4 flex items-center gap-2">
        <div className="shrink-0">PROGRESS</div>
        <ProgressBar progress={project?.progress} />
        <div className="shrink-0">{project?.progress}%</div>
      </div>

      {/* taskboard */}
      <div className="mt-5 h-[65vh] text-center">
        <KanbanBoard onEditColumn={handleEditColumn} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddTaskBoard
          column={selectedColumn}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Taskboard;
