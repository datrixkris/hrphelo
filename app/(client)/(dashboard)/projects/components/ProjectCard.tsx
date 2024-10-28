import Link from "next/link";
import React from "react";

const ProjectCard = () => {
  return (
    <div className="space-y-5 rounded bg-base-100 p-5 text-sm font-medium text-neutral-500 shadow">
      {/* title and stats */}
      <div className="">
        <Link href={`/projects/project-slug/`}>
          <h2 className="mb-2 text-lg font-semibold capitalize text-base-content transition-colors hover:text-hr-yellow">
            Office Management
          </h2>
        </Link>
        <p className="text-xs">
          <span className="text-base-content">1</span> open task,{" "}
          <span className="text-base-content">9</span> tasks completed
        </p>
      </div>
      {/* descriptoin */}
      <div className="h-20">
        <p className="line-clamp-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>
      </div>
      {/* deadline */}
      <div className="">
        <p className="mb-1 font-semibold text-base-content">Deadline:</p>
        <p className="">25th April, 2024</p>
      </div>
      {/* Project lead */}
      <div className="">
        <p className="mb-1 font-semibold text-base-content">Project Lead:</p>
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      {/* team  */}
      <div className="">
        <p className="mb-1 font-semibold text-base-content">Team:</p>
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          <div className="avatar">
            <div className="w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar">
            <div className="w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="avatar placeholder">
            <div className="w-10 bg-neutral text-neutral-content">
              <span>+99</span>
            </div>
          </div>
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

export default ProjectCard;
