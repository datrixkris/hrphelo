import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { Checklist as ChecklistType } from "../types";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import AddChecklistForm from "../../(employee)/departments/components/AddChecklistForm";
import { useOnboardingStore } from "../onboarding-store";

interface ChecklistProps {
  checklist: ChecklistType;
  refresh: () => Promise<void>;
}

const Checklist = ({ checklist, refresh }: ChecklistProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { deleteChecklist, updatingData } = useOnboardingStore();

  useEffect(() => {
    console.log(openEdit, openDelete);
  }, [openEdit, openDelete]);

  async function delChecklist(id: number) {
    await deleteChecklist(id);
    await refresh();
    setOpenDelete(false);
  }

  return (
    <>
      <li className="mb-5 flex items-start gap-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-neutral">
          <Icon icon="heroicons:check-16-solid" className="text-white" />
        </div>

        <div className="space-y-1">
          {/* Name of checklist */}
          <p className="text-sm font-semibold uppercase text-hr-yellow">
            {checklist.name}{" "}
            {!checklist.is_optional && (
              <span className="badge badge-error badge-sm text-[10px] font-normal normal-case">
                All staff
              </span>
            )}
          </p>
          {/* description */}
          <p className="text-sm">{checklist.description}</p>
          {/* Assets */}
          {checklist.assetType && (
            <p className="text-xs">
              <span className="font-semibold">Asset:</span>{" "}
              <span>{checklist.assetType}</span>
            </p>
          )}
          {/* assignee */}
          {checklist.assignedStaff && (
            <p className="text-xs">
              <span className="font-semibold">Assigned to:</span>{" "}
              <span>{checklist.assignedStaff.name}</span>
            </p>
          )}
          {/* edit and delete */}
          <p className="!mt-2 flex gap-3 text-xs">
            <button
              onClick={() => setOpenEdit(true)}
              className="btn btn-xs flex cursor-pointer items-center gap-1 text-neutral"
            >
              {" "}
              <Icon icon="heroicons:pencil" className="text-md" /> Edit
            </button>{" "}
            <button
              onClick={() => setOpenDelete(true)}
              className="btn btn-xs flex cursor-pointer items-center gap-1 text-error"
            >
              <Icon icon="heroicons:trash" className="text-md" /> Delete
            </button>
          </p>
        </div>
      </li>

      {openDelete && (
        <ConfirmationModal
          isOpen={openDelete}
          onConfirm={() => delChecklist(checklist.id)}
          message="Are you sure you want to delete?"
          onCancel={() => setOpenDelete(false)}
          title={`Delete Checklist`}
          type="delete"
          loading={updatingData}
        />
      )}

      {openEdit && (
        <AddChecklistForm
          checklistData={checklist}
          edit={true}
          openModal={openEdit}
          closeModal={() => setOpenEdit(false)}
          refreshAll={refresh}
        />
      )}
    </>
  );
};

export default Checklist;
