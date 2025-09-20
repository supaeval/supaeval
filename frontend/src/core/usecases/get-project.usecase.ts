import { ProjectsService } from "@/lib/services/gen-api";
import type { ProjectEntity } from "@/lib/services/gen-api";

export class GetProjectUsecase {
  async execute(id: string): Promise<ProjectEntity | null> {
    // Since there's no individual project endpoint yet, we'll fetch all projects
    // and filter by ID. In a real implementation, this would be a dedicated endpoint.
    const response = await ProjectsService.projectsControllerList({
      page: 1,
      limit: 1000, // Get a large number to find the project
    });

    // Find the project by ID
    const project = response.items.find((p) => p.id === id);
    return project || null;
  }
}
