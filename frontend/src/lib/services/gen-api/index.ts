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
export type { ListProjectsResponseDto } from './models/ListProjectsResponseDto';
export type { ProjectEntity } from './models/ProjectEntity';

export { ProjectsService } from './services/ProjectsService';
import { OpenAPI } from "./core/OpenAPI";
export { getToken } from "./client";
OpenAPI.BASE = "http://localhost:3001";
