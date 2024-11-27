import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import AchievementService from './achievement.url';

export interface Params {
  page: number;
  size: number;
}

export interface TAchievement {
  id?: string;
  name: string;
  detail: string;
  organizer: string;
  image: string;
  date: string;
}

interface AchievementResponse extends BaseResponse {
  data: TAchievement[]
}

// Query for GET all achievements
export const useGetAllAchievements = (params: Params) => {
  console.log(params)
  return useQuery<AchievementResponse>({
    queryKey: ['achievements', params],
    queryFn: async () => {
      const response = await AchievementService.getAllAchievements(params);
      return response.data;
    },
  });
};

// Mutation for ADD achievement
export const useAddAchievement = (
  options?: UseMutationOptions<AxiosResponse, unknown, FormData>,
) => {
  return useMutation<AxiosResponse, unknown, FormData>({
    mutationFn: async (data: FormData) => {
      const response = await AchievementService.addAchievement(data);
      return response.data;
    },
    ...options,
  });
};

// Mutation for UPDATE achievement data
export const useUpdateAchievementData = (
  options?: UseMutationOptions<AxiosResponse, unknown, { id: string; data: FormData }>,
) => {
  return useMutation<AxiosResponse, unknown, { id: string; data: FormData }>({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await AchievementService.updateAchievementData(id, data);
      return response.data;
    },
    ...options,
  });
};

// Mutation for DELETE achievement
export const useDeleteAchievement = (
  options?: UseMutationOptions<void, unknown, string>,
) => {
  return useMutation<void, unknown, string>({
    mutationFn: async (id: string) => {
      await AchievementService.deleteAchievement(id);
    },
    ...options,
  });
};
