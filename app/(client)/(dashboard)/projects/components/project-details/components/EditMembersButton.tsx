import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import EditMembersForm from "./EditMembersForm";

const EditMembersButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button className="btn btn-xs" onClick={() => setOpenModal(true)}>
        <Icon icon="heroicons:plus" /> Edit
      </button>

      {/* form modal */}
      <EditMembersForm isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default EditMembersButton;
