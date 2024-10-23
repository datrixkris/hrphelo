import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
// import AddStaff from "../staff/components/AddStaff";
import Button from "@/app/components/Button";
import ProjectCard from "./components/ProjectCard";
import FilterAndSearch from "../staff/components/FilterAndSearch";

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
        <FilterAndSearch />
      </div>

      {/* project list */}
      <div className="">
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProjectsPage;
