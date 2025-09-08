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
import HasAccess from "@/app/(client)/components/HasAccess";

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
      fetchProjectData();
    }
  }, [params.projectSlug, fetchProjectById]);

  const fetchProjectData = async (optionalLoading = true) => {
    const data = (
      await fetchProjectById(params.projectSlug, optionalLoading)
    )[0];
    setProjectDetails(data);
    console.log(data);
  };

  return (
    <HasAccess module="Projects">
      {loading ? (
        <div className="mx-auto my-5 inline-block">Getting project info...</div>
      ) : (
        <div className="min-h-screen">
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
              <ProjectDetailsContext.Provider
                value={{ projectDetails, refreshData: fetchProjectData }}
              >
                <Taskboard project={projectDetails} />
              </ProjectDetailsContext.Provider>
            ) : (
              <ProjectDetailsContext.Provider
                value={{ projectDetails, refreshData: fetchProjectData }}
              >
                <ProjectDetails />
              </ProjectDetailsContext.Provider>
            )}
          </div>
        </div>
      )}
    </HasAccess>
  );
};

export default Project;
