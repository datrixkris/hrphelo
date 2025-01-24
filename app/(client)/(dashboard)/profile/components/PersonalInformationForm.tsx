import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useStaffStore } from "@/app/(client)/(dashboard)/(employee)/staff/staff-store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useProfileDataContext } from "../profileDataContext";
// import { useState } from "react";

// Zod schema for form validation
const profileSchema = z.object({
  altContact: z.string(),
  nationality: z.string(),
  noOfChildren: z.string(),
  maritalStatus: z.enum(["single", "married"]),
});

// Infer the TypeScript types from the Zod schema
type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileProps = {
  onClose: () => void;
};

export const PersonalInformationForm: React.FC<ProfileProps> = ({
  onClose,
}) => {
  const updateStaffProfileDetails = useStaffStore(
    (state) => state.updateStaffProfileDetails,
  );
  const updatingData = useStaffStore((state) => state.updatingData);
  // useForm with Zod validation schema
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });
  const { profileData: profile, refreshData } = useProfileDataContext()!;

  useEffect(() => {
    console.log(profile);
    reset({
      altContact: profile?.personalInfo?.alt_contact,
      nationality: profile?.personalInfo?.nationality,
      maritalStatus: profile?.personalInfo?.marital_status,
      noOfChildren: profile?.personalInfo?.no_of_children
        ? String(profile?.personalInfo?.no_of_children)
        : "",
    });
  }, [profile]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    console.log(data);
    const PersonalInfo = {
      alt_contact: data.altContact,
      nationality: data.nationality,
      marital_status: data.maritalStatus,
      no_of_children: Number(data.noOfChildren),
    };

    // update data with function from store
    if (profile?.id) {
      await updateStaffProfileDetails(PersonalInfo, profile.id);

      if (!useStaffStore.getState().error) {
        // await fetchStaffProfile(profile.id);
        refreshData();
        toast.success("Personal info updated successfully");
        // console.log(useStaffStore.getState().profile);
        onClose();
      } else {
        toast.error(useStaffStore.getState().error);
      }
    }
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
          <h4 className="text-lg font-semibold">Personal Information</h4>
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
            <span className="label">Alternative contact</span>
            <input
              {...register("altContact")}
              className="textarea textarea-bordered mt-1 w-full"
              type="text"
              placeholder="Type here"
            />
            {errors.altContact && (
              <p className="mt-1 text-sm text-red-500">
                {errors.altContact.message}
              </p>
            )}
          </label>

          {/* Marital status */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Marital status</span>
            </div>
            <select
              defaultValue=""
              className="select select-bordered"
              {...register("maritalStatus")}
            >
              <option disabled value="">
                Pick one
              </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            <div className="label">
              {errors.maritalStatus && (
                <span className="label-text-alt text-error">
                  {errors.maritalStatus?.message}
                </span>
              )}
            </div>
          </label>

          {/* nationality */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Nationality</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("nationality")}
            />
            <div className="label">
              {errors.nationality && (
                <span className="label-text-alt text-error">
                  {errors.nationality?.message}
                </span>
              )}
            </div>
          </label>

          {/* noOfChildren */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Number of children</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              {...register("noOfChildren")}
            />
            <div className="label">
              {errors.noOfChildren && (
                <span className="label-text-alt text-error">
                  {errors.noOfChildren?.message}
                </span>
              )}
            </div>
          </label>

          <div className="submit-section mt-4 text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updatingData}
            >
              {updatingData ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
