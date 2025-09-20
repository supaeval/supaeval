"use client";

import { useRouter } from "next/navigation";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ImageUpload } from "@/components/ui/image-upload";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";

export default function UploadDataPage() {
  const router = useRouter();
  const { project } = useCurrentProjectStore();
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleAddToDataset = async (files: File[]) => {
    try {
      setUploadError(null);

      // TODO: Implement actual upload logic here
      // For now, we'll simulate the upload process
      console.log("Adding files to dataset:", files);

      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real implementation, you would:
      // 1. Create FormData with the files
      // 2. Send to your upload endpoint
      // 3. Handle the response

      console.log("Files added to dataset successfully");
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
              showAddToDatasetButton={true}
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
