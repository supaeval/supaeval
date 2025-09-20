/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProjectDto = {
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
};

