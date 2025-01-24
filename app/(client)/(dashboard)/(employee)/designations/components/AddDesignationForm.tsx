import React, { useEffect } from "react";
import { useDepartmentStore } from "../../departments/department-store";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Designation } from "../types";
import { useDesignationStore } from "../designations-store";
interface AddDesignationFormProps {
  openModal: boolean;
  closeModal: () => void;
  designationTableData?: Designation;
  type?: "add" | "edit" | "view";
}

const AddDesignationForm = ({
  openModal,
  closeModal,
  designationTableData,
  type = "add",
}: AddDesignationFormProps) => {
  const { fetchDepartments, departments } = useDepartmentStore(); //getting departments from store
  const { register, handleSubmit, reset } = useForm<Designation>(); //useForm hook
  const { addDesignation, updatingData, fetchDesignations, updateDesignation } =
    useDesignationStore(); //getting addDesignation function from store

  // fetching department data
  useEffect(() => {
    const fetchDepartmentsData = async () => {
      if (openModal && departments.length === 0) {
        await fetchDepartments();
      }
    };

    fetchDepartmentsData();
  }, [openModal, departments, fetchDepartments]);

  useEffect(() => {
    // resetting form with data from table
    if (designationTableData) {
      reset(designationTableData);
    }
  }, [designationTableData, reset]);

  //   submitting form
  const onSubmit: SubmitHandler<Designation> = async (data) => {
    // const designationData = {
    //   name: data.name,
    // };

    // check if edit or add to use the appropriate api
    type === "edit"
      ? await updateDesignation(data.id, data)
      : await addDesignation(data);

    if (!useDesignationStore.getState().error) {
      toast.success("Designation added successfully!");
      await fetchDesignations();
      reset();
      closeModal();
    } else {
      toast.error(
        `Failed to add designation: ${useDesignationStore.getState().error}`,
      ); //error message
    }
  };

  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="mb-5 text-center text-xl font-bold">
          {type === "view"
            ? "Designation details"
            : type === "edit"
              ? "Edit designation"
              : "Add designation"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* designation */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              required
              {...register("name")}
              type="text"
              readOnly={type === "view"}
              placeholder="Enter new designation"
              className="input input-bordered w-full"
            />
          </label>

          {/* department */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Staff Department</span>
            </div>
            <select
              defaultValue=""
              disabled={type === "view"}
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

          <div className="modal-action flex justify-end">
            <button type="button" onClick={closeModal} className="btn rounded">
              Cancel
            </button>
            {type !== "view" && (
              <div className="">
                {type === "edit" ? (
                  <button type="submit" className={`btn btn-primary rounded`}>
                    {updatingData ? "Saving..." : "Save Edit"}
                  </button>
                ) : (
                  <button type="submit" className={`btn btn-primary rounded`}>
                    {updatingData ? "Adding..." : "Add designation"}
                  </button>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={closeModal}></div>
    </div>
  );
};

export default AddDesignationForm;
