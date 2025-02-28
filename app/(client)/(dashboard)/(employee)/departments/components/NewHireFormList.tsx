import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

type ChecklistStatus = "not-apply" | "completed" | "";
interface AssetFormInput {
  name: string;
  description: string;
}

const NewHireFormList = () => {
  const [checked, setChecked] = useState<ChecklistStatus>("");
  const [showForm, setShowForm] = useState(false);
  const [assets, setAssets] = useState<AssetFormInput[]>([]);

  // useEffect(() => {}, [checked]);
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checkStatus: ChecklistStatus,
  ) => {
    if (event.target.checked) {
      setChecked(checkStatus);
    } else {
      setChecked("");
    }
  };

  function getFormInput(data: AssetFormInput) {
    console.log(data);
    setAssets([...assets, data]);
    setShowForm(false);
  }

  return (
    <div className="flex items-center justify-between gap-4 p-2">
      {/* description */}
      <div className="">
        <div
          className={`space-y-1 ${checked === "completed" ? "line-through opacity-50" : ""}`}
        >
          {/* Name of checklist */}
          <p className="text-sm font-bold uppercase text-hr-yellow">Devices</p>
          {/* description */}
          <p className="text-sm">Give out the following devices</p>
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
            <AssetForm getFormInput={getFormInput} />
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
              checked={checked === "not-apply"}
              name="1"
              onChange={(event) => handleCheckboxChange(event, "not-apply")}
              className="checkbox-warning checkbox"
            />
            <span className="label-text pl-1">Does not apply</span>
          </label>
        </div>

        {/* completed */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={checked === "completed"}
              name="1"
              onChange={(event) => handleCheckboxChange(event, "completed")}
              className="checkbox-success checkbox"
            />
            <span className="label-text pl-1">Completed</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewHireFormList;

const AssetForm = ({
  getFormInput,
}: {
  getFormInput: (data: AssetFormInput) => void;
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
