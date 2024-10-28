import React from "react";
import ProjectDescription from "./components/ProjectDescription";
import ProjectImagesUploaded from "./components/ProjectImagesUploaded";
import ProjectFilesUploaded from "./components/ProjectFilesUploaded";
import ProjectMeta from "./components/ProjectMeta";
import ProjectMembers from "./components/ProjectMembers";
import ProjectLead from "./components/ProjectLead";

const ProjectDetails = () => {
  return (
    <div>
      <div className="flex gap-5">
        {/* main details */}
        <div className="w-[70%] space-y-5">
          {/* Project description */}
          <ProjectDescription />

          {/* file uploads images */}
          <ProjectImagesUploaded />

          {/* uploaded files */}
          <ProjectFilesUploaded />
        </div>

        {/* side */}
        <div className="w-[30%] space-y-5">
          {/* project details */}
          <ProjectMeta />

          {/* Project Lead */}
          <ProjectLead />

          {/* Project members */}
          <ProjectMembers />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
