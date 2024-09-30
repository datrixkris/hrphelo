"use client";
import Button from "@/app/components/Button";
import React, { useLayoutEffect, useState } from "react";
import { DepartmentTable } from "./components/DepartmentTable";
import { useDepartmentStore } from "./department-store";
import { useForm } from "react-hook-form";
import { CreateDepartment } from "./types";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";

const departmentSchema = z.object({
  dept_code: z.string().min(4, { message: "Department code is required and should be at least 4 characters." }),
  name: z.string().nonempty("Department name is required"),
  description: z.string().optional(),
});

const Page = () => {
  const {
    departments,
    loading,
    fetchDepartments,
    addDepartment,
    deleteDepartment,
    updateDepartment,
  } = useDepartmentStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateDepartment>({
    resolver: zodResolver(departmentSchema),
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Function to open the modal
  const openCreateModal = () => setIsCreateModalOpen(true);

  // Function to close the modal
  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    reset(); // Reset form after closing
  };

  // Function to handle form submission
  const handleCreateDepartment = async (data: CreateDepartment) => {
    try {
      setFormLoading(true); // Start form loading
      const success = await addDepartment(data);
      if (success) {
        toast.success("Department created successfully");
        closeCreateModal();
      } else {
        toast.error("Failed to create department");
      }
    } catch (error) {
      toast.error("Failed to create department");
    } finally {
      setFormLoading(false); // End form loading
    }
  };

  useLayoutEffect(() => {
    fetchDepartments();
  }, []);

  if (loading && departments.length < 1) {
    return (
      <div className="rounded py-20 text-center">
        Getting departments data...
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="page-header mb-[1.875rem]">
          <div className="flex items-center justify-between">
            <PageTitleWithCrumbs
              title="Departments"
              crumbs={[
                { name: "Dashboard", link: "/dashboard" },
                { name: "Departments" },
              ]}
            />

            <div>
              <Button onClick={openCreateModal}>Add Department</Button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {departments.length > 0 ? (
          <DepartmentTable
            departments={departments}
            deleteDepartment={deleteDepartment}
            updateDepartment={updateDepartment}
          />
        ) : (
          <div className="rounded py-20 text-center">
            No departments available
          </div>
        )}
      </div>

      {/* Create Department Modal */}
      {isCreateModalOpen && (
        <div className={`modal ${isCreateModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="text-lg font-bold">Create New Department</h3>
            <form
              onSubmit={handleSubmit(handleCreateDepartment)}
              className="space-y-4"
            >
              <div>
                <label className="block font-medium text-gray-700">
                  Department Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Department Code
                </label>
                <input
                  type="text"
                  {...register("dept_code")}
                  className="input input-bordered w-full"
                />
                {errors.dept_code && (
                  <p className="text-sm text-red-500">
                    {errors.dept_code.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="modal-action flex justify-end">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="btn mr-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary rounded ${
                    formLoading ? "loading" : ""
                  }`}
                >
                  {formLoading ? "Creating..." : "Create Department"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={closeCreateModal}></div>
        </div>
      )}
    </div>
  );
};

export default Page;
