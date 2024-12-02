// import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useProjectDetailsContext } from "../ProjectDetailsContext";
import EditLeadButton from "./EditLeadButton";

const ProjectLead = () => {
  const { projectDetails: project } = useProjectDetailsContext()!;

  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      <div className="flex justify-between">
        <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
          Team lead
        </h2>
        <EditLeadButton />
      </div>

      {/* members */}
      <div className="space-y-2">
        {/* member */}
        <div className="flex items-center gap-2">
          {/* image */}
          <div className="avatar shrink-0">
            <div className="w-12 rounded-full">
              <img
                src={project?.project_lead?.image}
                alt={project?.project_lead?.name}
              />
            </div>
          </div>

          {/* details */}
          <div className="">
            <p className="font-semibold">{project?.project_lead?.name}</p>
            <p className="text-xs">Team Leader</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectLead;
