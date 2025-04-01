import { useEffect, useState } from "react";
import { useSocket } from "@/utils/socket";
import { TOnboarding } from "../types/onboarding-types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAuthStore } from "../stores/auth-store";
import { api } from "../axiosApi/api";
import { cn } from "@/utils/cn";
import { useOnboardingStore } from "../(client)/(dashboard)/onboarding/onboarding-store";

const StaffOnboardingProgress = () => {
  const { socket } = useSocket();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [checklistData, setChecklistData] = useState<TOnboarding[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const calculateProgress = () => {
    if (checklistData.length === 0) return 0;

    console.log("checklistData", checklistData);

    // const completed = checklistData.filter(
    //   (item) =>
    //     Array.isArray(item.staffChecklists) && item.staffChecklists.length > 0,
    // ).length;
    const completed = checklistData.filter(
      (item) => !(item.staffChecklists === null),
    ).length;

    return Math.round((completed / checklistData.length) * 100);
  };

  const progress = calculateProgress();

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    if (!socket) return;

    const fetchUser = async () => {
      await useAuthStore.getState().fetchUserData();
      const user = useAuthStore.getState().user;
      return user;
    };

    const handleConnect = async () => {
      const user = await fetchUser();

      console.log("Socket is fully connected, ID:", socket.id);
      if (user) {
        console.log("Registering socket with ID:", user.id);
        socket.emit("registerSocket", user.id);
      }

      await api.get("/v1/mychecklists");
      setIsLoading(false);
    };

    const handleChecklists = (data: TOnboarding[]) => {
      setChecklistData(data);
      console.log("New checklist message", data);
    };

    socket.on("connect", handleConnect);

    // socket.on("connect", async () => {
    //   const user = await fetchUser();
    //   console.log("Socket is fully connected, ID:", socket.id);

    //   if (user) {
    //     console.log("Registering socket with ID:", user.id);
    //     socket.emit("registerSocket", user.id);

    //     setIsLoading(false);
    //   }
    // });

    socket.on("mychecklists", handleChecklists);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("mychecklists", handleChecklists);
    };
  }, [socket]);

  if (isLoading) {
    return null;
  }

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
              <div className="flex gap-2 rounded-3xl bg-transparent p-2">
                {" "}
                <div
                  className="radial-progress text-xs font-light text-black"
                  style={
                    {
                      "--value": progress,
                      "--size": "3rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  {progress}%
                </div>
                <div className="flex items-center text-xs font-semibold">
                  Onboarding <br /> progress
                </div>
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
          <ul className="menu min-h-full w-96 bg-base-200 p-4 text-base-content">
            <div className="pt-3">
              <h5 className="mb-2 text-xl font-semibold">
                Staff Onboarding Progress
              </h5>
              <h6 className="text-justify">
                View your onboarding details and tasks from various departments
                to streamline your start at the company.
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
                      aria-expanded={activeIndex === index}
                      aria-controls={`accordion-${index}`}
                    >
                      <span className="text-lg font-semibold">
                        {group.department.name} Department
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
                      className={`px-4 pb-4 text-gray-600 ${
                        activeIndex === index ? "block" : "hidden"
                      }`}
                    >
                      {group.items.map((item) => (
                        <ChecklistItem {...item} key={item.id} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center rounded-lg bg-base-100 shadow-md">
                  <p className="text-gray-500">
                    No onboarding tasks available.
                  </p>
                </div>
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
  const [isQueryFormOpen, setIsQueryFormOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { submitQuery } = useOnboardingStore();

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // // Safely access staffChecklists
    if (data.staffChecklists && data.staffChecklists.id) {
      submitQuery({ comment: query }, data.staffChecklists.id);
    }

    setQuery("");
    setIsQueryFormOpen(false);
  };

  return (
    <div className="border-b border-base-300 py-2">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "space-y-1",
            data.staffChecklists && "line-through opacity-50",
          )}
        >
          <p className="text-sm font-semibold capitalize text-hr-yellow">
            {data.name}
          </p>
          <p className="text-sm">{data.description}</p>
        </div>

        {data.staffChecklists ? (
          <div className="flex flex-col items-center gap-2">
            <Icon
              icon="hugeicons:checkmark-badge-03"
              className="h-4 w-4 rounded text-success"
            />
            {data.staffChecklists.checklistQueries === null && (
              <button
                onClick={() => setIsQueryFormOpen(!isQueryFormOpen)}
                className="btn btn-ghost btn-xs"
                aria-label={`Query about ${data.name}`}
              >
                <Icon icon="hugeicons:question" className="h-4 w-4" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="tooltip tooltip-bottom" data-tip="Pending">
              <Icon
                icon="hugeicons:clock-01"
                className="h-4 w-4 rounded text-red-500"
              />
            </div>
          </div>
        )}
      </div>
      {isQueryFormOpen && (
        <form
          onSubmit={handleQuerySubmit}
          className="mt-2 space-y-2 rounded-lg border bg-base-100 p-2 shadow"
        >
          <div>
            <label htmlFor={`query-${data.id}`} className="text-xs font-medium">
              Your Query
            </label>
            <textarea
              id={`query-${data.id}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your question or comment..."
              className="textarea textarea-bordered w-full text-sm"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsQueryFormOpen(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
