"use client";

import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import React, { useState } from "react";
import Taskboard from "../components/taskboard/Taskboard";
import ProjectDetails from "../components/project-details/ProjectDetails";

const Project = () => {
  const [toggleTaskboard, setToggleTaskboard] = useState(true);
  return (
    <div>
      {/* bread crumbs */}
      <div className="flex items-center justify-between">
        <PageTitleWithCrumbs
          title="project name"
          crumbs={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Projects", link: "/projects" },
            { name: "project name" },
          ]}
        />
        <div>
          <Button onClick={() => setToggleTaskboard(!toggleTaskboard)}>
            {toggleTaskboard ? "View project details" : "View task board"}
          </Button>
        </div>
      </div>

      {/* taskboard and project details */}
      <div className="mt-8">
        {toggleTaskboard ? <Taskboard /> : <ProjectDetails />}
      </div>
    </div>
  );
};

export default Project;
