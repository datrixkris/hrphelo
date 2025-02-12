import React from "react";
import { GetDepartment } from "../types";
import StaffTable from "../../staff/components/StaffTable";

interface DepartmentStaffListProps {
  department: GetDepartment;
}

const DepartmentStaffList = ({ department }: DepartmentStaffListProps) => {
  return (
    <div>
      <div className="p-4">
        <p className="text-sm text-base-content">
          Staff in the {department.name} Department
        </p>
      </div>
      {/* Staff list */}
      <StaffTable
        hideColumn={["Hiring Date"]}
        staff={department.staff.map((item) => item)}
      />
    </div>
  );
};

export default DepartmentStaffList;
