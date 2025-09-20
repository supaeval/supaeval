/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { CreateProjectResponseDto } from '../models/CreateProjectResponseDto';
import type { CreateResourceDto } from '../models/CreateResourceDto';
import type { CreateResourceResponseDto } from '../models/CreateResourceResponseDto';
import type { GetProjectResponseDto } from '../models/GetProjectResponseDto';
import type { ListProjectsResponseDto } from '../models/ListProjectsResponseDto';
import type { ListResourcesResponseDto } from '../models/ListResourcesResponseDto';
import type { UploadFileDto } from '../models/UploadFileDto';
import type { UploadFileResponseDto } from '../models/UploadFileResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectsService {
    /**
     * Create a new project
     * Create a new project with the specified name, description, and type
     * @returns CreateProjectResponseDto Project created successfully
     * @throws ApiError
     */
    public static projectsControllerCreate({
        requestBody,
    }: {
        requestBody: CreateProjectDto,
    }): CancelablePromise<CreateProjectResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input data`,
                422: `User not found`,
                500: `Failed to create project`,
            },
        });
    }
    /**
     * List all projects
     * Get all projects for the organization with pagination
     * @returns ListProjectsResponseDto Projects retrieved successfully
     * @throws ApiError
     */
    public static projectsControllerList({
        page,
        limit,
    }: {
        /**
         * Page number (default: 1)
         */
        page?: number,
        /**
         * Number of items per page (default: 10)
         */
        limit?: number,
    }): CancelablePromise<ListProjectsResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects',
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                422: `Organization not found`,
                500: `Failed to list projects`,
            },
        });
    }
    /**
     * Get project by ID
     * Retrieve a project by its unique identifier including its datasets
     * @returns GetProjectResponseDto Project retrieved successfully
     * @throws ApiError
     */
    public static projectsControllerGetById({
        id,
    }: {
        /**
         * The ID of the project
         */
        id: string,
    }): CancelablePromise<GetProjectResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Project not found`,
                500: `Failed to fetch project`,
            },
        });
    }
    /**
     * @returns UploadFileResponseDto
     * @throws ApiError
     */
    public static projectsControllerUploadFile({
        projectId,
        requestBody,
    }: {
        projectId: string,
        requestBody: UploadFileDto,
    }): CancelablePromise<UploadFileResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectId}/upload',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create resource for project
     * Create a new resource for the specified project
     * @returns CreateResourceResponseDto Resource created successfully
     * @throws ApiError
     */
    public static projectsControllerCreateResource({
        id,
        requestBody,
    }: {
        /**
         * The ID of the project
         */
        id: string,
        requestBody: CreateResourceDto,
    }): CancelablePromise<CreateResourceResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{id}/resources',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input data`,
                404: `Project not found`,
                422: `User not found`,
                500: `Failed to create resource`,
            },
        });
    }
    /**
     * List project resources
     * Get all resources for a project with signed download URLs and pagination
     * @returns ListResourcesResponseDto Resources retrieved successfully
     * @throws ApiError
     */
    public static projectsControllerListResources({
        id,
        page,
        limit,
    }: {
        /**
         * The ID of the project
         */
        id: string,
        /**
         * Page number (default: 1)
         */
        page?: number,
        /**
         * Number of items per page (default: 10)
         */
        limit?: number,
    }): CancelablePromise<ListResourcesResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/projects/{id}/resources',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
            },
            errors: {
                404: `Project not found`,
                500: `Failed to list resources`,
            },
        });
    }
}
