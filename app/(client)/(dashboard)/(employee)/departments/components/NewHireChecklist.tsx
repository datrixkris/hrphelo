import React from "react";
import ProgressBar from "../../../projects/components/ProgressBar";
import FormList from "./NewHireFormList";

interface NewHireChecklistProps {
  openModal: boolean;
  closeModal: () => void;
}

const NewHireChecklist = ({ openModal, closeModal }: NewHireChecklistProps) => {
  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box max-w-[850px] divide-y-2">
        {/* heading */}
        <div className="">
          <h2 className="text-xl font-semibold uppercase">
            Christian Amoakohene
          </h2>
          <p className="mb-5 text-sm capitalize">IT Department</p>

          {/* progress bar */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold"> Progress</p>
            <ProgressBar progress={80} />
            <p className="text-sm font-bold">20%</p>
          </div>
        </div>

        {/* checklist */}
        <div className="mt-5 space-y-4 divide-y">
          <FormList />
          <FormList />
        </div>

        <div className="buttons flex justify-end gap-2 pt-4">
          <button className="btn" onClick={closeModal} type="button">
            Close
          </button>
          {/* <button className="btn btn-primary">Save</button> */}
        </div>
      </div>
    </div>
  );
};

export default NewHireChecklist;
