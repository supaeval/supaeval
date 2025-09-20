/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AnnotationWithResourceStatusDto = {
    /**
     * The unique identifier of the annotation
     */
    id: string;
    /**
     * The ID of the resource this annotation belongs to
     */
    resourceId: string;
    /**
     * The ID of the user who created this annotation
     */
    createdById: string;
    /**
     * The creation timestamp of the annotation
     */
    createdAt: string;
    /**
     * The last update timestamp of the annotation
     */
    updatedAt: string;
    /**
     * The annotation status of the associated resource
     */
    resourceStatus: 'PENDING_ANNOTATION' | 'ANNOTATING' | 'ANNOTATED';
    /**
     * The storage key of the associated resource
     */
    resourceStorageKey: string;
};

