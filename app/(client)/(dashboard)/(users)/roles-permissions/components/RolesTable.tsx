"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

import { Role } from "../types";
import Modal from "@/app/components/Modal";
import ViewAndEditRoleForm from "./ViewAndEditRoleForm";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { useRolesStore } from "../roles-store";

const RolesTable = ({ roles }: { roles: Role[] }) => {
  return (
    <div>
      <div className="overflow-x-auto border border-base-content/5 bg-base-100">
        <table className="table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Description</th>
              <th className="text-center">Actions</th>
              {/* <th>Favorite Color</th> */}
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {roles.map((role) => (
              <TableRow key={role.id} role={role} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;

const TableRow = ({ role }: { role: Role }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { updatingData, deleteRole } = useRolesStore();
  return (
    <>
      <tr>
        <td className="font-semibold">{role.name}</td>
        <td>{role?.description ?? "No description"}</td>
        <td>
          <div className="flex items-center justify-center gap-2">
            {/* edit */}
            <div
              className="tooltip tooltip-top"
              data-tip="Edit role and permissions"
            >
              <Icon
                icon="material-symbols:edit-square-outline"
                onClick={() => {
                  setIsOpen(true);
                  setIsEdit(true);
                }}
                className="inline-block cursor-pointer text-xl text-base-content/50"
              />
            </div>

            {/* delete */}
            <div className="tooltip tooltip-top" data-tip="Delete role">
              <Icon
                icon="material-symbols:delete-outline"
                className="inline-block cursor-pointer text-xl text-error"
                onClick={() => setShowConfirm(true)}
              />
            </div>

            {/* assign role */}
            <div
              className="cursor-pointer text-nowrap rounded bg-success px-2 py-1 font-semibold text-white"
              onClick={() => setIsOpen(true)}
            >
              <Icon
                icon="heroicons:eye-16-solid"
                className="inline-block text-lg"
              />
              <span className="relative ml-0.5 text-xs">View role</span>
            </div>
          </div>
        </td>
      </tr>

      {/* View and edit form */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          width="w-[90vw] md:w-[700px] lg:w-[750px] "
        >
          <h2 className="mb-5 text-center text-2xl font-bold">
            {isEdit ? "Edit Role" : "View Role"}
          </h2>
          <ViewAndEditRoleForm
            closeModal={() => {
              setIsOpen(false);
              setIsEdit(false);
            }}
            role={role}
            edit={isEdit}
          />
        </Modal>
      )}

      {/* confirmation of exiting */}
      {showConfirm && (
        <ConfirmationModal
          isOpen={showConfirm}
          title="Confirm Delete"
          message="Are you sure you want to delete this role? "
          onConfirm={async () => {
            await deleteRole(role.id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
          loading={updatingData}
          type="delete"
        />
      )}
    </>
  );
};
