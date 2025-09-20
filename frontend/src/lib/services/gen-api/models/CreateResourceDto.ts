/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateResourceDto = {
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
};

