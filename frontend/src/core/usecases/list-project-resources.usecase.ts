import { ProjectsService } from "@/lib/services/gen-api";

export interface ListProjectResourcesParams {
  projectId: string;
  page?: number;
  limit?: number;
}

export class ListProjectResourcesUsecase {
  async execute(params: ListProjectResourcesParams) {
    return await ProjectsService.projectsControllerListResources({
      id: params.projectId,
      page: params.page,
      limit: params.limit,
    });
  }
}
