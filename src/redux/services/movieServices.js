import { axiosInstance } from "../../utils/axiosInstance";

const movieServices = {
  getMovieList: async credentials => {
    const { pageNo, sorting, genres, language } = credentials;
    let url = "discover/movie?language=en-US&page=" + pageNo;

    if (genres) {
      url += `&with_genres=${genres}`;
    }

    if (sorting) {
      url += `&sort_by=${sorting}`;
    }

    if (language) {
      url += `&with_original_language=${language}`;
    }

    if (!genres && !sorting && !language) {
      url = `movie/popular?language=en-US&page=${pageNo}`;
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
