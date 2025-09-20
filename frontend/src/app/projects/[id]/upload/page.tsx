"use client";

import { useRouter } from "next/navigation";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ImageUpload } from "@/components/ui/image-upload";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { uploadAndCreateResourceUsecase } from "@/core/application";

export default function UploadDataPage() {
  const router = useRouter();
  const { project } = useCurrentProjectStore();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAddToDataset = async (files: File[]) => {
    try {
      setUploadError(null);

      if (!project || !project.datasets || project.datasets.length === 0) {
        throw new Error("No dataset found for this project");
      }

      // Get the first dataset (assuming there's always at least one)
      const dataset = project.datasets[0];

      console.log("Uploading files to project:", {
        projectId: project.id,
        datasetId: dataset.id,
        fileCount: files.length,
      });

      // Upload each file using the usecase
      const uploadPromises = files.map(async (file) => {
        const result = await uploadAndCreateResourceUsecase.execute({
          projectId: project.id,
          datasetId: dataset.id,
          file,
        });

        if (!result.success) {
          throw new Error(result.error || "Upload failed");
        }

        return result;
      });

      // Wait for all uploads to complete
      const results = await Promise.all(uploadPromises);

      console.log("All files uploaded successfully:", results);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Upload failed";
      setUploadError(errorMessage);
      throw error; // Re-throw to let the ImageUpload component handle it
    }
  };

  // Project data is guaranteed to be available due to ProjectOnlyGuard
  if (!project) {
    return null;
  }

  return (
    <div className="flex h-full">
      <ProjectSubNav projectId={project.id} />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <button
              onClick={() => router.push("/projects")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to projects</span>
            </button>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Upload Data
            </h1>
            <p className="text-lg text-gray-600">
              Upload and manage your data files for {project.name}
            </p>
          </div>

          <div className="bg-white rounded-lg border p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Images
              </h2>
            </div>

            {uploadError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{uploadError}</p>
              </div>
            )}

            <ImageUpload
              onUpload={async () => {}} // Not used in two-step process
              onAddToDataset={handleAddToDataset}
              showUploadButton={true}
              maxFiles={20}
              maxSize={10 * 1024 * 1024} // 10MB
              acceptedFileTypes={["image/jpeg", "image/png", "image/webp"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
