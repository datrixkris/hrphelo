"use client";

import React, { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import { useProjectStore } from "../stores/project-store";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

const ProjectList = () => {
  const { projects, loading, fetchProjects } = useProjectStore();

  // fetch projects on initialization
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div>
      {projects.length < 1 && loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : projects.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {projects.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded py-20 text-center">No data available</div>
      )}
    </div>
  );
};

export default ProjectList;
