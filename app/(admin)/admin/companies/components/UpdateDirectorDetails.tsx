import Button from "@/app/components/Button";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface Field {
  name: string;
}
const UpdateDirectorDetails = () => {
  const [fields, setFields] = useState([{ name: "director1" }]);
  const { register, handleSubmit } = useForm<FieldValues>();

  // Add a new field to the form
  const addField = () => {
    setFields([...fields, { name: `director${fields.length + 1}` }]);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="flex max-w-[1000px] items-end justify-between border-b border-base-300 pb-2">
          <div className="">
            <h3 className="text-xl font-semibold">
              Company Director&apos;s Identification
            </h3>
            <p className="mt-1 text-neutral-400">
              Update company&apos;s directors
            </p>
          </div>
          <Button>Update Director(s) Ids</Button>
        </div>

        {/* forms */}
        <div className="space-y-4 py-5">
          {/* Contact person details */}
          {fields.map((field) => {
            return (
              <div className="flex max-w-[1000px] gap-2">
                {/* text */}
                <div className="w-1/2">
                  <h3 className="font-semibold">Director ID</h3>
                  <p className="text-neutral-400">
                    Add the ID number of this Director
                  </p>
                </div>

                {/* form */}
                <div className="w-1/2">
                  <input
                    {...register(`${field.name}`)}
                    type="input"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            );
          })}

          {/* button */}
          <div className="flex max-w-[1000px] items-center justify-center">
            <button
              type="button"
              className="flex cursor-pointer items-center text-lg font-bold text-hr-yellow hover:text-hr-yellow-dark"
              onClick={() => addField()}
            >
              <Icon icon="heroicons:plus-16-solid" className="text-2xl" /> Add
              Director
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateDirectorDetails;
