"use client";

import React from "react";
import Checklist from "./Checklist";

const DepartmentalChecklists = () => {
  return (
    <div className="rounded bg-base-100 p-4">
      <div className="mb-5">
        <h2 className="text-xl font-semibold">Departmental Checklists</h2>
        <p className="mt-1 text-sm">
          View and manage checklist items required from various departments
          here.
        </p>
      </div>

      {/* body */}
      <div className="divide-y">
        {/* accordion */}
        <div className="collapse collapse-arrow rounded-none">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
              IT Department
            </span>{" "}
            <span className="pl-1 text-sm text-hr-yellow">3 Checklists</span>
          </div>
          <div className="collapse-content rounded-md bg-base-200/50 pl-10 pt-4">
            <Checklist />
            <Checklist />
            <Checklist />
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
              Operations Department
            </span>{" "}
            <span className="pl-1 text-sm text-hr-yellow">3 Checklists</span>
          </div>
          <div className="collapse-content rounded-md bg-base-200 pl-10 pt-4">
            <Checklist />
            <Checklist />
            <Checklist />
          </div>
        </div>
        <div className="collapse collapse-arrow rounded-none">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            <span className="rounded bg-base-200 p-1 px-2 text-sm font-bold uppercase">
              Logistics Department
            </span>{" "}
            <span className="pl-1 text-sm text-hr-yellow">3 Checklists</span>
          </div>
          <div className="collapse-content rounded-md bg-base-200 pl-10 pt-4">
            <Checklist />
            <Checklist />
            <Checklist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentalChecklists;
