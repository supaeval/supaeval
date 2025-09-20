/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateResourceResponseDto = {
    /**
     * The unique identifier of the resource
     */
    id: string;
    /**
     * The type of the resource
     */
    type: 'IMAGE';
    /**
     * The storage provider for the resource
     */
    storageProvider: 'LOCAL' | 'GCS' | 'S3' | 'AZURE';
    /**
     * The storage key/path for the resource
     */
    storageKey: string;
    /**
     * The ID of the project this resource belongs to
     */
    projectId: string;
    /**
     * The creation timestamp of the resource
     */
    createdAt: string;
    /**
     * The last update timestamp of the resource
     */
    updatedAt: string;
};

