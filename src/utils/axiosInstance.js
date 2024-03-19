import axios from "axios";

export const baseURL = "https://api.themoviedb.org/3/"

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.REACT_APP_TOKEN}` 
  }
});
