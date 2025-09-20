"use client";

import { useParams, useRouter } from "next/navigation";
import { getProjectUsecase } from "@/core/application";
import { ProjectEntity } from "@/lib/services/gen-api";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ImageUpload } from "@/components/ui/image-upload";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function UploadDataPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const foundProject = await getProjectUsecase.execute(
          params.id as string,
        );
        setProject(foundProject);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

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

  if (loading) {
    return (
      <div className="flex h-full">
        <div className="w-48 bg-gray-100 border-r border-gray-300" />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex items-center space-x-2 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-full">
        <div className="w-48 bg-gray-100 border-r border-gray-300" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Project not found</p>
            <button
              onClick={() => router.push("/projects")}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Back to projects
            </button>
          </div>
        </div>
      </div>
    );
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
              onUpload={() => {}} // Not used in two-step process
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
