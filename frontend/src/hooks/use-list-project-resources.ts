import { useQuery } from "@tanstack/react-query";
import {
  listProjectResourcesUsecase,
  ListProjectResourcesParams,
} from "@/core/application";

export const useListProjectResources = (params: ListProjectResourcesParams) => {
  return useQuery({
    queryKey: [
      "project-resources",
      params.projectId,
      params.page,
      params.limit,
    ],
    queryFn: () => listProjectResourcesUsecase.execute(params),
    enabled: !!params.projectId, // Only run query if projectId is provided
  });
};
