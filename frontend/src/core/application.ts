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
import {
  UploadAndCreateResourceUsecase,
  type UploadAndCreateResourceParams,
  type UploadAndCreateResourceResult,
} from "./usecases/upload-and-create-resource.usecase";
import {
  ListProjectResourcesUsecase,
  type ListProjectResourcesParams,
} from "./usecases/list-project-resources.usecase";

// Types
export type { CreateProjectParams } from "./usecases/create-project.usecase";
export type { GetDatasetParams } from "./usecases/get-dataset.usecase";
export type { UploadAndCreateResourceParams } from "./usecases/upload-and-create-resource.usecase";
export type { UploadAndCreateResourceResult } from "./usecases/upload-and-create-resource.usecase";
export type { ListProjectResourcesParams } from "./usecases/list-project-resources.usecase";
export type { ProjectEntity as Project } from "@/lib/services/gen-api";

// Frontend usecases
export const getProjectsUsecase = new GetProjectsUsecase();
export const getProjectUsecase = new GetProjectUsecase();
export const createProjectUsecase = new CreateProjectUsecase();
export const getDatasetUsecase = new GetDatasetUsecase();
export const uploadAndCreateResourceUsecase =
  new UploadAndCreateResourceUsecase();
export const listProjectResourcesUsecase = new ListProjectResourcesUsecase();
