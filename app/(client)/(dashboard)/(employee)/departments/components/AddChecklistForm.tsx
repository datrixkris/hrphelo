import SearchAndResultsInputComponent from "@/app/components/SearchAndResultsInputComponent";
import React, { useState } from "react";

interface AddChecklistFormProps {
  openModal: boolean;
  closeModal: () => void;
}

const AddChecklistForm = ({ openModal, closeModal }: AddChecklistFormProps) => {
  const [showAsset, setShowAsset] = useState(false);
  return (
    <div className={`modal ${openModal ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="mb-5 text-center text-xl font-bold">Add Checklist</h2>

        <form className="space-y-2">
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
              //   readOnly={type === "view"}
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
              className="textarea textarea-bordered"
              placeholder="Describe your checklist"
            ></textarea>
          </label>

          {/* Assignee */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Assignee</span>
            </div>
            {/* <input
              required
              type="text"
              //   readOnly={type === "view"}
              placeholder="Checklist title"
              className="input input-bordered w-full"
            /> */}
            <SearchAndResultsInputComponent
              data={[]}
              onSelected={() => console.log()}
            />
          </label>

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
              {showAsset && (
                <label className="form-control w-full">
                  <input
                    required
                    type="text"
                    placeholder="Enter asset name"
                    className="input input-bordered w-full"
                  />
                </label>
              )}
            </div>

            <div className="">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input
                    type="checkbox"
                    defaultChecked
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
            <button type="submit" className={`btn btn-primary rounded`}>
              {false ? "Adding..." : "Add Checklist"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChecklistForm;
