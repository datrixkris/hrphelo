import React from "react";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import dayjs from "dayjs";
import ProgressBar, { progressColor } from "../../ProgressBar";
import PriorityComponent from "../../PriorityComponent";

const ProjectMeta = () => {
  const { projectDetails: project } = useProjectDetailsContext()!;
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
        Project details
      </h2>

      <div className="">
        {/* Total hours  */}
        {/* <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Total hours:</div>
          <div className="">100 hours</div>
        </div> */}

        {/* date created */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Date created:</div>
          <div className="">
            {dayjs(project?.createdAt).format("MMM D, YYYY")}
          </div>
        </div>

        {/* deadline  */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Deadline:</div>
          <div className="">
            {project?.end_date
              ? dayjs(project?.end_date).format("MMM D, YYYY")
              : "Open"}
          </div>
        </div>

        {/* priority  */}
        <div className="flex items-center justify-between border-y p-2 py-3 odd:bg-base-200 even:bg-base-100">
          <div className="">Priority:</div>
          <div className="">
            {project?.priority ? (
              <PriorityComponent priority={project?.priority} />
            ) : (
              "Not set"
            )}
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
          <div className="">{project?.status}</div>
        </div>
      </div>

      {/* progress */}
      <div className="">
        <div className="mb-3 flex justify-between">
          <p className="font-semibold text-base-content">Progress:</p>
          <p className={`${"text-" + progressColor(project?.progress)}`}>
            {project?.progress}%
          </p>
        </div>
        <ProgressBar progress={project?.progress} />
      </div>
    </div>
  );
};

export default ProjectMeta;
