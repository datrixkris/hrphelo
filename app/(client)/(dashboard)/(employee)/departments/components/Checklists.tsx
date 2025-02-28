import Button from "@/app/components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import AddChecklistForm from "./AddChecklistForm";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { useOnboardingStore } from "../../../onboarding/onboarding-store";
import { Checklist } from "../../../onboarding/types";
import { useDepartmentStore } from "../department-store";

const Checklists = ({
  checklists,
  refresh,
}: {
  checklists: Checklist[];
  refresh?: (id: number) => Promise<void>;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="">
      <div className="flex justify-end">
        <Button onClick={() => setOpenModal(true)}>
          <div className="flex items-center justify-center gap-1">
            <Icon icon="heroicons:plus" className="text-lg" /> Add List
          </div>
        </Button>
      </div>

      <ul className="">
        {checklists.map((checklist) => (
          <List key={checklist.id} checklist={checklist} refresh={refresh} />
        ))}
      </ul>

      {/* checklist form */}
      {openModal && (
        <AddChecklistForm
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default Checklists;

const List = ({
  checklist,
  refresh,
}: {
  checklist: Checklist;
  refresh?: (id: number) => Promise<void>;
}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { deleteChecklist, updatingData } = useOnboardingStore();
  const { department } = useDepartmentStore();

  useEffect(() => {
    console.log(openEdit, openDelete);
  }, [openEdit, openDelete]);

  async function delChecklist(id: number) {
    await deleteChecklist(id);
    refresh && (await refresh(department!.id));
    setOpenDelete(false);
  }

  return (
    <>
      <li className="mb-5 flex items-start gap-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-neutral">
          <Icon icon="heroicons:check-16-solid" className="text-white" />
        </div>

        <div className="space-y-1">
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">
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
              <span>Computer</span>
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
          refresh={refresh}
        />
      )}
    </>
  );
};
