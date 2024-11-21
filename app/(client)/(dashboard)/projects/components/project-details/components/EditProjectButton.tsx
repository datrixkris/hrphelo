import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import EditProjectDetails from "./EditProjectDetails";

const EditProjectButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <Icon
        icon="heroicons:pencil"
        className="text-2xl"
        onClick={() => setOpenModal(true)}
      ></Icon>

      <EditProjectDetails
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
};

export default EditProjectButton;
