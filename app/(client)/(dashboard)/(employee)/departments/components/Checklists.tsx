import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import AddChecklistForm from "./AddChecklistForm";

const Checklists = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="">
      <div className="flex justify-end">
        <Button onClick={() => setOpenModal(true)}>
          <div className="flex items-center justify-center gap-1">
            <Icon icon="heroicons:plus" className="text-lg" /> Add List
          </div>
        </Button>
      </div>

      <ul className="space-y-5">
        <List />
        <List />
        <List />
      </ul>

      {/* checklist form */}
      {openModal && (
        <AddChecklistForm
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default Checklists;

const List = () => {
  return (
    <li className="flex items-start gap-4">
      <div className="flex size-10 items-center justify-center rounded-full bg-neutral">
        <Icon icon="heroicons:check-16-solid" className="text-white" />
      </div>

      <div className="space-y-1">
        {/* Name of checklist */}
        <p className="text-sm font-bold uppercase text-hr-yellow">
          Devices{" "}
          <span className="badge badge-error badge-sm text-[10px] font-normal normal-case">
            All staff
          </span>
        </p>
        {/* description */}
        <p className="text-sm">Give out the following devices</p>
        {/* Assets */}
        <p className="text-xs">
          <span className="font-semibold">Asset:</span> <span>Computer</span>
        </p>
        {/* assignee */}
        <p className="text-xs">
          <span className="font-semibold">Assigned to:</span>{" "}
          <span>Kris Wale</span>
        </p>
        {/* edit and delete */}
        <p className="!mt-2 flex gap-3 text-xs">
          <button className="btn btn-xs flex cursor-pointer items-center gap-1 text-neutral">
            {" "}
            <Icon icon="heroicons:pencil" className="text-md" /> Edit
          </button>{" "}
          <button className="btn btn-xs flex cursor-pointer items-center gap-1 text-error">
            <Icon icon="heroicons:trash" className="text-md" /> Delete
          </button>
        </p>
      </div>
    </li>
  );
};
