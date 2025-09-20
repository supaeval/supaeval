/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ResourceWithSignedUrlDto } from './ResourceWithSignedUrlDto';
export type ListResourcesResponseDto = {
    /**
     * Array of resources with signed download URLs
     */
    items: Array<ResourceWithSignedUrlDto>;
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

