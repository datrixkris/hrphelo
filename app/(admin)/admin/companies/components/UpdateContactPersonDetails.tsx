import Button from "@/app/components/Button";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ContactPerson, ContactPersonSchema } from "../schema";
import { Company } from "../types";
import { useCompanyStore } from "../company-store";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";

interface DetailsProps {
  data: Company | null;
  id: number;
  refreshData: () => Promise<void>;
}
const UpdateContactPersonDetails = ({
  data,
  id,
  refreshData,
}: DetailsProps) => {
  const {
    register,
    reset,
    formState: { isDirty },
    handleSubmit,
  } = useForm<ContactPerson>({ resolver: zodResolver(ContactPersonSchema) });
  const { updateCompanyDetails } = useCompanyStore((state) => state);

  useEffect(() => {
    if (data) {
      reset({
        contact_person: data.contact_person,
        contact_person_contact: data.contact_person_contact,
      });
    }
  }, [data]);

  const onSubmit: SubmitHandler<ContactPerson> = async (formData) => {
    console.log(formData);
    await updateCompanyDetails(formData, id);
    if (!useCompanyStore.getState().error) {
      await refreshData();
      toast.success("Contact Person Updated!!");
    }
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="flex items-end justify-between border-b border-base-300 pb-2">
          <div className="">
            <h3 className="text-xl font-semibold">
              Contact Person&apos;s details
            </h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s details here
            </p>
          </div>

          <Button disabled={!isDirty}>Update Contact Person</Button>
        </div>

        {/* forms */}
        <div className="space-y-4 py-5">
          {/* Contact person details */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Contact person&apos;s name</h3>
              <p className="text-neutral-400">
                Update contact person&apos;s name
              </p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("contact_person")}
              />
            </div>
          </div>

          {/* Contact person&apos;s phone */}
          <div className="flex max-w-[1000px] gap-2">
            {/* text */}
            <div className="w-1/2">
              <h3 className="font-semibold">Contact person&apos;s phone </h3>
              <p className="text-neutral-400">
                Update contact person&apos;s phone
              </p>
            </div>

            {/* form */}
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("contact_person_contact")}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateContactPersonDetails;
