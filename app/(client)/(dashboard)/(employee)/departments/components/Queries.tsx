import React, { useState } from "react";
import { Checklist, ChecklistQueries } from "../../../onboarding/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDepartmentStore } from "../department-store";
import dayjs from "dayjs";

const Queries = ({
  queries,
  refresh,
  checklists,
}: {
  queries: ChecklistQueries[];
  refresh: () => Promise<void>;
  checklists: Checklist[];
}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Comment</th>
              <th>Checklist</th>
              <th>Staff</th>
              <th>Department</th>
              <th>Created at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {queries.map((query) => {
              return (
                <QueryTableRow
                  key={query.id}
                  query={query}
                  refresh={refresh}
                  checklists={checklists}
                />
              );
            })}
          </tbody>
        </table>
        {queries.length === 0 && (
          <div className="mt-4 text-center text-gray-400">No new hires</div>
        )}
      </div>
    </div>
  );
};

export default Queries;

const QueryTableRow = ({
  query,
  refresh,
  checklists,
}: {
  query: ChecklistQueries;
  refresh: () => Promise<void>;
  checklists: Checklist[];
}) => {
  const [loading, setLoading] = useState(false);
  const closeQuery = useDepartmentStore((state) => state.closeQuery);
  const department = useDepartmentStore((state) => state.department);

  async function close() {
    setLoading(true);
    if (department?.id && query.isClosed === "no") {
      await closeQuery(department.id, query.id, { isClosed: "yes" });
      await refresh();
      setLoading(false);
    }
  }
  return (
    <tr>
      <th>{query.comment}</th>
      <td>
        {
          checklists.find(
            (checklist) => checklist.id === query.staffChecklist.checklistId,
          )?.name
        }
      </td>
      <td>{query.staffChecklist.staff.name}</td>
      <td>{query.staffChecklist.staff.department?.name}</td>
      <td>{dayjs(query.createdAt).format("MMM D, YYYY - h:mm A")}</td>
      <td>
        <div
          className={`inline-block cursor-pointer text-nowrap rounded bg-error px-2 py-1 text-sm font-semibold text-white ${query.isClosed === "yes" ? "bg-success" : "bg-error"} `}
          onClick={() => close()}
        >
          {loading ? (
            <Icon
              icon="line-md:loading-twotone-loop"
              className="inline-block text-lg"
            />
          ) : (
            <Icon icon="heroicons:x-mark" className="inline-block text-lg" />
          )}
          <span className="relative ml-0.5 text-xs">
            {query.isClosed === "yes" ? "Closed" : "Close"}
          </span>
        </div>
      </td>
    </tr>
  );
};
