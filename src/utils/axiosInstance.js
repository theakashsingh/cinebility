import axios from "axios";

export const baseURL = "https://small-bush-38f7.mr-singhaksh.workers.dev"

export const axiosInstance = axios.create({
  baseURL: baseURL
});
