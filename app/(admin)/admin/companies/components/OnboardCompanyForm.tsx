import Button from "@/app/components/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Company } from "../types";
import { useCompanyStore } from "../company-store";
import Modal from "@/app/components/Modal";

const OnboardCompanyForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<Company>();
  const { OnboardCompany, loading, error } = useCompanyStore((state) => state);

  const onSubmit: SubmitHandler<Company> = async (data) => {
    console.log(data, error);
    await OnboardCompany(data);
    if (!error) {
      // onClose();
      reset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[90vw] sm:w-[600px] lg:w-[800px]">
        <h2 className="mb-5 text-center text-2xl font-bold">Add Company</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Company name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Company Name</span>
              </div>
              <input
                {...register("name")}
                required
                type="text"
                placeholder="Company name here"
                className="input input-bordered w-full"
              />
            </label>

            {/* Company Location */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Company Location</span>
              </div>
              <input
                {...register("address")}
                required
                type="text"
                placeholder="Company location here"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Contact person's number */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Contact person&apos;s number</span>
              </div>
              <input
                {...register("contact_person_contact")}
                required
                type="text"
                placeholder="Contact person's number here"
                className="input input-bordered w-full"
              />
            </label>

            {/* Contact person&apos;s name */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Contact person&apos;s name</span>
              </div>
              <input
                {...register("contact_person")}
                required
                type="text"
                placeholder="Contact person's name here"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Company&apos;s Telephone */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Company&apos;s Telephone</span>
              </div>
              <input
                {...register("contact")}
                required
                type="text"
                placeholder="Company's Telephone here"
                className="input input-bordered w-full"
              />
            </label>

            {/* Number of staff */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Number of staff</span>
              </div>
              <input
                {...register("company_size")}
                required
                type="number"
                placeholder="Number of staff here"
                className="input input-bordered w-full"
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Company email */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Company email</span>
              </div>
              <input
                {...register("email")}
                required
                type="email"
                placeholder="Company email here"
                className="input input-bordered w-full"
              />
            </label>

            {/* Company&apos;s Registration Document */}
            {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Company&apos;s Registration Document
              </span>
            </div>
            <input
            {...register("document")}
              required
              type="file"
              placeholder="Company&apos;s Registration Document here"
              className="file-input input-bordered w-full"
            />
          </label> */}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Director's National ID */}
            {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Director&apos;s National ID</span>
            </div>
            <input
            //   required
              type="text"
              placeholder="Director&apos;s National ID here"
              className="input input-bordered w-full"
            />
          </label> */}

            {/* Director&apos;s National ID */}
            {/* <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Director&apos;s National ID</span>
            </div>
            <input
              type="text"
              placeholder="Director&apos;s National ID here"
              className="input input-bordered w-full"
            />
          </label> */}
          </div>

          {/* submit */}
          <div className="!mt-10">
            <Button className="mx-auto w-1/2">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default OnboardCompanyForm;
