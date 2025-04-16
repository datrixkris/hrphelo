import React from "react";
import ProgressBar from "../../projects/components/ProgressBar";

interface OnboardingNewHireChecklistProps {
  openModal: boolean;
  closeModal: () => void;
}

const OnboardingNewHireChecklist = ({
  openModal,
  closeModal,
}: OnboardingNewHireChecklistProps) => {
  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box max-w-[850px]">
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
        <FormList closeModal={closeModal} />
      </div>
    </div>
  );
};

export default OnboardingNewHireChecklist;

const FormList = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <form className="mt-5 space-y-4 divide-y-2">
      <div className="flex items-center justify-between p-2">
        {/* description */}
        <div className="space-y-1 line-through opacity-50">
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">Devices</p>
          {/* description */}
          <p className="text-sm">Give out the following devices</p>
          {/* Assets */}
          <p className="text-xs">
            <span className="font-semibold">Assets:</span> <span>Computer</span>
          </p>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          {/* does not apply */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="1"
                defaultChecked
                className="radio-neutral radio"
              />
              <span className="label-text pl-1">Does not apply</span>
            </label>
          </div>

          {/* completed */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="1"
                defaultChecked
                className="radio-success radio"
              />
              <span className="label-text pl-1">Completed</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-2">
        {/* description */}
        <div className="space-y-1">
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">Devices</p>
          {/* description */}
          <p className="text-sm">Give out the following devices</p>
          {/* Assets */}
          <p className="text-xs">
            <span className="font-semibold">Assets:</span> <span>Computer</span>
          </p>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          {/* does not apply */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="2"
                defaultChecked
                className="radio-neutral radio"
              />
              <span className="label-text pl-1">Does not apply</span>
            </label>
          </div>

          {/* completed */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="2"
                defaultChecked
                className="radio-success radio"
              />
              <span className="label-text pl-1">Completed</span>
            </label>
          </div>
        </div>
      </div>

      <div className="buttons flex justify-end gap-2 pt-4">
        <button className="btn" onClick={closeModal} type="button">
          Cancel
        </button>
        <button className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};
