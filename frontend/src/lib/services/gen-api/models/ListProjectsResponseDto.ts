/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectEntity } from './ProjectEntity';
export type ListProjectsResponseDto = {
    /**
     * Array of projects
     */
    items: Array<ProjectEntity>;
    /**
     * Total count of items
     */
    count: number;
    /**
     * Current page number
     */
    page: number;
    /**
     * Next page number, null if no next page
     */
    nextPage: number | null;
};

