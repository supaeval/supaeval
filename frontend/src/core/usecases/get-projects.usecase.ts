import { ProjectsService } from "@/lib/services/gen-api";
import type { ProjectEntity } from "@/lib/services/gen-api";

export interface GetProjectsParams {
  page?: number;
  limit?: number;
}

export class GetProjectsUsecase {
  async execute(params?: GetProjectsParams): Promise<ProjectEntity[]> {
    const result = await ProjectsService.projectsControllerList({
      page: params?.page,
      limit: params?.limit,
    });

    return result.items;
  }
}
