import React, { useEffect, useState } from "react";
// import { StaffData } from "../../staff/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Resignation } from "../../../resignations/types";
import { Checklist } from "../../../onboarding/types";
import { useOnboardingStore } from "../../../onboarding/onboarding-store";
import { useDepartmentStore } from "../department-store";
import { ChecklistStatus } from "./NewHireFormList";
import TableSkeleton from "@/app/components/TableSkeleton";

interface ResignationsChecklistProps {
  openModal: boolean;
  closeModal: () => void;
  resignation: Resignation | null;
}

const ResignationsChecklist = ({
  openModal,
  closeModal,
  resignation,
}: ResignationsChecklistProps) => {
  const [checklists, setChecklists] = useState<Checklist[] | null>(null);
  const { loading, fetchChecklistsWithStatusApply } = useOnboardingStore();
  const department = useDepartmentStore((state) => state.department);

  useEffect(() => {
    const fetchData = async () => {
      if (resignation?.staff?.id) {
        const data = await fetchChecklistsWithStatusApply(resignation.staff.id);
        setChecklists(data);
      }
    };

    fetchData();
  }, [resignation]);

  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box max-w-[850px] divide-y-2">
        {/* heading */}
        <div className="relative">
          <h2 className="text-xl font-semibold uppercase">
            {resignation?.staff?.name}
          </h2>
          <p className="mb-5 text-sm capitalize">
            {resignation?.staff?.department?.name} Department
          </p>

          {/* progress bar */}
          <div className="flex items-center gap-3">
            {/* <p className="text-sm font-bold"> Progress</p> */}
            {/* <ProgressBar progress={getNewHireProgress(staff, department?.id)} />
                <p className="text-sm font-bold">
                  {getNewHireProgress(staff, department?.id)}%
                </p> */}
          </div>

          <div className="">
            <p className="text-base font-semibold"> Offboarding checklist</p>
            <p className="text-xs">
              Please mark &apos;Returned&apos; on the checklist if the resigning
              staff member has satisfied this item.
            </p>
          </div>

          {/* close button */}
          <Icon
            icon="heroicons:x-circle"
            className="absolute -right-2 -top-2 cursor-pointer text-4xl"
            onClick={closeModal}
          />
        </div>

        {/* checklist */}
        {loading ? (
          <div className="mt-5">
            <TableSkeleton />
          </div>
        ) : (
          <div className="mt-5 space-y-4 divide-y">
            {checklists?.map((checklist) => {
              if (checklist.departmentId === department!.id) {
                return (
                  <OffboardingList
                    checklist={checklist}
                    key={checklist.id}
                    staffId={resignation?.staff?.id}
                  />
                );
              }
            })}
            {/* no checklists avaliable */}
            {checklists?.length === 0 && !loading && (
              <div className="mb-5 mt-5 text-center">No data available</div>
            )}
          </div>
        )}

        <div className="buttons flex justify-end gap-2 pt-4">
          <button className="btn" onClick={closeModal} type="button">
            Save
          </button>
          {/* <button className="btn btn-primary">Save</button> */}
        </div>
      </div>
    </div>
  );
};

export default ResignationsChecklist;

const OffboardingList = ({
  checklist,
  staffId,
}: {
  checklist: Checklist;
  staffId: number | undefined;
}) => {
  const [checked, setChecked] = useState<ChecklistStatus>("");
  const { markChecklist, updatingData } = useOnboardingStore();

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checkStatus: ChecklistStatus,
  ) => {
    if (staffId) {
      await markChecklist({
        status: checkStatus,
        checklistId: checklist.id,
        staffId,
      });
      if (!useOnboardingStore.getState().error) {
        setChecked(checkStatus);
      }
    }
  };
  return (
    <div
      className={`flex items-center justify-between gap-4 p-2 ${updatingData ? "!pointer-events-none !cursor-not-allowed opacity-50" : ""}`}
    >
      {/* description */}
      <div className="">
        <div
          className={`space-y-1 ${checked === "returned" ? "line-through opacity-50" : ""}`}
        >
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">
            {checklist.name}
          </p>
          {/* description */}
          <p className="text-sm">{checklist.description}</p>
          {/* Assets */}
          <div className="space-y-1">
            {checklist.assetType == "physical" && (
              <p className="text-sm font-semibold">Has asset</p>
            )}
            {/* {assets.map((asset, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon icon="heroicons:check-circle" className="text-success" />
                <p className="text-xs">
                  {asset.name} - {asset.details}
                </p>
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="flex shrink-0 gap-2">
        {/* loading */}

        {updatingData && (
          <div className="self-center">
            <Icon icon="line-md:loading-twotone-loop"></Icon>
          </div>
        )}

        {/* return */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              name="1"
              checked={checked === "returned"}
              onChange={(event) => handleCheckboxChange(event, "returned")}
              className="checkbox-success checkbox"
            />
            <span className="label-text pl-1">Returned</span>
          </label>
        </div>
      </div>
    </div>
  );
};
