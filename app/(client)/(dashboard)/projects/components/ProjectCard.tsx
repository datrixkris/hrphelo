import Link from "next/link";
import React from "react";
import { ProjectData } from "../types/project-types";
import ProgressBar, { progressColor } from "./ProgressBar";

const ProjectCard = ({ project }: { project: ProjectData }) => {
  return (
    <Link href={`/projects/${project?.id}/${project?.slug}/`}>
      <div className="flex h-full flex-col justify-between gap-3 rounded bg-base-100 p-5 text-sm font-medium text-neutral-500 shadow transition-transform hover:scale-[103%]">
        <div className="space-y-3">
          {/* title and stats */}
          <div className="">
            <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors">
              {project.name}
            </h2>

            <p className="text-xs">
              <span className="text-base-content">1</span> open task,{" "}
              <span className="text-base-content">9</span> tasks completed
            </p>
          </div>
          {/* descriptoin */}
          <div className="h-16">
            <p className="line-clamp-3">{project.description}</p>
          </div>
          {/* deadline */}
          <div className="">
            <p className="mb-1 font-semibold text-base-content">Deadline:</p>
            <p className="">{project.end_date}</p>
          </div>
          {/* Project lead */}
          <div className="">
            <p className="mb-1 font-semibold text-base-content">
              Project Lead:
            </p>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img
                  src={project.projectLead?.image || "/images/avatar.png"}
                  alt={project.projectLead?.name}
                />
              </div>
            </div>
            <p className="text-xs">{project.projectLead?.name}</p>
          </div>
          {/* team  */}
          <div className="">
            <p className="mb-1 font-semibold text-base-content">Team:</p>
            <div className="avatar-group -space-x-6 rtl:space-x-reverse">
              {project.members?.map((member) => {
                return (
                  <div className="avatar" key={member.id}>
                    <div className="w-10">
                      <img
                        src={member.staff?.image || "/images/avatar.png"}
                        alt={member.staff?.name}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
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
          <ProgressBar progress={project.progress} />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
