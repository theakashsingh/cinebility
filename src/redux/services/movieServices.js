import { axiosInstance } from "../../utils/axiosInstance";

const movieServices = {
  getMovieList: async credentials => {
    const { pageNo } = credentials;
    const response = await axiosInstance.get(
      `popular?language=en-US&page=${pageNo}`
    );

    const moviesWithVideos = await Promise.all(
      response.data.results.map(async currResult => {
        const videoResponse = await axiosInstance.get(
          `https://api.themoviedb.org/3/movie/${currResult.id}/videos?language=en-US`
        );

        const videoKey = videoResponse.data.results[0]?.key;
        return { ...currResult, videoKey };
      })
    );

    return moviesWithVideos;
  },
};

export default movieServices;
