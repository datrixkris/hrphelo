import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const ProjectFilterAndSearch = () => {
  return (
    <div className="flex flex-wrap gap-2 sm:flex-nowrap">
      {/* Search */}
      <label className="input input-bordered flex basis-full items-center gap-2 sm:basis-[400px]">
        <Icon icon="hugeicons:search-01" className="shrink-0" />
        <input
          type="text"
          className="w-full grow placeholder:text-xs md:w-[300px]"
          placeholder="Search by: project name, team member"
        />
      </label>

      {/* filter by designation */}
      <div className="flex w-full gap-2">
        <select className="select select-bordered w-1/2 md:max-w-[200px]">
          <option selected>Select designation</option>
          <option>Web Developer</option>
          <option>Infrastructure Developer</option>
        </select>

        {/* filter by role */}
        {/* <select className="select select-bordered w-1/2 md:max-w-[200px]">
          <option selected>All Roles</option>
          <option>Head of Department</option>
          <option>Web Developer</option>
        </select> */}
      </div>
    </div>
  );
};

export default ProjectFilterAndSearch;
