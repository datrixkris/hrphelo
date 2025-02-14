import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

const Checklist = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <>
      <li className="mb-5 flex items-start gap-4">
        <div className="flex size-8 items-center justify-center rounded-full bg-neutral">
          <Icon icon="heroicons:check-16-solid" className="text-white" />
        </div>

        <div className="space-y-1">
          {/* Name of checklist */}
          <p className="text-sm font-semibold uppercase text-hr-yellow">
            Devices{" "}
            <span className="badge badge-error badge-sm text-[10px] font-normal normal-case">
              All staff
            </span>
          </p>
          {/* description */}
          <p className="text-sm">Give out the following devices</p>
          {/* Assets */}
          <p className="text-xs">
            <span className="font-semibold">Asset:</span> <span>Computer</span>
          </p>
          {/* assignee */}
          {/* <p className="text-xs">
            <span className="font-semibold">Assigned to:</span>{" "}
            <span>Kris Wale</span>
          </p> */}
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

      {/* {openDelete && (
          <ConfirmationModal
            isOpen={openDelete}
            onConfirm={() => console.log("somthing")}
            message="Are you sure you want to delete?"
            onCancel={() => setOpenDelete(false)}
            title={`Delete Checklist`}
            type="delete"
            loading={false}
          />
        )} */}

      {/* {openEdit && (
          <AddChecklistForm
            edit={true}
            openModal={openEdit}
            closeModal={() => setOpenEdit(false)}
          />
        )} */}
    </>
  );
};

export default Checklist;
