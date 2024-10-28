import React from "react";

const ProjectMeta = () => {
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
        Project details
      </h2>

      <div className="">
        {/* Total hours  */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Total hours:</div>
          <div className="">100 hours</div>
        </div>

        {/* date created */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Date created:</div>
          <div className="">21st March, 2024</div>
        </div>

        {/* deadline  */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Deadline:</div>
          <div className="">2nd May, 2024</div>
        </div>

        {/* priority  */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Priority:</div>
          <div className="">
            <span className="rounded-md bg-error px-2 py-1 text-xs">high</span>
          </div>
        </div>

        {/* created by */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Created By:</div>
          <div className="">John Doe</div>
        </div>

        {/* status */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Status:</div>
          <div className="">On going</div>
        </div>
      </div>

      {/* progress */}
      <div className="">
        <div className="mb-3 flex justify-between">
          <p className="font-semibold text-base-content">Progress:</p>
          <p className="text-success">40%</p>
        </div>
        <progress
          className="progress progress-success w-full"
          value="40"
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default ProjectMeta;
