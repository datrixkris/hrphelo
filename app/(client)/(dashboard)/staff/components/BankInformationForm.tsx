import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

// Zod schema for form validation
const profileSchema = z.object({
  bankName: z.string(),
  accountNumber: z.string(),
  bankBranch: z.string(),
});

// Infer the TypeScript types from the Zod schema
type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileProps = {
  onClose: () => void;
};

export const BankInformationForm: React.FC<ProfileProps> = ({ onClose }) => {
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
      <div className="modal-box relative z-20 w-full max-w-md rounded-md bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-lg font-semibold">Bank Information</h4>
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
          <label className="form-control w-full">
            <span className="label">Bank name</span>
            <input
              {...register("bankName")}
              className="textarea textarea-bordered mt-1 w-full"
              type="text"
            />
            {errors.bankName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bankName.message}
              </p>
            )}
          </label>

          {/* account number */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Account number</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("accountNumber")}
            />
            <div className="label">
              {errors.accountNumber && (
                <span className="label-text-alt text-error">
                  {errors.accountNumber?.message}
                </span>
              )}
            </div>
          </label>

          {/* bankBranch */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Bank branch</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("bankBranch")}
            />
            <div className="label">
              {errors.bankBranch && (
                <span className="label-text-alt text-error">
                  {errors.bankBranch?.message}
                </span>
              )}
            </div>
          </label>

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
