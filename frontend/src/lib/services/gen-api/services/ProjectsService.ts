/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProjectDto } from '../models/CreateProjectDto';
import type { CreateProjectResponseDto } from '../models/CreateProjectResponseDto';
import type { ListProjectsResponseDto } from '../models/ListProjectsResponseDto';
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
}
