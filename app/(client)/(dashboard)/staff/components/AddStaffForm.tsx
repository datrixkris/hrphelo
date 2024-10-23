import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import ImageUpload from "./ImageUpload";
import { StaffData } from "../types";
import { useStaffStore } from "../staff-store";
import { useDepartmentStore } from "../../departments/department-store";

const AddStaffForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<StaffData>();
  const { addStaff, loading, fetchStaff, error, staffs } = useStaffStore();
  const fetchDepartments = useDepartmentStore(
    (state) => state.fetchDepartments,
  );
  const departments = useDepartmentStore((state) => state.departments);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      if (isOpen && departments.length === 0) {
        await fetchDepartments();
      }
    };

    fetchDepartmentsData();
  }, [isOpen, departments.length, fetchDepartments]);

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hrphelo");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    return data.secure_url;
  };

  const onSubmit: SubmitHandler<StaffData> = async (data) => {
    let imageUrl = "";
    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
    }

    const staffData = {
      ...data,
      departmentId: Number(data.departmentId),
      supervisorId: Number(data.supervisorId),
      image: imageUrl,
    };

    await addStaff(staffData);

    if (!error) {
      toast.success("Staff added successfully!");
      fetchStaff();
      reset();
      setSelectedImage(null); // Reset the selected image
      onClose();
    } else {
      toast.error(`Failed to add staff: ${error}`);
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Add Staff</h2>

          <div className="mb-4 flex items-center justify-center">
            <ImageUpload onImageSelect={(file) => setSelectedImage(file)} />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              {/*  name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  required
                  {...register("name")}
                  type="text"
                  placeholder="Staff name here"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Staff ID */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Staff ID</span>
                </div>
                <input
                  {...register("staffId")}
                  type="text"
                  placeholder="Staff ID here"
                  className="input input-bordered w-full"
                />
              </label>

              {/*  gender */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  defaultValue=""
                  {...register("gender")}
                  required
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Gender{" "}
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
              {/* Date of birth */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date of birth</span>
                </div>
                <input
                  {...register("date_of_birth")}
                  required
                  type="date"
                  placeholder="Date of birth here"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Role */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Role</span>
                </div>
                <input
                  {...register("role")}
                  required
                  type="text"
                  placeholder="Staff Role"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Staff Department */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Staff Department</span>
                </div>
                <select
                  defaultValue=""
                  {...register("departmentId")}
                  required
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Choose a department
                  </option>
                  {departments.map((department) => {
                    return (
                      <option value={Number(department.id)} key={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              {/* Contact number */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Contact number</span>
                </div>
                <input
                  {...register("contact")}
                  required
                  type="text"
                  placeholder="Contact"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Email */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Email</span>
                </div>
                <input
                  {...register("email")}
                  required
                  type="email"
                  placeholder="Email here"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Date Hired */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date Hired</span>
                </div>
                <input
                  {...register("hiring_date")}
                  required
                  type="date"
                  placeholder="Date hired here"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Supervisor */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Supervisor</span>
                </div>
                <select
                  defaultValue=""
                  {...register("supervisorId")}
                  required
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Choose a supervisor
                  </option>
                  {staffs.map((staff) => (
                    <option key={staff.id} value={Number(staff.id)}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* submit */}
            <div className="!mt-10">
              <Button className="mx-auto w-1/2" disabled={loading}>
                {loading ? "Adding Staff..." : "Add Staff"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddStaffForm;
