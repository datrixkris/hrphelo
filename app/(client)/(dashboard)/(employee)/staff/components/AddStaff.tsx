"use client";
import { Icon } from "@iconify/react";
import Button from "@/app/components/Button";
import React, { useState } from "react";
import AddStaffForm from "./AddStaffForm";

const AddStaff = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    // button to onboard
    <div className="">
      <div>
        <Button onClick={() => setOpenModal(true)}>
          <span className="flex items-center gap-1">
            <Icon icon="heroicons:user-plus" className="text-xl" /> Add Staff
          </span>
        </Button>
      </div>

      {/* add company modal */}
      {/* <Modal isOpen={openModal} onClose={() => setOpenModal(false)}> */}

      {openModal && <AddStaffForm isOpen={openModal} onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default AddStaff;
