"use client";

import { useEffect, useState } from "react";
import { Project, getProjectsUsecase } from "@/core/application";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { NewProjectDialog } from "@/components/ui/new-project-dialog";
import { FolderOpen, Loader2, Plus } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjectsUsecase.execute();
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async (data: {
    name: string;
    description: string;
    type: string;
  }) => {
    try {
      setIsCreating(true);
      // TODO: Implement actual project creation API call
      console.log("Creating project:", data);

      // For now, just close the dialog
      setIsDialogOpen(false);

      // TODO: Refresh projects list after creation
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsCreating(false);
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
            <p className="text-red-600 mb-2">{error}</p>
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
            <p className="text-gray-600">
              Get started by creating your first project.
            </p>
          </div>
        </div>
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
        isLoading={isCreating}
      />
    </div>
  );
}
