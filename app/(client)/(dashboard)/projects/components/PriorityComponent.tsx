import React from "react";

// Priority to Tailwind color mappings
const priorityClasses = {
  high: {
    bg: "bg-error/10",
    text: "text-error",
  },
  highest: {
    bg: "bg-red-700/10",
    text: "text-red-700",
  },
  medium: {
    bg: "bg-warning/10",
    text: "text-warning",
  },
  low: {
    bg: "bg-info/10",
    text: "text-info",
  },
};

// PriorityComponent definition
const PriorityComponent = ({
  priority,
}: {
  priority: "high" | "highest" | "medium" | "low";
}) => {
  // Resolve Tailwind classes for the given priority
  const { bg, text } = priorityClasses[priority] || {};

  return (
    <div className={`mt-1 w-fit rounded-lg px-2 py-0.5 ${bg}`}>
      <span className={`text-xs font-semibold ${text}`}>{priority}</span>
    </div>
  );
};

export default PriorityComponent;
