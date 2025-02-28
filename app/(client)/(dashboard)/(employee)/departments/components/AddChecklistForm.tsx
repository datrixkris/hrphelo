import SearchAndResultsInputComponent from "@/app/components/SearchAndResultsInputComponent";
import React, { useEffect, useState } from "react";
import { useOnboardingStore } from "../../../onboarding/onboarding-store";
import { Checklist, CreateChecklist } from "../../../onboarding/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDepartmentStore } from "../department-store";
import { Data as DeptStaffData } from "@/app/components/SearchAndResultsInputComponent";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { is } from "date-fns/locale";

interface AddChecklistFormProps {
  openModal: boolean;
  closeModal: () => void;
  edit?: boolean;
  checklistData?: Checklist;
  refresh?: (id: number) => Promise<void>;
  refreshAll?: () => Promise<void>;
}

const AddChecklistForm = ({
  openModal,
  closeModal,
  edit = false,
  checklistData,
  refresh,
  refreshAll,
}: AddChecklistFormProps) => {
  const [showAsset, setShowAsset] = useState(false);
  const { createChecklist, loading, editChecklist, updatingData } =
    useOnboardingStore();
  const { register, handleSubmit, reset } = useForm<CreateChecklist>();
  const [deptStaff, setDeptStaff] = useState<DeptStaffData[]>([]);
  const department = useDepartmentStore((state) => state.department);
  // const fetchDepartmentById = useDepartmentStore(
  //   (state) => state.fetchDepartmentById,
  // );
  const [assigneeId, setAssigneeId] = useState<number | null>(null);

  useEffect(() => {
    if (useDepartmentStore.getState().department) {
      const staff = useDepartmentStore
        .getState()
        .department!.staff.map((item) => {
          return {
            name: item.name,
            id: item.id,
            selected: false,
          };
        });
      setDeptStaff(staff);
    }
  }, []);

  useEffect(() => {
    if (edit && checklistData) {
      reset({
        name: checklistData.name,
        description: checklistData.description,
        is_optional: !checklistData.is_optional,
      });
      if (checklistData.assignedStaff) {
        setAssigneeId(checklistData.assignedStaff.id);
      }
    }
  }, [checklistData, reset, edit]);

  function selectMember(data: DeptStaffData) {
    console.log(data);
    setDeptStaff((prev) =>
      prev.map((item) => {
        return item.id === data.id ? data : { ...item, selected: false };
      }),
    );
    setAssigneeId(data.selected ? data.id : null);
  }

  function removeAssignee() {
    setDeptStaff((prev) =>
      prev.map((item) => {
        return { ...item, selected: false };
      }),
    );
    setAssigneeId(null);
  }

  // submitting form
  const onSubmit: SubmitHandler<CreateChecklist> = async (data) => {
    const checkData = {
      ...data,
      assignee: assigneeId,
      is_optional: !data.is_optional,
    };
    edit && checklistData
      ? await editChecklist(checkData, checklistData.id)
      : await createChecklist(checkData);

    if (!useOnboardingStore.getState().error) {
      refresh && (await refresh(department!.id));
      refreshAll && (await refreshAll());
      reset();
      removeAssignee();
      closeModal();
    }
  };

  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="mb-5 text-center text-xl font-bold">
          {edit ? "Edit Checklist" : "Add Checklist"}
        </h2>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                Title <span className="text-error">*</span>
              </span>
            </div>
            <input
              required
              type="text"
              {...register("name")}
              placeholder="Checklist title"
              className="input input-bordered w-full"
            />
          </label>

          {/* description */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Checklist description</span>
            </div>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered"
              placeholder="Describe your checklist"
            ></textarea>
          </label>

          {/* Assignee */}
          {department && (
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Assignee</span>
              </div>
              <SearchAndResultsInputComponent
                data={deptStaff}
                onSelected={selectMember}
              />
              {/* avatars */}
              {
                <div className="my-2 -space-x-4 rtl:space-x-reverse">
                  {department?.staff.map((staff) => {
                    if (assigneeId === staff.id) {
                      return (
                        <div
                          key={staff.id}
                          className="flex w-fit flex-col items-center justify-center"
                        >
                          <div className="tooltip" data-tip={staff.name}>
                            <div className="avatar relative">
                              <div className="w-11 rounded-full border">
                                <img src={staff.image} alt={staff.name} />
                              </div>
                              <Icon
                                icon="heroicons:x-circle"
                                className="absolute -right-2 top-0 cursor-pointer text-xl"
                                onClick={removeAssignee}
                              />
                            </div>
                          </div>
                          <p className="text-xs">{staff.name}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              }
            </label>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="">
              {/* check */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    onChange={(e) => setShowAsset(e.target.checked)}
                    checked={showAsset}
                    className="checkbox-info checkbox"
                  />
                  <span className="label-text pl-1">Checklist is an asset</span>
                </label>
              </div>

              {/* asset */}
              {/* {showAsset && (
                <label className="form-control w-full">
                  <input
                    required={showAsset}
                    type="text"
                    placeholder="Enter asset name"
                    className="input input-bordered w-full"
                    {...register("assetType")}
                  />
                </label>
              )} */}
            </div>

            <div className="">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    {...register("is_optional")}
                    className="checkbox-info checkbox"
                  />
                  <span className="label-text pl-1">Checklist is required</span>
                </label>
              </div>
            </div>
          </div>

          <div className="modal-action !mt-6 flex justify-end">
            <button type="button" onClick={closeModal} className="btn rounded">
              Cancel
            </button>
            {edit ? (
              <button
                type="submit"
                disabled={updatingData || loading}
                className={`btn btn-primary rounded`}
              >
                {updatingData || loading ? "Editing..." : "Edit Checklist"}
              </button>
            ) : (
              <button
                disabled={loading}
                type="submit"
                className={`btn btn-primary rounded`}
              >
                {loading ? "Adding..." : "Add Checklist"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChecklistForm;
