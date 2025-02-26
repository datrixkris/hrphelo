import { useEffect, useState } from "react";
import { useSocket } from "@/utils/socket";
import { TOnboarding } from "../types/onboarding-types";
import { Icon } from "@iconify/react/dist/iconify.js";

const StaffOnboardingProgress = () => {
  const { socket } = useSocket();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [checklistData, setChecklistData] = useState<TOnboarding[]>([]);

  // Group items by department
  const groupedByDepartment = checklistData.reduce(
    (acc, item) => {
      const deptId = item.department.id;
      if (!acc[deptId]) {
        acc[deptId] = {
          department: item.department,
          items: [],
        };
      }
      acc[deptId].items.push(item);
      return acc;
    },
    {} as Record<
      number,
      { department: TOnboarding["department"]; items: TOnboarding[] }
    >,
  );

  // Convert grouped object to array for rendering
  const departmentGroups = Object.values(groupedByDepartment);


  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => {
      console.log("Socket is fully connected, ID:", socket.id);
    };

    const handleChecklists = (data: TOnboarding[]) => {
      setChecklistData(data);
      console.log("New checklist message", data);
    };

    socket.on("connect", handleConnect);
    socket.on("mychecklists", handleChecklists);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("mychecklists", handleChecklists);
    };
  }, [socket]);

  return (
    <div className="">
      <div className="drawer drawer-end">
        <input id="my-drawer-6" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div
            className="tooltip tooltip-bottom"
            data-tip="Onboarding Progress"
          >
            <label htmlFor="my-drawer-6">
              <div
                className="radial-progress text-xs font-light text-primary"
                style={
                  { "--value": "70", "--size": "3rem" } as React.CSSProperties
                }
                role="progressbar"
              >
                70%
              </div>
            </label>
          </div>
        </div>
        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-6"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
            <div className="pt-3">
              <h5 className="mb-2 text-xl font-semibold">
                Staff Onboarding Progress
              </h5>
              <h6>
                You can see the details of your onboarding, actions to be done
                by various departments to complete your onboarding and make your
                work easier in the company.
              </h6>
            </div>
            <div className="mt-4 space-y-4">
              {departmentGroups.length > 0 ? (
                departmentGroups.map((group, index) => (
                  <div
                    key={group.department.id}
                    className="rounded-lg bg-base-100 shadow-md"
                  >
                    <button
                      className="flex w-full items-center justify-between p-4 text-left focus:outline-none"
                      onClick={() => toggleAccordion(index)}
                    >
                      <span className="font-semibold text-lg">
                        {group.department.name}
                      </span>
                      <svg
                        className={`h-5 w-5 transform transition-transform duration-200 ${
                          activeIndex === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div
                      className={`p-4 text-gray-600 ${
                        activeIndex === index ? "block" : "hidden"
                      }`}
                    >
                      {group.items.map((item) => (
                        <ChecklistItem {...item} key={item.id}/>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No onboarding tasks available.</p>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StaffOnboardingProgress;

export const ChecklistItem = (data: TOnboarding) => {
  return (
    <div className="flex items-center justify-between border-b border-base-300 py-2">
      {/* description */}
      <div className="space-y-1 opacity-50">
        {/* Name of checklist */}
        <p className="text-sm font-semibold capitalize text-hr-yellow">
          {data.name}
        </p>
        {/* description */}
        <p className="text-xs">{data.description}</p>
        {/* Assets */}
        {/* <p className="text-xs">
            <span className="font-semibold">Assets:</span> <span>Computer</span>
          </p> */}
      </div>

      {/* actions */}
      <div className="flex items-center gap-2">
        <Icon
          icon="hugeicons:checkmark-badge-03"
          className="h-4 w-4 rounded text-success"
        />
      </div>
    </div>
  );
};
