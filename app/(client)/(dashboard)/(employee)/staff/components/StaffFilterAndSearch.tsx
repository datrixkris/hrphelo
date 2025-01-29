import React from "react";
import { Icon } from "@iconify/react";
import useDebounce from "@/app/hooks/debounce";
import { Department } from "../../departments/types";
import { Designation } from "../../designations/types";

interface SearchAndFilterProps {
  getSearchTerm: (searchTerm: string) => void;
  getDepartmentId: (id: number) => void;
  getDesignationId: (id: number) => void;
  allDepartments: Department[];
  allDesignations: Designation[];
}

const StaffFilterAndSearch = ({
  getSearchTerm,
  getDepartmentId,
  getDesignationId,
  allDepartments,
  allDesignations,
}: SearchAndFilterProps) => {
  const [searchText, setSearchText] = React.useState("");

  const debouncedSearch = useDebounce((value: string) => {
    console.log("Fetching results for:", value);
    getSearchTerm(value);
  }, 600);

  function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    debouncedSearch(event.target.value);
  }

  function handleDepartment(event: React.ChangeEvent<HTMLSelectElement>) {
    getDepartmentId(parseInt(event.target.value));
  }

  function handleDesignation(event: React.ChangeEvent<HTMLSelectElement>) {
    getDesignationId(parseInt(event.target.value));
  }

  function clearSearch() {
    setSearchText("");
    getSearchTerm("");
  }

  return (
    <div className="flex flex-wrap gap-2 sm:flex-nowrap">
      {/* Search */}
      <label className="input input-bordered flex basis-full items-center gap-2 sm:basis-[400px]">
        <Icon icon="hugeicons:search-01" className="shrink-0" />
        <input
          type="text"
          className="w-full grow md:w-[300px]"
          placeholder="Search by: name and email"
          value={searchText}
          onChange={handleSearchText}
        />
        <Icon
          icon="heroicons:x-mark"
          className="shrink-0 cursor-pointer text-xl"
          onClick={clearSearch}
        />
      </label>

      {/* filter by department */}
      <div className="flex w-full gap-2">
        <select
          className="select select-bordered w-1/2 md:max-w-[200px]"
          onChange={handleDepartment}
        >
          <option value="">All departments</option>
          {allDepartments.map((department) => {
            return (
              <option value={department.id} key={department.id}>
                {department.name}
              </option>
            );
          })}
        </select>

        {/* filter by designation */}
        <select
          className="select select-bordered w-1/2 md:max-w-[200px]"
          onChange={handleDesignation}
        >
          <option value="">All Designations</option>
          {allDesignations.map((designation) => {
            return (
              <option value={designation.id} key={designation.id}>
                {designation.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default StaffFilterAndSearch;
