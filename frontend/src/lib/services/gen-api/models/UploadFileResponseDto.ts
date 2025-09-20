/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UploadFileResponseDto = {
    /**
     * The signed upload URL
     */
    url: string;
    /**
     * Additional fields for the upload request
     */
    fields: Record<string, any>;
    /**
     * Expiration time in seconds
     */
    expiresIn: number;
};

