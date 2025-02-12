// import Button from "@/app/components/Button";
// import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import Checklists from "./Checklists";
import NewHires from "./NewHires";

const DepartmentChecklist = () => {
  const [activeTab, setActiveTab] = useState<"checklists" | "new hires">(
    "checklists",
  );
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
          <div className="badge badge-info">3</div>
        </button>
        <button
          className={`btn ${activeTab === "new hires" ? "btn-neutral" : ""}`}
          onClick={() => setActiveTab("new hires")}
        >
          New Hires&apos; Progress
          <div className="badge badge-info">2</div>
        </button>
      </div>

      <div className="">
        {activeTab === "checklists" && <Checklists />}
        {activeTab === "new hires" && <NewHires />}
      </div>
    </div>
  );
};

export default DepartmentChecklist;
