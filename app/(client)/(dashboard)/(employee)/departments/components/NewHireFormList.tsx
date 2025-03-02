import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Checklist } from "../../../onboarding/types";
import { useOnboardingStore } from "../../../onboarding/onboarding-store";

type ChecklistStatus = "does_not_apply" | "apply" | "";
interface AssetFormInput {
  name: string;
  description: string;
}

const NewHireFormList = ({
  checklist,
  staffId,
}: {
  checklist: Checklist;
  staffId: number;
}) => {
  const [checked, setChecked] = useState<ChecklistStatus>("");
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState<AssetFormInput[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { markChecklist } = useOnboardingStore();

  //   set status of checklist whether complete or does not apply
  useEffect(() => {
    if (checklist?.staffChecklists[0]?.status === "does_not_apply") {
      setChecked("does_not_apply");
    } else if (checklist?.staffChecklists[0]?.status === "apply") {
      setChecked("apply");
    }
    console.log(checked);
  }, []);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkStatus: ChecklistStatus,
  ) => {
    if (event.target.checked) {
      if (checkStatus === "apply") {
        if (checklist.assetType === "physical" && assets.length === 0) {
          setShowForm(true);
          setErrorMessage("Please add an asset");
          return;
        }
        setChecked(checkStatus);
        markChecklist({
          status: checkStatus,
          checklistId: checklist.id,
          staffId,
        });
        console.log("marking checklist", event.target.checked);
      } else {
        setChecked(checkStatus);
        // if (checkStatus) {
        markChecklist({
          status: checkStatus,
          checklistId: checklist.id,
          staffId,
        });
        // }
      }
    } else {
      setChecked("");
      markChecklist({
        status: null,
        checklistId: checklist.id,
        staffId,
      });
    }
  };

  function getFormInput(data: AssetFormInput) {
    console.log(data);
    setAssets([...assets, data]);
    setErrorMessage("");
    setShowForm(false);
  }

  return (
    <div className="flex items-center justify-between gap-4 p-2">
      {/* description */}
      <div className="">
        <div
          className={`space-y-1 ${checked === "apply" ? "line-through opacity-50" : ""}`}
        >
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">
            {checklist.name}
          </p>
          {/* description */}
          <p className="text-sm">{checklist.description}</p>
          {/* Assets */}
          <div className="space-y-1">
            {assets.length > 0 && (
              <p className="text-sm font-semibold">Assets</p>
            )}
            {assets.map((asset, index) => (
              <div key={index} className="flex items-center gap-2">
                <Icon icon="heroicons:check-circle" className="text-success" />
                <p className="text-xs">
                  {asset.name} - {asset.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* add asset */}
        {checklist.assetType === "physical" && (
          <div className="">
            {!showForm ? (
              <>
                {checked === "" && (
                  <div className="my-2">
                    <button
                      onClick={() => setShowForm(true)}
                      className="btn btn-xs flex items-center justify-center gap-1 text-xs"
                    >
                      <Icon icon="heroicons:plus" className="" />{" "}
                      <span>Add asset</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="my-2">
                <AssetForm
                  getFormInput={getFormInput}
                  errorMessage={errorMessage}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* actions */}
      <div className="flex shrink-0 gap-2">
        {/* does not apply */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={checked === "does_not_apply"}
              name="1"
              onChange={(event) =>
                handleCheckboxChange(event, "does_not_apply")
              }
              className="checkbox-warning checkbox"
            />
            <span className="label-text pl-1">Does not apply</span>
          </label>
        </div>

        {/* apply */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={checked === "apply"}
              name="1"
              onChange={(event) => handleCheckboxChange(event, "apply")}
              className="checkbox-success checkbox"
            />
            <span className="label-text pl-1">Complete</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewHireFormList;

const AssetForm = ({
  getFormInput,
  errorMessage,
}: {
  getFormInput: (data: AssetFormInput) => void;
  errorMessage: string;
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, description });
    getFormInput({ name, description });
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
      <input
        type="text"
        placeholder="Enter asset"
        className="input input-xs input-bordered w-full max-w-xs"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Enter description/specification"
        className="textarea textarea-bordered textarea-xs w-full max-w-xs"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <div className="!-mt-0.5">
        <button className="btn btn-neutral btn-xs px-6">Add</button>
      </div>
    </form>
  );
};
