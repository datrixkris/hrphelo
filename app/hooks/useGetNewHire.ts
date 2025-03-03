import { useCallback, useEffect, useState } from "react";
import { StaffData } from "../(client)/(dashboard)/(employee)/staff/types";
import { useStaffStore } from "../(client)/(dashboard)/(employee)/staff/staff-store";

export function getNewHireProgress(staff: StaffData, deptId?: number) {
  let total;
  let completed;
  //   finds progress based on department
  if (deptId) {
    total = staff.company?.checklists.filter(
      (checklist) => checklist.departmentId === deptId,
    ).length;
    completed = staff.company?.checklists
      .filter((checklist) => checklist.departmentId === deptId)
      .map((item) => item.staffChecklists.some((i) => i.status)).length;
    return Math.round((completed / total) * 100) ?? 0;
  }

  //   overall progress with various departments involved
  else {
    total = staff?.company?.checklists?.length;
    completed = staff?.company?.checklists?.filter((item) =>
      item.staffChecklists.some((i) => i.status),
    ).length;
  }

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
