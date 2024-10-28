import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ProjectMembers = () => {
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
        <div className="flex items-center gap-2">
          {/* image */}
          <div className="avatar shrink-0">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          {/* details */}
          <div className="">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs">Web developer</p>
          </div>
        </div>
        {/* member */}
        <div className="flex items-center gap-2">
          {/* image */}
          <div className="avatar shrink-0">
            <div className="w-12 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          {/* details */}
          <div className="">
            <p className="font-semibold">John Doe</p>
            <p className="text-xs">Web developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectMembers;
