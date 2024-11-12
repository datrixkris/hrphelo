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
      <div className="flex flex-col-reverse gap-5 md:flex-row">
        {/* main details */}
        <div className="w-full space-y-5 md:w-[60%] xl:w-[70%]">
          {/* Project description */}
          <ProjectDescription />

          {/* file uploads images */}
          <ProjectImagesUploaded />

          {/* uploaded files */}
          <ProjectFilesUploaded />
        </div>

        {/* side */}
        <div className="w-full space-y-5 md:w-[40%] xl:w-[30%]">
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
