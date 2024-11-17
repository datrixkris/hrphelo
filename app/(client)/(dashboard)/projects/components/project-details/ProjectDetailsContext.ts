import { createContext, useContext } from "react";
import { ProjectData } from "../../types/project-types";

interface ProjectDataTypes {
  projectDetails: ProjectData | null;
  refreshData: () => void;
}

export const ProjectDetailsContext = createContext<ProjectDataTypes | null>(
  null,
);

export const useProjectDetailsContext = () => {
  if (!ProjectDetailsContext) {
    throw new Error(
      "ProjectDetailsContext is null. Ensure a Provider is wrapping the component.",
    );
  }

  return useContext(ProjectDetailsContext);
};
