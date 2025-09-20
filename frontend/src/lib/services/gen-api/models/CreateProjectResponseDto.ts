/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DatasetEntity } from './DatasetEntity';
export type CreateProjectResponseDto = {
    /**
     * The unique identifier of the project
     */
    id: string;
    /**
     * The name of the project
     */
    name: string;
    /**
     * The description of the project
     */
    description: string;
    /**
     * The type of the project
     */
    type: 'MULTIMODAL' | 'IMAGE_EXTRACTION' | 'LLM_TEXT' | 'INSTANCE_SEGMENTATION';
    /**
     * The creation timestamp
     */
    createdAt: string;
    /**
     * The last update timestamp
     */
    updatedAt: string;
    /**
     * The organization ID that owns this project
     */
    organizationId: string;
    /**
     * The user ID who created this project
     */
    createdById: string;
    /**
     * The datasets associated with this project
     */
    datasets?: Array<DatasetEntity>;
};

