import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

// Zod schema for form validation
const profileSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  phone: z.string(),
  altPhone: z.string(),
  name2: z.string(),
  relationship2: z.string(),
  phone2: z.string(),
  altPhone2: z.string(),
});

// Infer the TypeScript types from the Zod schema
type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileProps = {
  onClose: () => void;
};

export const EmergencyContactsForm: React.FC<ProfileProps> = ({ onClose }) => {
  // useForm with Zod validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="modal-box relative z-20 w-full max-w-3xl rounded-md bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold">Emergency Contacts</h4>
          <button
            type="button"
            className="text-lg"
            aria-label="Close modal"
            onClick={onClose}
          >
            <Icon icon="material-symbols:close" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="mb-3 text-lg font-medium">Primary Contact: </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label">Name</span>
              <input
                {...register("name")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </label>

            {/* relationship */}
            <label className="form-control w-full">
              <span className="label">Relationship</span>
              <input
                {...register("relationship")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.relationship && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.relationship.message}
                </p>
              )}
            </label>

            {/* phone */}
            <label className="form-control w-full">
              <span className="label">Phone number</span>
              <input
                {...register("phone")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </label>

            {/* altPhone */}
            <label className="form-control w-full">
              <span className="label">Altenate phone number</span>
              <input
                {...register("altPhone")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.altPhone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.altPhone.message}
                </p>
              )}
            </label>
          </div>

          <hr className="my-7" />

          <p className="mb-3 text-lg font-medium">Secondary Contact: </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label">Name</span>
              <input
                {...register("name2")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.name2 && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name2.message}
                </p>
              )}
            </label>

            {/* relationship */}
            <label className="form-control w-full">
              <span className="label">Relationship</span>
              <input
                {...register("relationship2")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.relationship2 && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.relationship2.message}
                </p>
              )}
            </label>

            {/* phone */}
            <label className="form-control w-full">
              <span className="label">Phone number</span>
              <input
                {...register("phone2")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.phone2 && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone2.message}
                </p>
              )}
            </label>

            {/* altPhone */}
            <label className="form-control w-full">
              <span className="label">Altenate phone number</span>
              <input
                {...register("altPhone2")}
                className="textarea textarea-bordered mt-1 w-full"
                type="text"
              />
              {errors.altPhone2 && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.altPhone2.message}
                </p>
              )}
            </label>
          </div>

          <div className="submit-section mt-4 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              // disabled={loading}
            >
              {false ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
