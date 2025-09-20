import { ProjectsService } from "@/lib/services/gen-api";
import { MockFileUploadProvider } from "@/lib/providers/mock-file-upload.provider";

export interface UploadAndCreateResourceParams {
  projectId: string;
  datasetId: string;
  file: File;
}

export interface UploadAndCreateResourceResult {
  success: boolean;
  resourceId?: string;
  storageKey?: string;
  error?: string;
}

export class UploadAndCreateResourceUsecase {
  private fileUploadProvider: MockFileUploadProvider;

  constructor() {
    this.fileUploadProvider = new MockFileUploadProvider();
  }

  async execute(
    params: UploadAndCreateResourceParams,
  ): Promise<UploadAndCreateResourceResult> {
    try {
      const { projectId, datasetId, file } = params;

      // Step 1: Get signed upload URL from the backend
      console.log("Getting signed upload URL...");
      const uploadResponse = await ProjectsService.projectsControllerUploadFile(
        {
          projectId,
          requestBody: {
            fileName: file.name,
            contentType: file.type,
          },
        },
      );

      console.log("Signed upload URL received:", uploadResponse);

      // Step 2: Upload the file using the mock provider
      console.log("Uploading file with mock provider...");
      const uploadResult = await this.fileUploadProvider.uploadFile(
        file,
        uploadResponse.url,
        uploadResponse.fields,
      );

      if (!uploadResult.success) {
        return {
          success: false,
          error: uploadResult.error || "File upload failed",
        };
      }

      // Step 3: Create resource record in the backend
      console.log("Creating resource record...");
      const resourceResponse =
        await ProjectsService.projectsControllerCreateResource({
          id: projectId,
          requestBody: {
            type: "IMAGE", // Assuming image files for now
            storageProvider: "LOCAL", // Using LOCAL since we're mocking
            storageKey: uploadResult.storageKey,
          },
        });

      console.log("Resource created:", resourceResponse);

      return {
        success: true,
        resourceId: resourceResponse.id,
        storageKey: uploadResult.storageKey,
      };
    } catch (error) {
      console.error("Upload and create resource failed:", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }
}
