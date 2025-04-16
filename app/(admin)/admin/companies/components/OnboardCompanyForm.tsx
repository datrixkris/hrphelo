import Button from "@/app/components/Button";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Company } from "../types";
import { useCompanyStore } from "../company-store";
import Modal from "@/app/components/Modal";
import { toast } from "react-toastify";

// Define the schema using Zod
const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  address: z.string().min(1, "Company location is required"),
  contact_person_contact: z
    .string()
    .length(10, "Number has to be ten characters"),
  contact_person: z.string().min(1, "Contact person's name is required"),
  contact: z.string().length(10, "Number has to be ten characters"),
  company_size: z.string().min(1, "Number of staff must be at least 1"),
  email: z.string().email("Invalid email address"),
});

const OnboardCompanyForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Company>({
    resolver: zodResolver(companySchema),
  });
  const { OnboardCompany, loading, fetchCompanies } = useCompanyStore(
    (state) => state,
  );

  const onSubmit: SubmitHandler<Company> = async (data) => {
    console.log(data);
    await OnboardCompany(data);
    if (!useCompanyStore.getState().error) {
      console.log(useCompanyStore.getState().error, loading);
      // onClose();
      toast.success("Company Onboarded successfully");
      fetchCompanies();
      reset();
    } else {
      toast.error(useCompanyStore.getState().error);
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full">
          <h2 className="mb-5 text-center text-2xl font-bold">Add Company</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Company name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Company name</span>
                </div>
                <input
                  {...register("name")}
                  required
                  type="text"
                  placeholder="Company name here"
                  className="input input-bordered w-full"
                />
                {errors.name && (
                  <span className="text-xs text-error">
                    {errors.name.message}
                  </span>
                )}
              </label>

              {/* Company Location */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Company location</span>
                </div>
                <input
                  {...register("address")}
                  required
                  type="text"
                  placeholder="Company location here"
                  className="input input-bordered w-full"
                />
                {errors.address && (
                  <span className="text-xs text-error">
                    {errors.address.message}
                  </span>
                )}
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Contact person's number */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">
                    Contact person&apos;s number
                  </span>
                </div>
                <input
                  {...register("contact_person_contact")}
                  required
                  type="number"
                  placeholder="Contact person's number here"
                  className="input input-bordered w-full"
                />
                {errors.contact_person_contact && (
                  <span className="text-xs text-error">
                    {errors.contact_person_contact.message}
                  </span>
                )}
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
                {errors.contact_person && (
                  <span className="text-xs text-error">
                    {errors.contact_person.message}
                  </span>
                )}
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Company&apos;s Telephone */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Company&apos;s telephone</span>
                </div>
                <input
                  {...register("contact")}
                  required
                  type="number"
                  placeholder="Company's telephone here"
                  className="input input-bordered w-full"
                />
                {errors.contact && (
                  <span className="text-xs text-error">
                    {errors.contact.message}
                  </span>
                )}
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
                {errors.company_size && (
                  <span className="text-xs text-error">
                    {errors.company_size.message}
                  </span>
                )}
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
                {errors.email && (
                  <span className="text-xs text-error">
                    {errors.email.message}
                  </span>
                )}
              </label>
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
    </div>
  );
};

export default OnboardCompanyForm;
