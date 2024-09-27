import Button from "@/app/components/Button";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/app/components/Modal";
import { toast } from "react-toastify";
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
  const { addStaff, loading, fetchStaff, error } = useStaffStore();
  const fetchDepartments = useDepartmentStore(
    (state) => state.fetchDepartments,
  );
  const departments = useDepartmentStore((state) => state.departments);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      // check if there are no data before you hit the api
      if (!(departments.length > 0)) {
        await fetchDepartments();
        console.log(departments);
      }
    };
    fetchDepartmentsData();
  }, []);

  const onSubmit: SubmitHandler<StaffData> = async (data) => {
    const staffData = {
      ...data,
      departmentId: Number(data.departmentId),
      supervisorId: Number(data.supervisorId),
    };
    console.log(staffData);
    await addStaff(staffData);
    if (!error) {
      console.log(error, loading);
      // onClose();
      toast.success("Company Onboarded successfully");
      fetchStaff();
      reset();
    } else {
      toast.error(error);
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Add Staff</h2>

          <div className="mb-4 flex items-center justify-center">
            <ImageUpload />
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
                  <option value={1}>Han Solo</option>
                  <option value={2}>Greedo</option>
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
