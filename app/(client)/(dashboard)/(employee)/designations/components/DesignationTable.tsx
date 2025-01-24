import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { Designation } from "../types";
import AddDesignationForm from "./AddDesignationForm";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { useDesignationStore } from "../designations-store";

interface DesignationTableProps {
  designations: Designation[];
}

const DesignationTable = ({ designations }: DesignationTableProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [type, setType] = useState<"edit" | "view">("edit"); //for opening designation form
  const [designationData, setDesignationData] = useState<Designation>();
  const { deleteDesignation, updatingData } = useDesignationStore();

  function openEditForm(data: Designation) {
    setOpenModal(true);
    setDesignationData(data);
    setType("edit");
  }
  function openViewForm(data: Designation) {
    setOpenModal(true);
    setDesignationData(data);
    setType("view");
  }
  function openDeleteModal(data: Designation) {
    setOpenDelete(true);
    setDesignationData(data);
  }
  async function deleteItem(id: number) {
    await deleteDesignation(id);
    setOpenDelete(false);
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-md rounded border border-base-300 bg-base-100">
        {/* head */}
        <thead className="">
          <tr>
            <th>Designation</th>
            <th>Department</th>
            <th>No of Employees</th>
            <th>Actions</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {designations.map((designation) => (
            <tr key={designation?.id} className="!text-sm">
              <td>{designation.name}</td>
              <td className="max-w-52 break-words">
                {designation?.department?.name}
              </td>
              <td>{designation?.noOfEmployees}</td>
              <td>
                <div className="flex items-center gap-1.5">
                  <Icon
                    icon="mdi:eye"
                    className="cursor-pointer text-xl text-success"
                    onClick={() => openViewForm(designation)}
                  />
                  <Icon
                    icon="mage:edit"
                    className="cursor-pointer text-xl text-info"
                    aria-label="Edit designation"
                    onClick={() => openEditForm(designation)}
                  />
                  <Icon
                    icon="weui:delete-outlined"
                    className="cursor-pointer text-xl text-error"
                    aria-label="Delete designation"
                    onClick={() => openDeleteModal(designation)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* designation form */}
      {openModal && (
        <AddDesignationForm
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          designationTableData={designationData}
          type={type}
        />
      )}

      {/* confirm delete modal */}
      {openDelete && (
        <ConfirmationModal
          isOpen={openDelete}
          onConfirm={() => deleteItem(designationData!.id)}
          message="Are you sure you want to delete?"
          onCancel={() => setOpenDelete(false)}
          title={`Delete ${designationData!.name}`}
          type="delete"
          loading={updatingData}
        />
      )}
    </div>
  );
};

export default DesignationTable;
