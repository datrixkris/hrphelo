"use client"
import Button from "@/app/components/Button";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { DepartmertTable } from "./components/DepartmertTable";

const Page = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    head: "",
    phone: "",
    email: "",
  });

  // Function to handle input changes in the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({ ...prev, [name]: value }));
  };

  // Function to open the modal
  const openCreateModal = () => setIsCreateModalOpen(true);

  // Function to close the modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewDepartment({ name: "", head: "", phone: "", email: "" }); // Reset form
  };

  // Function to handle form submission
  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the API call to create the department
    console.log("Department Data:", newDepartment);

    // For example, you could do something like:
    // await api.post('/departments', newDepartment);

    closeCreateModal(); // Close modal after creation
  };

  return (
    <div>
      <div>
        <div className="page-header mb-[1.875rem]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-pageTitle dark:text-swapText text-lg font-medium leading-[1.2] sm:mb-[5px] sm:text-2xl md:text-[26px]">
                Department
              </h3>
              <ul className="hidden flex-wrap text-[14px] font-medium sm:flex md:text-base">
                <li>
                  <a href="index.html" className="dark:text-swapText text-[#333333]">
                    Dashboard
                  </a>
                </li>
                <li>
                  <span className="px-2 dark:text-[#6c757d]">/</span>
                </li>
                <li className="text-[#6c757d]">Departments</li>
              </ul>
            </div>
            <div>
              <Button onClick={openCreateModal}>Add Department</Button>
            </div>
          </div>
        </div>
      </div>

     <DepartmertTable/>

      {/* Create Department Modal */}
      {isCreateModalOpen && (
        <dialog id="create_department_modal" className="modal" open>
          <div className="modal-box">
            <h3 className="text-lg font-bold">Create New Department</h3>
            <form onSubmit={handleCreateDepartment} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Department Name</label>
                <input
                  type="text"
                  name="name"
                  value={newDepartment.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Head of Department</label>
                <input
                  type="text"
                  name="head"
                  value={newDepartment.head}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={newDepartment.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newDepartment.email}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="button" onClick={closeCreateModal} className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Department
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeCreateModal}></div>
        </dialog>
      )}
    </div>
  );
};

export default Page;
