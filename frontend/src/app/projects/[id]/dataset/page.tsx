"use client";

import { useRouter } from "next/navigation";
import { getDatasetUsecase } from "@/core/application";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ArrowLeft, Database, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function DatasetPage() {
  const router = useRouter();
  const { project } = useCurrentProjectStore();

  // Get the first dataset from the project
  const firstDataset = project?.datasets?.[0];

  // Fetch dataset details using the getDatasetUsecase
  const {
    data: dataset,
    isLoading: datasetLoading,
    error: datasetError,
  } = useQuery({
    queryKey: ["dataset", firstDataset?.id],
    queryFn: () => getDatasetUsecase.execute({ id: firstDataset!.id }),
    enabled: !!firstDataset?.id,
  });

  // Project data is guaranteed to be available due to ProjectOnlyGuard
  if (!project) {
    return null;
  }

  // Show dataset loading state with skeleton
  if (datasetLoading) {
    return (
      <div className="flex h-full">
        <ProjectSubNav projectId={project.id} />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header skeleton */}
            <div className="mb-8">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Dataset overview skeleton */}
            <div className="bg-white rounded-lg border p-8">
              <div className="text-center">
                {/* Icon skeleton */}
                <div className="h-12 w-12 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />

                {/* Title skeleton */}
                <div className="h-6 w-48 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />

                {/* Description skeleton */}
                <div className="h-4 w-80 bg-gray-200 rounded mx-auto mb-6 animate-pulse" />

                {/* Dataset version skeleton */}
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="h-6 w-32 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>

                {/* Stats grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="h-8 w-12 bg-gray-200 rounded mx-auto mb-2 animate-pulse" />
                      <div className="h-4 w-20 bg-gray-200 rounded mx-auto animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show dataset error state
  if (datasetError) {
    return (
      <div className="flex h-full">
        <ProjectSubNav projectId={project.id} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Failed to load dataset</p>
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

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dataset</h1>
            <p className="text-lg text-gray-600">
              View and manage your dataset for {project.name}
            </p>
          </div>

          {/* Dataset Overview */}
          <div className="bg-white rounded-lg border p-8">
            <div className="text-center">
              <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Dataset Overview
              </h3>
              <p className="text-gray-600 mb-6">
                Your uploaded data will appear here once processed
              </p>

              {/* Dataset Version Display */}
              {datasetLoading && (
                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600">
                      Loading dataset...
                    </span>
                  </div>
                </div>
              )}

              {dataset && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-blue-700 font-medium">
                      Dataset Version:
                    </span>
                    <span className="text-lg font-bold text-blue-900">
                      {dataset.version}
                    </span>
                  </div>
                </div>
              )}

              {!dataset && !datasetLoading && !firstDataset && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-sm text-yellow-700">
                      No dataset found for this project
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Total Records</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Processed</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">0</p>
                  <p className="text-sm text-gray-600">Errors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
