"use client";
import { Icon } from "@iconify/react";
import Button from "@/app/components/Button";
import React, { useState } from "react";
import CreateProjectForm from "./CreateProjectForm";

const CreateProject = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    // button to onboard
    <div className="">
      <div>
        <Button onClick={() => setOpenModal(true)}>
          <span className="flex items-center gap-1">
            <Icon icon="hugeicons:task-add-01" className="text-xl" /> Create
            Project
          </span>
        </Button>
      </div>

      {/* add company modal */}
      {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}> */}

      <CreateProjectForm
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default CreateProject;
