import { createContext } from "react";
import { ProjectData } from "../../types/project-types";

export const ProjectDetailsContext = createContext<ProjectData | null>(null);
