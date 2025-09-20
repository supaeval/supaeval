"use client";

import { useRouter } from "next/navigation";
import { useCurrentProjectStore } from "@/stores/current-project.store";
import { ProjectSubNav } from "@/components/ui/project-sub-nav";
import { ArrowLeft, Tag, Image as ImageIcon } from "lucide-react";
import { useListProjectResources } from "@/hooks/use-list-project-resources";
import type { ResourceWithSignedUrlDto } from "@/lib/services/gen-api";

// Resource Card Component
function ResourceCard({
  resource,
  projectId,
}: {
  resource: ResourceWithSignedUrlDto;
  projectId: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${projectId}/annotations/${resource.id}`);
  };

  return (
    <div
      className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
    >
      <div>
        <p
          className="text-sm text-gray-900 truncate font-medium"
          title={resource.storageKey}
        >
          {resource.storageKey.split("/").pop()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {new Date(resource.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default function AnnotationsPage() {
  const router = useRouter();
  const { project } = useCurrentProjectStore();

  // Fetch project resources
  const {
    data: resourcesData,
    isLoading: resourcesLoading,
    error: resourcesError,
  } = useListProjectResources({
    projectId: project?.id || "",
    page: 1,
    limit: 100,
  });

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
              Annotations
            </h1>
            <p className="text-lg text-gray-600">
              Annotate and manage your resources for {project.name}
            </p>
          </div>

          {/* Trello-like Columns */}
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
                  <p className="text-gray-600">No resources to annotate yet</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Upload some files first to start annotating
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* To Annotate Column */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <h3 className="font-semibold text-gray-900">
                        To Annotate
                      </h3>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        {
                          resourcesData.items.filter(
                            (r) => r.status === "PENDING_ANNOTATION",
                          ).length
                        }
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resourcesData.items
                        .filter(
                          (resource) =>
                            resource.status === "PENDING_ANNOTATION",
                        )
                        .map((resource) => (
                          <ResourceCard
                            key={resource.id}
                            resource={resource}
                            projectId={project.id}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Annotating Column */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <h3 className="font-semibold text-gray-900">
                        Annotating
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {
                          resourcesData.items.filter(
                            (r) => r.status === "ANNOTATING",
                          ).length
                        }
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resourcesData.items
                        .filter((resource) => resource.status === "ANNOTATING")
                        .map((resource) => (
                          <ResourceCard
                            key={resource.id}
                            resource={resource}
                            projectId={project.id}
                          />
                        ))}
                    </div>
                  </div>

                  {/* Annotated Column */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h3 className="font-semibold text-gray-900">Annotated</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        {
                          resourcesData.items.filter(
                            (r) => r.status === "ANNOTATED",
                          ).length
                        }
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resourcesData.items
                        .filter((resource) => resource.status === "ANNOTATED")
                        .map((resource) => (
                          <ResourceCard
                            key={resource.id}
                            resource={resource}
                            projectId={project.id}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
