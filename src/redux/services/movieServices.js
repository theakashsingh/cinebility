import { axiosInstance } from "../../utils/axiosInstance";

const movieServices = {
  getMovieList: async credentials => {
    const { pageNo, sorting } = credentials;
    let url;
    if (sorting) {
      url = `popular?language=en-US&page=${pageNo}&sort_by=${sorting}`;
      console.log({ url });
    } else {
      url = `popular?language=en-US&page=${pageNo}`;
    }
    const response = await axiosInstance.get(url);
    console.log(response.data);

    const moviesWithVideos = await Promise.all(
      response.data.results.map(async currResult => {
        const videoResponse = await axiosInstance.get(
          `https://api.themoviedb.org/3/movie/${currResult.id}/videos`
        );

        const videoKey = videoResponse.data.results[0]?.key;
        return { ...currResult, videoKey };
      })
    );

    return moviesWithVideos;
  },
};

export default movieServices;
