import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Checklist } from "../../../onboarding/types";
import { useOnboardingStore } from "../../../onboarding/onboarding-store";

export type ChecklistStatus = "does_not_apply" | "apply" | "returned" | "";
interface AssetFormInput {
  name: string;
  details: string;
}

const NewHireFormList = ({
  checklist,
  staffId,
  refresh,
}: {
  checklist: Checklist;
  staffId: number;
  refresh?: () => void;
}) => {
  const [checked, setChecked] = useState<ChecklistStatus>("");
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState<AssetFormInput[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { markChecklist, updatingData } = useOnboardingStore();

  //   set status of checklist whether complete or does not apply
  useEffect(() => {
    if (checklist?.staffChecklists?.status === "does_not_apply") {
      setChecked("does_not_apply");
    } else if (checklist?.staffChecklists?.status === "apply") {
      setChecked("apply");
    }
    console.log(checked);
  }, []);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    checkStatus: ChecklistStatus,
  ) => {
    if (event.target.checked) {
      if (checkStatus === "apply") {
        // if check status is apply, check if assettype is physical and no assets have been added to prompt user to add asset
        if (checklist.assetType === "physical" && assets.length === 0) {
          setShowForm(true);
          setErrorMessage("Please add an asset");
          return;
        }
        await markChecklist({
          status: checkStatus,
          checklistId: checklist.id,
          staffId,
          asset: assets.length > 0 ? { ...assets[0] } : null,
        });
        if (!useOnboardingStore.getState().error) {
          setChecked(checkStatus);
          if (refresh) refresh();
        }
        console.log("marking checklist", event.target.checked);
      } else {
        // if (checkStatus) {
        await markChecklist({
          status: checkStatus,
          checklistId: checklist.id,
          staffId,
        });
        if (!useOnboardingStore.getState().error) {
          setChecked(checkStatus);
          if (refresh) refresh();
        }
        // }
      }
    }
    // uncheck
    // else {
    //   setChecked("");
    //   await markChecklist({
    //     status: null,
    //     checklistId: checklist.id,
    //     staffId,
    //   });
    // }
  };

  function getFormInput(data: AssetFormInput) {
    console.log(data);
    setAssets([...assets, data]);
    setErrorMessage("");
    setShowForm(false);
  }

  return (
    <div
      className={`flex items-center justify-between gap-4 p-2 ${updatingData ? "!pointer-events-none !cursor-not-allowed opacity-50" : ""}`}
    >
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
                  {asset.name} - {asset.details}
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
                    {assets.length === 0 && (
                      <button
                        onClick={() => setShowForm(true)}
                        className="btn btn-xs flex items-center justify-center gap-1 text-xs"
                      >
                        <Icon icon="heroicons:plus" className="" />{" "}
                        <span>Add asset</span>
                      </button>
                    )}
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
        {/* updatingData */}
        {updatingData && (
          <div className="self-center">
            <Icon icon="line-md:loading-twotone-loop"></Icon>
          </div>
        )}
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
  const [details, setDetails] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ name, details });
    getFormInput({ name, details });
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
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      <div className="!-mt-0.5">
        <button className="btn btn-neutral btn-xs px-6">Add</button>
      </div>
    </form>
  );
};
