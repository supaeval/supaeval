/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { CreateProjectResponseDto } from '../models/CreateProjectResponseDto';
import type { GetProjectResponseDto } from '../models/GetProjectResponseDto';
import type { ListProjectsResponseDto } from '../models/ListProjectsResponseDto';
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
     * Upload file to project dataset
     * Generate a signed URL for uploading a file to the project dataset
     * @returns UploadFileResponseDto Upload URL generated successfully
     * @throws ApiError
     */
    public static projectsControllerUploadFile({
        projectId,
        datasetId,
        requestBody,
    }: {
        /**
         * The ID of the project
         */
        projectId: string,
        /**
         * The ID of the dataset
         */
        datasetId: string,
        requestBody: UploadFileDto,
    }): CancelablePromise<UploadFileResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/projects/{projectId}/datasets/{datasetId}/upload',
            path: {
                'projectId': projectId,
                'datasetId': datasetId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid input data`,
                422: `Dataset not found or does not belong to the specified project`,
                500: `Failed to generate upload URL`,
            },
        });
    }
}
