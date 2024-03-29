import axios from "axios";

export const baseURL = "https://api.themoviedb.org/3/"

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}` 
  }
});
