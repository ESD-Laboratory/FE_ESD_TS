import { AxiosResponse } from "axios";
import axiosInstance from "../axiosInstance";  // Assuming you're using axiosInstance
import { Params } from "./achievement.query";

function getAllAchievements(params: Params): Promise<AxiosResponse> {
  return axiosInstance.get('/achievements', { params });
}

function addAchievement(data: FormData): Promise<AxiosResponse> {
  return axiosInstance.post('/achievements/add', data);
}

function updateAchievementData(id: string, data: FormData): Promise<AxiosResponse> {
  return axiosInstance.put(`/achievements/${id}`, data);
}

function deleteAchievement(id: string): Promise<AxiosResponse> {
  return axiosInstance.delete(`/achievements/${id}`);
}

const AchievementService = {
  getAllAchievements,
  addAchievement,
  updateAchievementData,
  deleteAchievement
};

export default AchievementService;
