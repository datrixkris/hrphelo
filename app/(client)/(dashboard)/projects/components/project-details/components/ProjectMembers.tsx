import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useContext } from "react";
import { ProjectDetailsContext } from "../ProjectDetailsContext";

const ProjectMembers = () => {
  const project = useContext(ProjectDetailsContext);
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      <div className="flex justify-between">
        <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
          Team members
        </h2>
        <button className="btn btn-xs">
          <Icon icon="heroicons:plus" /> Add
        </button>
      </div>

      {/* members */}
      <div className="space-y-2">
        {/* member */}
        {project?.members?.map((member) => {
          return (
            <div key={member.id}>
              <div className="flex items-center gap-2">
                {/* image */}
                <div className="avatar shrink-0">
                  <div className="w-12 rounded-full">
                    <img src={member.staff.image} alt={member.staff.name} />
                  </div>
                </div>

                {/* details */}
                <div className="">
                  <p className="font-semibold">{member.staff.name}</p>
                  <p className="text-xs">Web developer</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectMembers;
