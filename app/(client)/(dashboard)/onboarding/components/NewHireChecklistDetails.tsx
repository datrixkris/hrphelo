import React from "react";

const NewHireChecklistDetails = () => {
  return (
    <div className="rounded bg-base-100 p-5">
      <div className="divide-y">
        {/* accordion */}
        <div className="collapse collapse-arrow rounded-none">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
              IT Department
            </span>{" "}
            <span className="pl-1 text-sm text-hr-yellow">50% completed</span>
          </div>
          <div className="collapse-content rounded-md bg-base-200/50 pl-10 pt-4">
            <ChecklistItem />
            <ChecklistItem />
            <ChecklistItem />
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
              Operations Department
            </span>{" "}
            <span className="pl-1 text-sm text-hr-yellow">50% completed</span>
          </div>
          <div className="collapse-content rounded-md bg-base-200 pl-10 pt-4">
            <ChecklistItem />
            <ChecklistItem />
            <ChecklistItem />
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
              Logistics Department
            </span>{" "}
            <span className="pl-1 text-sm text-hr-yellow">50% completed</span>
          </div>
          <div className="collapse-content rounded-md bg-base-200 pl-10 pt-4">
            <ChecklistItem />
            <ChecklistItem />
            <ChecklistItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewHireChecklistDetails;

export const ChecklistItem = () => {
  return (
    <div>
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
          <span className="rounded bg-success/20 p-1 px-2 text-sm text-success">
            Completed
          </span>
        </div>
      </div>
    </div>
  );
};
