import axios from "axios";

export const baseURL = "https://api.themoviedb.org/3/movie/"


export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mjc3MDEwNmJlZDZjZDdhNmI0ZmM5YzgwNGJlMGVkOSIsInN1YiI6IjY1ZjQ0ODE3NTk1YTU2MDE4NjA2ZDEyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.23lIfk-UWRK-baKd3TsKKDXRc0Wmkokphh76BeT6jeU'
  }
});
