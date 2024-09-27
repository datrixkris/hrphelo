import Button from "@/app/components/Button";
import React, { useEffect } from "react";
import { Company } from "../types";
import { CompanyDetails, CompanyDetailsSchema } from "../schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCompanyStore } from "../company-store";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

interface DetailsProps {
  data: Company | null;
  id: number;
  refreshData: () => Promise<void>;
}
const UpdateCompanyDetails = ({ data, id, refreshData }: DetailsProps) => {
  const {
    register,
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useForm<CompanyDetails>({ resolver: zodResolver(CompanyDetailsSchema) });
  const { updateCompanyDetails } = useCompanyStore((state) => state);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        address: data.address,
        company_size: data.company_size,
        email: data.email,
        contact: data.contact,
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<CompanyDetails> = async (formData) => {
    console.log(formData);
    await updateCompanyDetails(formData, id);
    if (!useCompanyStore.getState().error) {
      await refreshData();
      toast.success("Company Details Updated!!");
    }
  };

  return (
    <div>
      {/* company details  form*/}
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="flex items-end justify-between border-b border-base-300 pb-2">
          <div className="">
            <h3 className="text-xl font-semibold">Company details</h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s details here
            </p>
          </div>

          <Button disabled={!isDirty}>Update Company Details</Button>
        </div>

        {/* forms */}
        <div className="space-y-4 py-5">
          {/* Company details */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Company name</h3>
              <p className="text-neutral-400">Update company&apos;s name</p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("name")}
              />
            </div>
          </div>

          {/* Address */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Company Address</h3>
              <p className="text-neutral-400">Update company&apos;s address</p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("address")}
              />
            </div>
          </div>

          {/* Company's contact */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Company telephone</h3>
              <p className="text-neutral-400">
                Update company&apos;s telephone contact
              </p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("contact")}
              />
            </div>
          </div>

          {/* email address */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Company email address</h3>
              <p className="text-neutral-400">
                Update company&apos;s email address
              </p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("email")}
              />
            </div>
          </div>

          {/* size  */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Company size </h3>
              <p className="text-neutral-400">Update company&apos;s size</p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("company_size")}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCompanyDetails;
