"use client";

import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { useEffect, useState } from "react";
import ProjectDetails from "../../components/project-details/ProjectDetails";
import Taskboard from "../../components/taskboard/Taskboard";
import { useKanbanStore } from "../../kanbanStore";
import { useParams } from "next/navigation";

const Project = () => {
  const params = useParams<{ projectId: string; projectSlug: string }>();

  const [toggleTaskboard, setToggleTaskboard] = useState(true);

  const { fetchColumn } = useKanbanStore();

  useEffect(() => {
    if (!params.projectId) return;
    fetchColumn(Number(params.projectId));
  }, [params.projectId, fetchColumn]);

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
