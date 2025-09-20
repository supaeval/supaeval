import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProjectUsecase,
  type CreateProjectParams,
} from "@/core/application";
import type { CreateProjectResponseDto } from "@/lib/services/gen-api";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateProjectResponseDto, Error, CreateProjectParams>({
    mutationFn: async (params: CreateProjectParams) => {
      return await createProjectUsecase.execute(params);
    },
    onSuccess: () => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
