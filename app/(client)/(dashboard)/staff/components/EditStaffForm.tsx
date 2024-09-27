import Button from "@/app/components/Button";
import React from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { Company } from "../types";
// import { useCompanyStore } from "../company-store";
import Modal from "@/app/components/Modal";
// import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";

const EditStaffForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  //   const { register, handleSubmit, reset } = useForm<Company>();
  //   const { OnboardCompany, loading, fetchCompanies } = useCompanyStore(
  //     (state) => state,
  //   );

  //   const onSubmit: SubmitHandler<Company> = async (data) => {
  //     console.log(data);
  //     await OnboardCompany(data);
  //     if (!useCompanyStore.getState().error) {
  //       console.log(useCompanyStore.getState().error, loading);
  //       // onClose();
  //       toast.success("Company Onboarded successfully");
  //       fetchCompanies();
  //       reset();
  //     } else {
  //       toast.error(useCompanyStore.getState().error);
  //     }
  //   };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-[90vw] sm:w-[600px] lg:w-[650px]">
          <h2 className="mb-5 text-center text-2xl font-bold">Staff Profile</h2>

          <div className="mb-4 flex items-center justify-center">
            <ImageUpload />
          </div>

          <form className="space-y-4">
            <div className="grid gap-5 sm:grid-cols-2">
              {/*  name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  required
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
                  required
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
                <input
                  required
                  type="text"
                  placeholder="Staff department"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Contact number */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Contact number</span>
                </div>
                <input
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
                <input
                  required
                  type="text"
                  placeholder="Supervisor here"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            {/* submit */}
            <div className="!mt-10">
              <Button className="mx-auto w-1/2">Add Staff</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditStaffForm;
