import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import ProjectFilterAndSearch from "./components/ProjectFilterAndSearch";
import CreateProject from "./components/CreateProject";
import ProjectList from "./components/ProjectList";

const ProjectsPage = () => {
  return (
    <div>
      {/* header plus breadcrumbs */}
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="projects"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Projects" },
          ]}
        />
        <div>
          <CreateProject />
        </div>
      </div>

      {/* project filters ui */}
      <div className="my-5">
        <ProjectFilterAndSearch />
      </div>

      {/* project list */}
      <ProjectList />
    </div>
  );
};

export default ProjectsPage;
