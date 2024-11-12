"use client";

import Button from "@/app/components/Button";
import PageTitleWithCrumbs from "@/app/components/PageTitleWithCrumbs";
import { useEffect, useLayoutEffect, useState } from "react";
import ProjectDetails from "../../components/project-details/ProjectDetails";
import Taskboard from "../../components/taskboard/Taskboard";
import { useKanbanStore } from "../../stores/kanbanStore";
import { useParams } from "next/navigation";
import { ProjectData } from "../../types/project-types";
import { useProjectStore } from "../../stores/project-store";
import { ProjectDetailsContext } from "../../components/project-details/ProjectDetailsContext";

const Project = () => {
  const params = useParams<{ projectId: string; projectSlug: string }>();

  const [toggleTaskboard, setToggleTaskboard] = useState(true);
  const [projectDetails, setProjectDetails] = useState<ProjectData | null>(
    null,
  );

  const { fetchColumn } = useKanbanStore();
  const { fetchProjectById, loading } = useProjectStore();

  useEffect(() => {
    if (!params.projectId) return;
    fetchColumn(Number(params.projectId));
  }, [params.projectId, fetchColumn]);

  useLayoutEffect(() => {
    if (params.projectSlug) {
      const fetchData = async () => {
        const data = (await fetchProjectById(params.projectSlug))[0];
        setProjectDetails(data);
        console.log(data);
      };

      fetchData();
    }
  }, [params.projectSlug, fetchProjectById]);

  return (
    <>
      {loading ? (
        <div className="mx-auto my-5 inline-block">Getting project info...</div>
      ) : (
        <div>
          {/* bread crumbs */}
          <div className="flex flex-wrap items-center justify-between gap-5">
            <PageTitleWithCrumbs
              title={projectDetails?.name ?? ""}
              crumbs={[
                { name: "Dashboard", link: "/dashboard" },
                { name: "Projects", link: "/projects" },
                { name: projectDetails?.name ?? "" },
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
            {toggleTaskboard ? (
              <Taskboard project={projectDetails} />
            ) : (
              <ProjectDetailsContext.Provider value={projectDetails}>
                <ProjectDetails />
              </ProjectDetailsContext.Provider>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
