import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { CreateDepartment, Department } from "../types";
import ConfirmationModal from "@/app/(client)/components/ConfirmationModal";
import { toast } from "react-toastify";
import EditDepartment from "./EditDepartment";
import Link from "next/link";

interface DepartmentTableProps {
  departments: Department[];
  deleteDepartment: (id: number) => Promise<boolean>;
  updateDepartment: (
    id: number,
    data: Partial<CreateDepartment>,
  ) => Promise<boolean>;
}

export const DepartmentTable = ({
  departments,
  deleteDepartment,
}: DepartmentTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentIdToDelete, setDepartmentIdToDelete] = useState<
    number | null
  >(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);

  // Function to open the Edit modal and set the department ID
  const openEditModal = (id: number) => {
    setSelectedDepartmentId(id);
    setIsEditModalOpen(true);
  };

  // Function to close the modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedDepartmentId(null);
  };

  // Function to open the delete confirmation modal
  const openDeleteModal = (id: number) => {
    setDepartmentIdToDelete(id);
    setIsModalOpen(true);
  };

  // Function to confirm and delete the department
  const handleConfirmDelete = async () => {
    if (departmentIdToDelete) {
      try {
        const success = await deleteDepartment(departmentIdToDelete);
        if (success) {
          toast.success("Department deleted successfully");
        } else {
          toast.error("Failed to delete department");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the department");
      } finally {
        setDepartmentIdToDelete(null);
        setIsModalOpen(false);
      }
    }
  };

  // Early return if no departments
  if (departments.length === 0) {
    return <div>No departments available</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-lg rounded border border-base-300 bg-base-100">
          <thead>
            <tr className="">
              <th></th>
              <th>Department Name</th>
              <th>Employee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={department.id || index} className="">
                <th>{index + 1}</th>
                <td>{department.name}</td>
                <td>{department.staff?.length || 0}</td>
                <td>
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="mage:edit"
                      className="h-6 w-6 cursor-pointer text-blue-500"
                      aria-label="Edit department"
                      onClick={() => openEditModal(department.id)}
                    />
                    <Icon
                      icon="weui:delete-outlined"
                      className="h-6 w-6 cursor-pointer text-red-500"
                      aria-label="Delete department"
                      onClick={() => openDeleteModal(department.id)}
                    />
                    <Link
                      href={`/departments/${department.id}`}
                      aria-label="View department details"
                    >
                      <Icon
                        icon="mdi:eye"
                        className="h-6 w-6 cursor-pointer text-green-500"
                      />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete the department?"
      />

      {/* Edit Department Modal */}
      {isEditModalOpen && selectedDepartmentId && (
        <dialog id="edit_department_modal" className="modal" open>
          <div className="modal-box">
            <EditDepartment
              departmentId={selectedDepartmentId}
              onClose={closeEditModal}
            />
          </div>
          <div className="modal-backdrop" onClick={closeEditModal}></div>
        </dialog>
      )}
    </>
  );
};
