import React, { useEffect } from "react";
import { useStaffStore } from "../staff-store";
import StaffTable from "./StaffTable";

const StaffList = () => {
  const { staffs, loading, fetchStaff } = useStaffStore();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  return (
    <div>
      <div className="">
        {staffs.length < 1 && loading ? (
          <div className="rounded py-20 text-center">Getting staff data...</div>
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
