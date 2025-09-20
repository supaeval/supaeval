import { create } from "zustand";
import { ProjectEntity } from "@/lib/services/gen-api";
import { getProjectUsecase } from "@/core/application";

interface CurrentProjectState {
  project: ProjectEntity | null;
  isLoading: boolean;
  error: string | null;
  loadProject: (projectId: string) => Promise<void>;
  clearProject: () => void;
}

export const useCurrentProjectStore = create<CurrentProjectState>(
  (set, get) => ({
    project: null,
    isLoading: false,
    error: null,

    loadProject: async (projectId: string) => {
      const { project } = get();

      // If we already have the same project loaded, don't reload
      if (project?.id === projectId) {
        return;
      }

      set({ isLoading: true, error: null });

      try {
        const projectData = await getProjectUsecase.execute(projectId);

        if (!projectData) {
          throw new Error("Project not found");
        }

        set({
          project: projectData,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        set({
          project: null,
          isLoading: false,
          error:
            error instanceof Error ? error.message : "Failed to load project",
        });
      }
    },

    clearProject: () => {
      set({ project: null, isLoading: false, error: null });
    },
  }),
);
