import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import Button from "@/app/components/Button";
// import FilterAndSearch from "../staff/components/StaffFilterAndSearch";
import ProjectCard from "./components/ProjectCard";
import ProjectFilterAndSearch from "./components/ProjectFilterAndSearch";

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
          <Button>Create Project</Button>
        </div>
      </div>

      {/* project filters ui */}
      <div className="my-5">
        <ProjectFilterAndSearch />
      </div>

      {/* project list */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsPage;
