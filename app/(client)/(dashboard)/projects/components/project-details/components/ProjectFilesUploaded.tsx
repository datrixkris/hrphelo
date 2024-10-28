import React from "react";
import ProjectFileComponent from "./ProjectFileComponent";

const ProjectFilesUploaded = () => {
  return (
    <div className="space-y-5 rounded-lg bg-base-100 p-5 py-8 text-sm font-medium shadow">
      <h2 className="mb-2 text-lg font-semibold capitalize text-base-content">
        Uploaded Files
      </h2>

      {/* files */}
      <div className="">
        {/* file uploaded */}
        <ProjectFileComponent />
        <ProjectFileComponent />
        <ProjectFileComponent />
      </div>
    </div>
  );
};

export default ProjectFilesUploaded;
