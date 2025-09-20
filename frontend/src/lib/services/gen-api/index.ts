/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { ApiError } from './core/ApiError';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { CreateProjectDto } from './models/CreateProjectDto';
export type { CreateProjectResponseDto } from './models/CreateProjectResponseDto';
export type { DatasetEntity } from './models/DatasetEntity';
export type { GetDatasetResponseDto } from './models/GetDatasetResponseDto';
export type { GetProjectResponseDto } from './models/GetProjectResponseDto';
export type { ListProjectsResponseDto } from './models/ListProjectsResponseDto';
export type { ProjectEntity } from './models/ProjectEntity';
export type { UploadFileDto } from './models/UploadFileDto';
export type { UploadFileResponseDto } from './models/UploadFileResponseDto';

export { DatasetsService } from './services/DatasetsService';
export { ProjectsService } from './services/ProjectsService';
import { OpenAPI } from "./core/OpenAPI";
export { getToken } from "./client";
OpenAPI.BASE = "http://localhost:3001";
