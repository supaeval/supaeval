import { ProjectsService } from "@/lib/services/gen-api";
import type {
  CreateProjectDto,
  CreateProjectResponseDto,
} from "@/lib/services/gen-api";

export interface CreateProjectParams {
  name: string;
  description: string;
  type:
    | "MULTIMODAL"
    | "IMAGE_EXTRACTION"
    | "LLM_TEXT"
    | "INSTANCE_SEGMENTATION";
}

export class CreateProjectUsecase {
  async execute(
    params: CreateProjectParams,
  ): Promise<CreateProjectResponseDto> {
    const createProjectDto: CreateProjectDto = {
      name: params.name,
      description: params.description,
      type: params.type as CreateProjectDto["type"],
    };

    return await ProjectsService.projectsControllerCreate({
      requestBody: createProjectDto,
    });
  }
}
