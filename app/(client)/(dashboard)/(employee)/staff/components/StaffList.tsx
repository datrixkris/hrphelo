import React, { useEffect, useState } from "react";
import { useStaffStore } from "../staff-store";
import StaffTable from "./StaffTable";
import TableSkeleton from "@/app/components/TableSkeleton";
import FilterAndSearch from "./StaffFilterAndSearch";
import { SearchCriteria } from "../staff-store";
import { useDepartmentStore } from "../../departments/department-store";
import { useDesignationStore } from "../../designations/designations-store";

const StaffList = () => {
  const { staffs, loading, fetchStaff, searchStaff } = useStaffStore();
  const { departments, fetchDepartments } = useDepartmentStore();
  const { designations, fetchDesignations } = useDesignationStore();
  const [criteria, setCriteria] = useState<SearchCriteria>({
    name: "",
    email: "",
    designationId: null,
    departmentId: null,
  });

  useEffect(() => {
    fetchStaff();
    fetchDepartments();
    fetchDesignations();
  }, [fetchStaff, fetchDepartments, fetchDesignations]);

  const getSearchTerm = (term: string) => {
    setCriteria({ ...criteria, name: term });
  };

  const getDepartmentId = (id: number) => {
    setCriteria({ ...criteria, departmentId: id });
  };

  const getDesignationId = (id: number) => {
    setCriteria({ ...criteria, designationId: id });
  };

  // search for staff if criteria changes
  useEffect(() => {
    searchStaff(criteria);
  }, [criteria, searchStaff]);

  return (
    <div>
      {/* search and filter */}
      <div className="my-5">
        <FilterAndSearch
          getSearchTerm={getSearchTerm}
          getDepartmentId={getDepartmentId}
          getDesignationId={getDesignationId}
          allDepartments={departments}
          allDesignations={designations}
        />
      </div>

      <div className="">
        {staffs.length < 1 && loading ? (
          <div className="rounded text-center">
            <TableSkeleton />
          </div>
        ) : staffs.length > 0 ? (
          <StaffTable staff={staffs} />
        ) : (
          <div className="rounded py-20 text-center">No data available</div>
        )}
      </div>
    </div>
  );
};

export default StaffList;
