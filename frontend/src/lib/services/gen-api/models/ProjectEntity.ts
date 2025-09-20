/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ProjectEntity = {
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
    type: 'IMAGE_EXTRACTION';
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
};

