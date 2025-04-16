import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import EditLeadForm from "./EditLeadForm";

const EditLeadButton = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <button className="btn btn-xs" onClick={() => setOpenModal(true)}>
        <Icon icon="mage:exchange-b" /> Change
      </button>

      {/* form modal */}
      <EditLeadForm isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default EditLeadButton;
