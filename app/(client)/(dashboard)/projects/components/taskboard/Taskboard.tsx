// import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import KanbanBoard from "../Board";
import { AddTaskBoard } from "../AddTaskBoard";
import { Column } from "../../types";



const Taskboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | undefined>();

  const handleEditColumn = (column: Column) => {
    setSelectedColumn(column);
    setModalOpen(true);
  };

  return (
    <div>
      {/* lead and team with create column button */}
      <div className="flex justify-between">
        {/* teams and lead tin */}
        <div className="">
          <div className="flex gap-4">
            {/* lead */}
            <div className="flex items-center gap-2">
              <p className="font-semibold">Lead</p>

              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-10 bg-neutral text-neutral-content">
                    <span>
                      <Icon icon="heroicons:plus" className="text-2xl" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="flex items-center gap-2">
              <p className="font-semibold">Team</p>

              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-10">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="w-10 bg-neutral text-neutral-content">
                    <span>
                      <Icon icon="heroicons:plus" className="text-2xl" />
                    </span>
                  </div>
                </div>
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
        <progress
          className="progress progress-success w-full"
          value="40"
          max="100"
        ></progress>
        <div className="shrink-0">40%</div>
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
