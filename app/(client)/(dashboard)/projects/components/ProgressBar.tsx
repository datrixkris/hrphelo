import React from "react";

export const progressColor = (progress: number | undefined) => {
  if (progress !== undefined) {
    return progress <= 40
      ? "error"
      : progress > 40 && progress <= 70
        ? "warning"
        : "success";
  }
};

const ProgressBar = ({ progress }: { progress: number | undefined }) => {
  return (
    <progress
      className={`progress w-full ${"progress-" + progressColor(progress)}`}
      value={progress}
      max="100"
    ></progress>
  );
};

export default ProgressBar;
