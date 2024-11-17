import React from "react";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import EditProjectButton from "./EditProjectButton";

const ProjectDescription = () => {
  const { projectDetails: project } = useProjectDetailsContext()!;
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      {/* title and stats */}
      <div className="">
        <div className="flex justify-between">
          <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
            {project?.name}
          </h2>

          <EditProjectButton />
        </div>

        <p className="text-xs">
          <span className="text-base-content">1</span> open task,{" "}
          <span className="text-base-content">9</span> tasks completed
        </p>
      </div>
      {/* descriptoin */}
      <div className="">
        <p className="">{project?.description}</p>
      </div>
    </div>
  );
};

export default ProjectDescription;
