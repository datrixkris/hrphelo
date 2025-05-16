"use client";

import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React from "react";
import ProjectFilterAndSearch from "./components/ProjectFilterAndSearch";
import CreateProject from "./components/CreateProject";
import ProjectList from "./components/ProjectList";
import HasAccess from "../../components/HasAccess";
import { useHasPermission } from "@/app/hooks/permissions";

const ProjectsPage = () => {
  // permission to create
  const hasCreatePermission = useHasPermission("create", "Project");
  return (
    <HasAccess module="Project">
      <div>
        {/* header plus breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-5">
          <PageTitleWithCrumbs
            title="projects"
            crumbs={[
              { name: "Dashboard", link: "/dashboard" },
              { name: "Projects" },
            ]}
          />
          <div>{hasCreatePermission && <CreateProject />}</div>
        </div>

        {/* project filters ui */}
        <div className="my-5">
          <ProjectFilterAndSearch />
        </div>

        {/* project list */}
        <ProjectList />
      </div>
    </HasAccess>
  );
};

export default ProjectsPage;
