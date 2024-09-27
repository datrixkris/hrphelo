import React from "react";
import { Icon } from "@iconify/react";

const FilterAndSearch = () => {
  return (
    <div className="flex gap-2">
      {/* Search */}
      <label className="input input-bordered flex max-w-xs items-center gap-2">
        <Icon icon="hugeicons:search-01" className="shrink-0" />
        <input
          type="text"
          className="w-[500px] grow"
          placeholder="Search by: name, email, id"
        />
      </label>

      {/* filter by department */}
      <select className="select select-bordered w-full max-w-[200px]">
        <option selected>All departments</option>
        <option>IT department</option>
        <option>HR department</option>
      </select>

      {/* filter by role */}
      <select className="select select-bordered w-full max-w-[200px]">
        <option selected>All Roles</option>
        <option>Head of Department</option>
        <option>Web Developer</option>
      </select>
    </div>
  );
};

export default FilterAndSearch;
