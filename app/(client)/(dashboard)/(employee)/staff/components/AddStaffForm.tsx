import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "@/app/components/Modal";
import Button from "@/app/components/Button";
import ImageUpload from "./ImageUpload";
import { StaffData } from "../types";
import { useStaffStore } from "../staff-store";
import { useDepartmentStore } from "../../departments/department-store";
// import { Designation } from "../../designations/types";
// import { useDesignationStore } from "../../designations/designations-store";
import SearchAndResultsInputComponent, {
  Data as SearchAndResultsComponentType,
} from "@/app/components/SearchAndResultsInputComponent";
import { Icon } from "@iconify/react/dist/iconify.js";

const AddStaffForm = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset, watch } = useForm<StaffData>();
  const { addStaff, loading, fetchStaff } = useStaffStore();
  const { fetchDepartments, departments, fetchDepartmentById } =
    useDepartmentStore();
  // const { designations, fetchDesignations } = useDesignationStore();
  const [designations, setDesignations] = useState<
    SearchAndResultsComponentType[]
  >([]);
  const [fetchingDesignations, setFetchingDesignations] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [disableDesignationField, setDisableDesignationField] = useState(true);
  const [designationIds, setDesignationIds] = useState<number[]>([]);
  const [designationError, setDesignationError] = useState("");

  // fetch departments data
  useEffect(() => {
    const fetchDepartmentsData = async () => {
      if (isOpen && departments.length === 0) {
        await fetchDepartments();
        console.log(departments);
      }
    };

    fetchDepartmentsData();
  }, [isOpen, departments, fetchDepartments]);

  // Upload image to cloudinary
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
    const fetchData = async (id: number) => {
      setDisableDesignationField(true);
      setFetchingDesignations(true);
      const response = await fetchDepartmentById(id);
      setDisableDesignationField(false);
      if (response) {
        setDesignations(
          response.designations.map((item) => {
            return {
              name: item.name,
              id: item.id,
              selected: false,
            };
          }),
        );
        setFetchingDesignations(false);
      }
    };
    if (departmentId) {
      console.log("Department ID: ", departmentId);
      fetchData(departmentId);
    }
  }, [departmentId, fetchDepartmentById]);

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
  const onSubmit: SubmitHandler<StaffData> = async (data) => {
    let imageUrl = "";
    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
    }

    if (designationIds == undefined || designationIds.length == 0) {
      setDesignationError("Select at least one team designation");
      return;
    } else {
      setDesignationError("");
    }

    const staffData = {
      ...data,
      departmentId: Number(data.departmentId),
      designation: designationIds,
      image: imageUrl,
    };

    if (!data.staffId) {
      delete staffData.staffId;
    }

    await addStaff(staffData);

    if (!useStaffStore.getState().error) {
      toast.success("Staff added successfully!");
      fetchStaff();
      reset();
      imageUrl = "";
      setSelectedImage(() => null);
      console.log("selectedImage", selectedImage);

      onClose();
    } else {
      toast.error(`Failed to add staff: ${useStaffStore.getState().error}`);
    }
  };

  return (
    <div className="">
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="w-full">
          <h2 className="mb-5 text-center text-2xl font-bold">Add Staff</h2>

          <div className="mb-4 flex items-center justify-center">
            <ImageUpload onImageSelect={(file) => setSelectedImage(file)} id="staff_image" />
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
                  required
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
                  placeholder="Date hired here"
                  className="input input-bordered w-full"
                />
              </label>

              {/* Supervisor */}
              {/* <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Supervisor</span>
                </div>
                <select
                  defaultValue=""
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
              <Button className="mx-auto w-1/2" disabled={loading}>
                {loading || imageLoading ? "Adding staff..." : "Add staff"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddStaffForm;
