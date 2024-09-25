import Button from "@/app/components/Button";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CompanyDocuments, CompanyDocumentsSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

const UpdateCompanyDocuments = () => {
  const { register, handleSubmit } = useForm<CompanyDocuments>({
    resolver: zodResolver(CompanyDocumentsSchema),
  });

  const onSubmit: SubmitHandler<CompanyDocuments> = async (formData) => {
    console.log("here please");
    console.log(formData);
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="flex items-end justify-between border-b border-base-300 pb-2">
          <div className="">
            <h3 className="text-xl font-semibold">Company documents</h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s documents
            </p>
          </div>

          <Button>Update Company Documents</Button>
        </div>

        {/* forms */}
        <div className="space-y-4 py-5">
          {/* Contact person details */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Business Certificate</h3>
              <p className="text-neutral-400">Select business certificate</p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                {...register("document")}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateCompanyDocuments;
