import { useQuery } from "@tanstack/react-query";
import { getDatasetUsecase, type GetDatasetParams } from "@/core/application";

export const useGetDataset = (params: GetDatasetParams) => {
  return useQuery({
    queryKey: ["dataset", params.id],
    queryFn: () => getDatasetUsecase.execute(params),
    enabled: !!params.id, // Only run query if id is provided
  });
};
