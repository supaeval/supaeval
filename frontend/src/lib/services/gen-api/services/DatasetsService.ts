/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetDatasetResponseDto } from '../models/GetDatasetResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DatasetsService {
    /**
     * Get dataset by ID
     * Retrieve a dataset by its unique identifier without fetching records
     * @returns GetDatasetResponseDto Dataset retrieved successfully
     * @throws ApiError
     */
    public static datasetsControllerGetById({
        id,
    }: {
        /**
         * The ID of the dataset
         */
        id: string,
    }): CancelablePromise<GetDatasetResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/datasets/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Dataset not found`,
                500: `Failed to fetch dataset`,
            },
        });
    }
}
