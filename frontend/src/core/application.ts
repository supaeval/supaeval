import { GetProjectsUsecase } from "./usecases/get-projects.usecase";
import { GetProjectUsecase } from "./usecases/get-project.usecase";
import {
  CreateProjectUsecase,
  type CreateProjectParams,
} from "./usecases/create-project.usecase";
import {
  GetDatasetUsecase,
  type GetDatasetParams,
} from "./usecases/get-dataset.usecase";

// Types
export type { CreateProjectParams } from "./usecases/create-project.usecase";
export type { GetDatasetParams } from "./usecases/get-dataset.usecase";
export type { ProjectEntity as Project } from "@/lib/services/gen-api";

// Frontend usecases
export const getProjectsUsecase = new GetProjectsUsecase();
export const getProjectUsecase = new GetProjectUsecase();
export const createProjectUsecase = new CreateProjectUsecase();
export const getDatasetUsecase = new GetDatasetUsecase();
