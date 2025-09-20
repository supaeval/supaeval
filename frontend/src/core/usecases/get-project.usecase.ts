import { ProjectsService } from "@/lib/services/gen-api";
import type { ProjectEntity } from "@/lib/services/gen-api";

export class GetProjectUsecase {
  async execute(id: string): Promise<ProjectEntity | null> {
    return await ProjectsService.projectsControllerGetById({
      id: id,
    });
  }
}
