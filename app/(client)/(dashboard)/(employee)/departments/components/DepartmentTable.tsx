import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { CreateDepartment, Department } from "../types";
import ConfirmationModal from "@/app/(client)/components/ConfirmationModal";
import { toast } from "react-toastify";
import EditDepartment from "./EditDepartment";
import Link from "next/link";
import { useHasPermission } from "@/app/hooks/permissions";

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

  // permissions
  const hasDeletePermission = useHasPermission("delete", "Department");
  const hasEditPermission = useHasPermission("modify", "Department");

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
              {/* <th></th> */}
              <th>Department Name</th>
              <th>No of Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr key={department.id || index} className="">
                {/* <th>{index + 1}</th> */}
                <td>{department.name}</td>
                <td>{department.staff?.length || 0}</td>
                <td>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/departments/${department.id}`}
                      aria-label="View department details"
                    >
                      <Icon
                        icon="mdi:eye"
                        className="cursor-pointer text-xl text-success"
                      />
                    </Link>
                    {hasEditPermission && (
                      <Icon
                        icon="mage:edit"
                        className="cursor-pointer text-xl text-info"
                        aria-label="Edit department"
                        onClick={() => openEditModal(department.id)}
                      />
                    )}
                    {hasDeletePermission && (
                      <Icon
                        icon="weui:delete-outlined"
                        className="cursor-pointer text-xl text-error"
                        aria-label="Delete department"
                        onClick={() => openDeleteModal(department.id)}
                      />
                    )}
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
