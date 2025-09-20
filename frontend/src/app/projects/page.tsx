"use client";

import { useState } from "react";
import { Project, getProjectsUsecase } from "@/core/application";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { NewProjectDialog } from "@/components/ui/new-project-dialog";
import { useCreateProject } from "@/hooks/use-create-project";
import { useQuery } from "@tanstack/react-query";
import { FolderOpen, Loader2, Plus } from "lucide-react";
import type { CreateProjectParams } from "@/core/application";

export default function ProjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: projects = [],
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      return await getProjectsUsecase.execute();
    },
  });

  const createProjectMutation = useCreateProject();

  const handleCreateProject = async (data: CreateProjectParams) => {
    try {
      await createProjectMutation.mutateAsync(data);
      setIsDialogOpen(false);
    } catch (error) {
      // Error is handled by the mutation and will be displayed in the UI
      console.error("Error creating project:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2 text-gray-600">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading projects...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-2">Failed to load projects</p>
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first project.
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        <NewProjectDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSubmit={handleCreateProject}
          isLoading={createProjectMutation.isPending}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Projects</h1>
            <p className="text-gray-600">
              Manage and track your projects from one place.
            </p>
          </div>
          <Button
            startContent={<Plus className="h-4 w-4" />}
            onClick={() => setIsDialogOpen(true)}
          >
            New Project
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <NewProjectDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateProject}
        isLoading={createProjectMutation.isPending}
        error={createProjectMutation.error?.message}
      />
    </div>
  );
}
