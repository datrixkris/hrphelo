"use client";

import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { useEffect, useState } from "react";
import ProjectDetails from "../../components/project-details/ProjectDetails";
import Taskboard from "../../components/taskboard/Taskboard";
import { useProjectStore } from "../../stores/project-store";
import { useKanbanStore } from "../../kanbanStore";
import { useParams } from "next/navigation";

const Project = () => {
  const params = useParams<{ projectSlug: string }>();
  const [toggleTaskboard, setToggleTaskboard] = useState(true);
  const { projects, fetchProjects } = useProjectStore();

  const { fetchColumn } = useKanbanStore();

  useEffect(() => {
    if (!params.projectSlug) return; // Return early if projectSlug is not defined

    async function loadProjectsAndFetchColumn() {
      await fetchProjects(); // Ensure projects are fetched
    }

    loadProjectsAndFetchColumn();
  }, [params.projectSlug, fetchProjects]);

  useEffect(() => {
    if (projects.length === 0 || !params.projectSlug) return; // Wait until projects are populated

    const project = projects.find((proj) => proj.slug === params.projectSlug);

    if (project?.id) {
      fetchColumn(project.id);
    } else {
      console.log("Project not found");
    }
  }, [projects, params.projectSlug, fetchColumn]);

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
