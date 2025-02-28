// import Button from "@/app/components/Button";
// import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import Checklists from "./Checklists";
import NewHires from "./NewHires";
import { useDepartmentStore } from "../department-store";
import { Checklist } from "../../../onboarding/types";
import { useOnboardingStore } from "../../../onboarding/onboarding-store";
import { useStaffStore } from "../../staff/staff-store";
import useGetNewHire from "@/app/hooks/useGetNewHire";

const DepartmentChecklist = () => {
  const [activeTab, setActiveTab] = useState<"checklists" | "new hires">(
    "checklists",
  );
  const [loading, setLoading] = useState(false);
  const { department } = useDepartmentStore();
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const { fetchChecklistByDepartment } = useOnboardingStore();
  const { newHires } = useGetNewHire();

  // fetch all checklists
  useEffect(() => {
    const fetchChecklists = async () => {
      if (department?.id) {
        setLoading(true);
        const list = await fetchChecklistByDepartment(department.id);
        setLoading(false);
        setChecklists(list);
      }
    };

    fetchChecklists();
    console.log("fetching checklists", newHires);
  }, [newHires]);

  async function refresh(deptId: number) {
    const list = await fetchChecklistByDepartment(deptId, false);
    setChecklists(list);
  }

  return (
    <div className="space-y-5 p-4">
      {/* description */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm">
          Manage all necessary checklists for new hires here
        </p>
      </div>

      {/* buttons for check lists and new hires */}
      <div className="space-x-2 border-b pb-4">
        <button
          className={`btn ${activeTab === "checklists" ? "btn-neutral" : ""}`}
          onClick={() => setActiveTab("checklists")}
        >
          Checklists
          <div className="badge badge-info">{checklists.length}</div>
        </button>
        <button
          className={`btn ${activeTab === "new hires" ? "btn-neutral" : ""}`}
          onClick={() => setActiveTab("new hires")}
        >
          New Hires&apos; Progress
          <div className="badge badge-info">{newHires.length}</div>
        </button>
      </div>

      <div className="">
        {activeTab === "checklists" && (
          <>
            {loading ? (
              <div>
                <div className="flex w-52 flex-col gap-4">
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              </div>
            ) : (
              <Checklists checklists={checklists} refresh={refresh} />
            )}
          </>
        )}
        {activeTab === "new hires" && <NewHires newHires={newHires} />}
      </div>
    </div>
  );
};

export default DepartmentChecklist;
