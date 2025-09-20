/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnnotationWithResourceStatusDto } from './AnnotationWithResourceStatusDto';
export type ListAnnotationsResponseDto = {
    /**
     * Array of annotations with resource status
     */
    items: Array<AnnotationWithResourceStatusDto>;
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

