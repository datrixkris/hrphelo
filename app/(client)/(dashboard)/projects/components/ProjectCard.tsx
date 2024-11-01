import Link from "next/link";
import React from "react";
import { ProjectData } from "../types/project-types";

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const progressColor = (progress: number | undefined) => {
    if (progress !== undefined) {
      return progress <= 40
        ? "error"
        : progress > 40 && progress <= 70
          ? "warning"
          : "success";
    }
  };

  return (
    <div className="h-full space-y-5 rounded bg-base-100 p-5 text-sm font-medium text-neutral-500 shadow">
      {/* title and stats */}
      <div className="">
        <Link href={`/projects/${project?.id}/${project?.slug}/`}>
          <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors hover:text-hr-yellow">
            {project.name}
          </h2>
        </Link>
        <p className="text-xs">
          <span className="text-base-content">1</span> open task,{" "}
          <span className="text-base-content">9</span> tasks completed
        </p>
      </div>
      {/* descriptoin */}
      <div className="h-20">
        <p className="line-clamp-4">{project.description}</p>
      </div>
      {/* deadline */}
      <div className="">
        <p className="mb-1 font-semibold text-base-content">Deadline:</p>
        <p className="">{project.end_date}</p>
      </div>
      {/* Project lead */}
      <div className="">
        <p className="mb-1 font-semibold text-base-content">Project Lead:</p>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={project.projectLead?.image}
              alt={project.projectLead?.name}
            />
          </div>
        </div>
      </div>
      {/* team  */}
      <div className="">
        <p className="mb-1 font-semibold text-base-content">Team:</p>
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          {project.members?.map((member) => {
            return (
              <div className="avatar" key={member.id}>
                <div className="w-10">
                  <img src={member.staff.image} alt={member.staff.name} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* progress */}
      <div className="">
        <div className="mb-3 flex justify-between">
          <p className="font-semibold text-base-content">Progress:</p>
          <p
            className={`font-bold ${"text-" + progressColor(project.progress)}`}
          >
            {project.progress}%
          </p>
        </div>
        <progress
          className={`progress w-full ${"progress-" + progressColor(project.progress)}`}
          value={project.progress}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default ProjectCard;
