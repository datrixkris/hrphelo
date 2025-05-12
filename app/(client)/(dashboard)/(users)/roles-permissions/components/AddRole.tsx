"use client";

import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
// import AddRoleForm from "./AddRoleForm";
import Modal from "@/app/components/Modal";
import CreateUserRole from "./CreateUserRole";

const AddRole = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        <span className="flex items-center gap-1">
          <Icon icon="heroicons:user-plus" className="text-xl" /> Add Role
        </span>
      </Button>

      {/* Add role form */}
      {isOpen && (
        // <AddRoleForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          width="w-[90vw] md:w-[700px] lg:w-[750px] "
        >
          <h2 className="mb-5 text-center text-2xl font-bold">Create Role</h2>
          <CreateUserRole />
        </Modal>
      )}
    </div>
  );
};

export default AddRole;
