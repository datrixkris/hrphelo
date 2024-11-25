import Modal from "@/app/components/Modal";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  staffDetails: StaffDetail | null;
  refreshData: () => Promise<void>;
};

const EditPersonalInformation = ({ isOpen, onClose }: Props) => {
  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Add Staff</h2>

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
                {loading ? "Adding staff..." : "Add staff"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditPersonalInformation;
