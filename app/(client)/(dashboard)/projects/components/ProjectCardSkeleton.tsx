import React from "react";

const ProjectCardSkeleton = () => {
  return (
    <div className="space-y-5 rounded bg-base-100 p-5 text-sm font-medium shadow">
      {/* title and stats */}
      <div className="">
        <div className="skeleton mb-2 h-4 w-64"></div>

        <p className="skeleton h-2 w-56"></p>
      </div>
      {/* descriptoin */}
      <div className="h-20 space-y-2">
        <div className="skeleton h-3"></div>
        <div className="skeleton h-3"></div>
        <div className="skeleton h-3"></div>
        <div className="skeleton h-3 w-64"></div>
      </div>
      {/* deadline */}
      <div className="space-y-2">
        <div className="skeleton h-3 w-36"></div>
        <div className="skeleton h-3 w-40"></div>
      </div>
      {/* Project lead */}
      <div className="">
        <div className="skeleton mb-2 h-3 w-32"></div>

        <div className="skeleton h-10 w-10 rounded-full"></div>
      </div>
      {/* team  */}
      <div className="">
        <div className="skeleton mb-2 h-3 w-32"></div>
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          <div className="avatar">
            <div className="skeleton h-10 w-10 rounded-full"></div>
          </div>
          <div className="avatar">
            <div className="skeleton h-10 w-10 rounded-full"></div>
          </div>
          <div className="avatar">
            <div className="skeleton h-10 w-10 rounded-full"></div>
          </div>
          <div className="avatar">
            <div className="skeleton h-10 w-10 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="">
        <div className="mb-3 flex justify-between">
          <div className="skeleton mb-2 h-3 w-24"></div>
          <div className="skeleton mb-2 h-3 w-8"></div>
        </div>
        <div className="skeleton mb-2 h-3"></div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;
