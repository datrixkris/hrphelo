import React, { useEffect, useState } from "react";
import {
  StaffData,
  StaffDetail,
} from "@/app/(client)/(dashboard)/(employee)/staff/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDepartmentStore } from "@/app/(client)/(dashboard)/(employee)/departments/department-store";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import Button from "@/app/components/Button";

const UserBasicInformation = ({
  staffDetails,
  onBasicInfoSubmit,
}: {
  staffDetails: StaffData;
  onBasicInfoSubmit: (data: StaffDetail) => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<StaffData>();
  const departments = useDepartmentStore((state) => state.departments);
  const { staffs, fetchStaff, updatingData } = useStaffStore();
  const fetchDepartments = useDepartmentStore(
    (state) => state.fetchDepartments,
  );
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchDepartmentsData = async () => {
      // check if there are no data before you hit the api
      if (!(departments.length > 0)) {
        await fetchDepartments();
        await fetchStaff();
      }
    };

    fetchDepartmentsData();

    if (staffDetails) {
      reset({
        name: staffDetails.name,
        staffId: staffDetails.staffId,
        gender: staffDetails.gender,
        image: staffDetails.image,
        date_of_birth: staffDetails.date_of_birth?.slice(0, 10),
        designation: staffDetails.designation,
        email: staffDetails.email,
        contact: staffDetails.contact,
        departmentId: staffDetails.departmentId,
        hiring_date: staffDetails.hiring_date?.slice(0, 10),
        supervisorId: staffDetails.supervisorId,
      });
    }
  }, [staffDetails, reset]);

  const onSubmit: SubmitHandler<StaffData> = (data) => {
    const staffData = {
      ...data,
      departmentId: Number(data.departmentId),
      supervisorId: Number(data.supervisorId),
    };
    onBasicInfoSubmit(staffData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        {/*  name */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            readOnly={!edit}
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
            readOnly={!edit}
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
            disabled={!edit}
            defaultValue=""
            {...register("gender")}
            required
            className="select select-bordered w-full disabled:border-[#1f293733] disabled:bg-inherit disabled:text-base-content"
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
            readOnly={!edit}
            {...register("date_of_birth")}
            required
            type="date"
            placeholder="Date of birth here"
            className="input input-bordered w-full"
          />
        </label>

        {/* Designation */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Designation</span>
          </div>
          <input
            readOnly={!edit}
            {...register("designation")}
            required
            type="text"
            placeholder="Staff Designation"
            className="input input-bordered w-full"
          />
        </label>

        {/* Staff Department */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Staff Department</span>
          </div>
          <select
            disabled={!edit}
            defaultValue=""
            {...register("departmentId")}
            required
            className="select select-bordered w-full disabled:border-[#1f293733] disabled:bg-inherit disabled:text-base-content"
          >
            <option disabled value="">
              Not assigned
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
            readOnly={!edit}
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
            readOnly
            {...register("email")}
            required
            type="email"
            placeholder="Email here"
            className="input input-bordered w-full read-only:cursor-not-allowed"
          />
        </label>

        {/* Date Hired */}
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Date Hired</span>
          </div>
          <input
            readOnly={!edit}
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
            disabled={!edit}
            defaultValue=""
            {...register("supervisorId")}
            className="select select-bordered w-full disabled:border-[#1f293733] disabled:bg-inherit disabled:text-base-content"
          >
            <option disabled value="">
              Not assigned
            </option>
            {staffs.map((staff) => (
              <option key={staff.id} value={Number(staff.id)}>
                {staff.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="!mt-10">
        {edit ? (
          <Button className="mx-auto w-1/2" disabled={!isDirty}>
            {updatingData ? "Saving..." : "Save"}
          </Button>
        ) : (
          <Button className="mx-auto w-1/2" onClick={() => setEdit(true)}>
            Edit
          </Button>
        )}
      </div>
    </form>
  );
};

export default UserBasicInformation;
