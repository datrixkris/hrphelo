import React from "react";

const priorityColor = (priority: "high" | "highest" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "warning";
    case "highest":
      return "error";
    case "medium":
      return "info";
    case "low":
      return "success";
  }
};

const PriorityComponent = ({
  priority,
}: {
  priority: "high" | "highest" | "medium" | "low";
}) => {
  return (
    <div
      className={`mt-1 w-fit rounded-lg px-2 py-0.5 ${"bg-" + priorityColor(priority) + "/20"}`}
    >
      <span className={`font-bold ${"text-" + priorityColor(priority)}`}>
        High
      </span>
    </div>
  );
};

export default PriorityComponent;
