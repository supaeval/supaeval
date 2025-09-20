"use client";

import { useRouter } from "next/navigation";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import { uploadAndCreateResourceUsecase } from "@/core/application";
import { useListProjectResources } from "@/hooks/use-list-project-resources";

export default function UploadDataPage() {
  const router = useRouter();
  const { project } = useCurrentProjectStore();
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetch project resources
  const {
    data: resourcesData,
    isLoading: resourcesLoading,
    error: resourcesError,
    refetch: refetchResources,
  } = useListProjectResources({
    projectId: project?.id || "",
    page: 1,
    limit: 100,
  });

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

      // Refetch resources to show the newly uploaded files
      await refetchResources();
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

          {/* Project Resources Section */}
          <div className="mt-8 bg-white rounded-lg border p-8">
            <div className="flex items-center space-x-3 mb-6">
              <ImageIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Project Resources ({resourcesData?.count || 0})
              </h2>
            </div>

            {resourcesLoading && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading resources...</span>
              </div>
            )}

            {resourcesError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">
                  Failed to load resources: {resourcesError.message}
                </p>
              </div>
            )}

            {!resourcesLoading && !resourcesError && resourcesData && (
              <>
                {resourcesData.items.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No resources uploaded yet</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Upload some files to see them here
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
                    {resourcesData.items.map((resource) => (
                      <div
                        key={resource.id}
                        className="border rounded-lg overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors group"
                      >
                        <div className="aspect-square relative">
                          <img
                            src={resource.signedDownloadUrl}
                            alt={resource.storageKey}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to a placeholder if image fails to load
                              e.currentTarget.src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%236b7280'%3EImage%3C/text%3E%3C/svg%3E";
                            }}
                          />
                          <a
                            href={resource.signedDownloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-1 right-1 p-1 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full transition-all opacity-0 group-hover:opacity-100"
                            title="Open in new tab"
                          >
                            <ExternalLink className="h-2.5 w-2.5 text-gray-600" />
                          </a>
                        </div>
                        <div className="p-2">
                          <p
                            className="text-xs text-gray-600 truncate"
                            title={resource.storageKey}
                          >
                            {resource.storageKey.split("/").pop()}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {new Date(resource.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
