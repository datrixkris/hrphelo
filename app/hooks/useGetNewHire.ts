import { useCallback, useEffect, useState } from "react";
import { StaffData } from "../(client)/(dashboard)/(employee)/staff/types";
import { useStaffStore } from "../(client)/(dashboard)/(employee)/staff/staff-store";

export function getNewHireProgress(staff: StaffData) {
  const total = staff.company.checklists.length;
  const completed = staff.company.checklists.filter((item) =>
    item.staffChecklists.some((i) => i.status),
  ).length;
  return Math.round((completed / total) * 100) ?? 0;
}

const useGetNewHire = () => {
  const { loading, fetchStaff } = useStaffStore();
  const [newHires, setNewHires] = useState<StaffData[]>([]);

  const fetchData = useCallback(async () => {
    await fetchStaff();

    // getting new hires
    const newHires = useStaffStore
      .getState()
      .staffs.filter((staff) => staff.checklistStatus === "incomplete");
    setNewHires(newHires);
  }, [fetchStaff]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { newHires, loading, refresh: fetchData };
};

export default useGetNewHire;
