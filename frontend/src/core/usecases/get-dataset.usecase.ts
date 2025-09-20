import { DatasetsService } from "@/lib/services/gen-api";

export interface GetDatasetParams {
  id: string;
}

export class GetDatasetUsecase {
  async execute(params: GetDatasetParams) {
    return await DatasetsService.datasetsControllerGetById({
      id: params.id,
    });
  }
}
