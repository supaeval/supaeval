"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { Loader2, AlertCircle } from "lucide-react";

interface ProjectOnlyGuardProps {
  children: React.ReactNode;
}

export const ProjectOnlyGuard = ({ children }: ProjectOnlyGuardProps) => {
  const params = useParams();
  const router = useRouter();
  const { project, isLoading, error, loadProject } = useCurrentProjectStore();

  const projectId = params.id as string;

  useEffect(() => {
    if (projectId) {
      loadProject(projectId);
    }
  }, [projectId, loadProject]);

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="flex h-full">
        {/* Sidebar skeleton */}
        <div className="w-48 bg-gray-100 border-r border-gray-300">
          <div className="p-3 space-y-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 bg-gray-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header skeleton */}
            <div className="mb-8">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Content skeleton */}
            <div className="bg-white rounded-lg border p-8">
              <div className="space-y-6">
                {/* Project info skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-28 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* Stats skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-lg">
                      <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
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

  // Error state
  if (error) {
    return (
      <div className="flex h-full">
        <div className="w-48 bg-gray-100 border-r border-gray-300" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Project Not Found
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push("/projects")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No project loaded
  if (!project) {
    return (
      <div className="flex h-full">
        <div className="w-48 bg-gray-100 border-r border-gray-300" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No project data available</p>
            <button
              onClick={() => router.push("/projects")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Project loaded successfully - render children
  return <>{children}</>;
};
