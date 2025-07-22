"use client";
import Button from "@/app/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Modal from "@/app/components/Modal";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import { StaffDetail } from "../types";
import { useDepartmentStore } from "../../departments/department-store";
// import { useParams } from "next/navigation";
import { useStaffStore } from "../staff-store";
// import { Designation } from "../../designations/types";
import SearchAndResultsInputComponent, {
  Data as SearchAndResultsComponentType,
} from "@/app/components/SearchAndResultsInputComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "@/app/stores/auth-store";

interface EditStaffProps {
  isOpen: boolean;
  onClose: () => void;
  staffDetails: StaffDetail | null;
  refreshData: () => Promise<void>;
}

const EditStaffForm = ({
  isOpen,
  onClose,
  staffDetails,
  refreshData,
}: EditStaffProps) => {
  // const params = useParams();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    // formState: { isDirty },
  } = useForm<StaffDetail>();
  const { updatingData, fetchStaff, error, updateStaffDetails } =
    useStaffStore();
  const { fetchDepartments, departments, fetchDepartmentById } =
    useDepartmentStore();
  // const { designations, fetchDesignations } = useDesignationStore();
  const [designations, setDesignations] = useState<
    SearchAndResultsComponentType[]
  >([]);
  const [fetchingDesignations, setFetchingDesignations] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [disableDesignationField, setDisableDesignationField] = useState(false);
  const [designationIds, setDesignationIds] = useState<number[]>([]);
  const [designationError, setDesignationError] = useState("");

  // function for fetching designations data
  const fetchDesignationData = useCallback(
    async (id: number) => {
      setDisableDesignationField(true);
      setFetchingDesignations(true);
      const response = await fetchDepartmentById(id);
      setDisableDesignationField(false);
      if (response) {
        setDesignations(
          response.designations.map((item) => {
            if (
              staffDetails?.designations
                ?.map((designation) => designation.id)
                .includes(item.id)
            ) {
              return {
                name: item.name,
                id: item.id,
                selected: true,
              };
            }
            return {
              name: item.name,
              id: item.id,
              selected: false,
            };
          }),
        );
        setFetchingDesignations(false);
      }
    },
    [
      fetchDepartmentById,
      setDisableDesignationField,
      setFetchingDesignations,
      setDesignations,
    ],
  );

  // fetch departments data
  useEffect(() => {
    const fetchDepartmentsData = async () => {
      // check if there are no data before you hit the api
      if (!(departments.length > 0)) {
        await fetchDepartments();
        await fetchStaff();
      }
    };

    fetchDepartmentsData();

    if (staffDetails) {
      reset({
        name: staffDetails.name,
        staffId: staffDetails.staffId,
        gender: staffDetails.gender,
        image: staffDetails.image,
        date_of_birth: staffDetails.date_of_birth?.slice(0, 10),
        // designation: staffDetails.designations![0].id, //not necessary.. yet to find out
        email: staffDetails.email,
        contact: staffDetails.contact,
        departmentId: staffDetails.departmentId,
        hiring_date: staffDetails.hiring_date?.slice(0, 10),
        // supervisorId: staffDetails.supervisorId,
      });
      if (staffDetails.departmentId) {
        fetchDesignationData(staffDetails.departmentId);
      }
    }
  }, [
    staffDetails,
    reset,
    departments.length,
    fetchDepartments,
    fetchStaff,
    fetchDesignationData,
  ]);

  // upload image to cloudinary
  const uploadImageToCloudinary = async (file: File) => {
    setImageLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hrphelo");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    setImageLoading(false);
    return data.secure_url;
  };

  // watch for changes in the department select
  const departmentId = watch("departmentId");

  // fetch designation data based on depqartment selected
  useEffect(() => {
    if (departmentId) {
      console.log("Department ID: ", departmentId);
      fetchDesignationData(departmentId);
    }
  }, [departmentId, fetchDesignationData]);

  function selectDesignations(data: SearchAndResultsComponentType) {
    setDesignations((prevData) =>
      prevData.map((item) => (item.id === data.id ? data : item)),
    );
  }

  function removeSelectedDesignation(data: SearchAndResultsComponentType) {
    setDesignations((prevData) =>
      prevData.map((item) =>
        item.id === data.id ? { ...data, selected: false } : item,
      ),
    );
  }

  //set ids if designation changes
  useEffect(() => {
    setDesignationIds(
      designations
        .filter((designation) => designation.selected)
        .map((item) => item.id),
    );
    console.log(designationIds);
  }, [designations]);

  // submit form
  const onSubmit: SubmitHandler<StaffDetail> = async (data) => {
    let imageUrl = staffDetails?.image || "";
    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
    }

    if (designationIds == undefined || designationIds.length == 0) {
      setDesignationError("Select at least one team designation");
      return;
    } else {
      setDesignationError("");
    }

    // taking the email out so that I can update staff data
    const { email, ...dataWithoutEmail } = data;
    console.log(email);

    const staffData = {
      ...dataWithoutEmail,
      departmentId: Number(data.departmentId),
      designation: designationIds,
      image: imageUrl,
    };
    if (staffDetails?.id) {
      await updateStaffDetails(staffData, staffDetails.id);
    } else {
      alert("cannot find staff id to fetch data");
    }
    if (!useStaffStore.getState().error) {
      console.log(error, updatingData);
      // onClose();
      await refreshData();
      await useAuthStore.getState().refreshUserData();
      toast.success("Staff data updated");
      reset();
      onClose();
    } else {
      toast.error(useStaffStore.getState().error);
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full">
          <h2 className="mb-5 text-center text-2xl font-bold">Staff Profile</h2>

          <div className="mb-4 flex items-center justify-center">
            <ImageUpload
              id="staff_image"
              onImageSelect={(file) => setSelectedImage(file)}
              image={staffDetails?.image}
            />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-5 sm:grid-cols-2">
              {/*  name */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <input
                  required
                  {...register("name")}
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
                  {...register("staffId")}
                  type="text"
                  placeholder="Staff ID here"
                  className="input input-bordered w-full"
                />
              </label>

              {/*  gender */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  defaultValue=""
                  {...register("gender")}
                  required
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Gender{" "}
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              {/* Date of birth */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Date of birth</span>
                </div>
                <input
                  {...register("date_of_birth")}
                  required
                  type="date"
                  placeholder="Date of birth here"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Staff Department */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Staff Department</span>
                </div>
                <select
                  defaultValue=""
                  {...register("departmentId")}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Choose a department
                  </option>
                  {departments.map((department) => {
                    return (
                      <option value={Number(department.id)} key={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
              </label>

              {/* Designation */}
              <label
                className={`form-control w-full ${disableDesignationField ? "pointer-events-none opacity-50" : ""}`}
              >
                <div className="label">
                  <span className="label-text">Designations</span>
                  {fetchingDesignations && (
                    <span className="label-text-alt">
                      <Icon
                        icon="line-md:loading-twotone-loop"
                        className="text-lg"
                      />
                    </span>
                  )}
                </div>
                {/* <select
                  defaultValue=""
                  {...register("designation")}
                  required
                  className={`select select-bordered w-full ${fetchingDesignations ? "!cursor-progress" : ""}`}
                  disabled={disableDesignationField}
                >
                  <option disabled value="">
                    Choose a designation
                  </option>
                  {designations.map((designation) => {
                    return (
                      <option
                        value={Number(designation.id)}
                        key={designation.id}
                      >
                        {designation.name}
                      </option>
                    );
                  })}
                </select> */}
                <SearchAndResultsInputComponent
                  data={designations}
                  onSelected={(data) => selectDesignations(data)}
                  loading={fetchingDesignations}
                />
                {/* selected designations */}
                <div className="mt-2 flex flex-wrap gap-1">
                  {designations.map((designation) => {
                    if (designation.selected) {
                      return (
                        <div
                          key={designation.id}
                          className="badge badge-outline text-xs"
                        >
                          {designation.name}{" "}
                          <Icon
                            icon="heroicons:x-circle-16-solid"
                            className="ml-1 cursor-pointer text-sm"
                            onClick={() =>
                              removeSelectedDesignation(designation)
                            }
                          />
                        </div>
                      );
                    }
                  })}
                </div>
                {designationError && (
                  <span className="label-text text-error">
                    {designationError}
                  </span>
                )}
              </label>

              {/* Contact number */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Contact number</span>
                </div>
                <input
                  {...register("contact")}
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
                  {...register("email")}
                  required
                  type="email"
                  readOnly
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
                  {...register("hiring_date")}
                  required
                  type="date"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Supervisor */}
              {/* <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Supervisor</span>
                </div>
                <select
                  {...register("supervisorId")}
                  className="select select-bordered w-full"
                >
                  <option disabled value="">
                    Choose a supervisor
                  </option>
                  {staffs.map((staff) => (
                    <option key={staff.id} value={Number(staff.id)}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </label> */}
            </div>

            {/* submit */}
            <div className="!mt-10">
              <Button className="mx-auto w-1/2" disabled={updatingData}>
                {updatingData || imageLoading
                  ? "Updating Staff Details..."
                  : "Update Staff Details"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditStaffForm;
