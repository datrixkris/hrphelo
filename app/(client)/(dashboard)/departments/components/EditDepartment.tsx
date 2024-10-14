import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CreateDepartment, GetDepartment } from "../types";
import { useDepartmentStore } from "../department-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditDepartmentProps {
  departmentId: number;
  onClose: () => void;
}

const departmentSchema = z.object({
  dept_code: z.string().min(4, { message: "Department code is required and should be at least 4 characters." }),
  name: z.string().nonempty("Department name is required"),
  description: z.string().optional(),
});

const EditDepartment: React.FC<EditDepartmentProps> = ({
  departmentId,
  onClose,
}) => {
  const { loading, fetchDepartmentById, updateDepartment } =
    useDepartmentStore();
  const [department, setDepartment] = useState<GetDepartment | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GetDepartment>({
    resolver: zodResolver(departmentSchema),
  });

  // Fetch department by ID when the component mounts
  useEffect(() => {
    const getDepartment = async () => {
      const fetchedDepartment = await fetchDepartmentById(departmentId);
      if (fetchedDepartment) {
        setDepartment(fetchedDepartment);
        setValue("name", fetchedDepartment.name);
        setValue("dept_code", fetchedDepartment.dept_code);
        setValue("description", fetchedDepartment.description || "");
      } else {
        toast.error("Failed to fetch department data");
      }
    };

    getDepartment();
  }, [departmentId, fetchDepartmentById, setValue]);

  // Handle form submission for updating department
  const onSubmit = async (data: CreateDepartment) => {
    try {
      const success = await updateDepartment(departmentId, data);
      if (success) {
        toast.success("Department updated successfully");
        onClose(); // Close the modal or form
      } else {
        toast.error("Failed to update department");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold">Edit Department</h3>
      {department ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">
              Department Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="input input-bordered w-full"
              required
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
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
              required
            />
            {errors.dept_code && (
              <p className="text-red-500">{errors.dept_code.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="textarea textarea-bordered mt-1 w-full"            />
          </div>

          <div className="modal-action">
            <button type="button" onClick={onClose} className="btn rounded">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary rounded"
            >
              Update Department
            </button>
          </div>
        </form>
      ) : (
        <p>Loading department data...</p>
      )}
    </div>
  );
};

export default EditDepartment;
