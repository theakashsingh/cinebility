import { axiosInstance } from "../../utils/axiosInstance";

const movieServices = {
  getMovieList: async credentials => {
    const { pageNo, sorting, genres, language } = credentials;
    let url = "getMovieList?pageNo=" + pageNo;

    if (genres) {
      url += `&genres=${genres}`;
    }

    if (sorting) {
      url += `&sorting=${sorting}`;
    }

    if (language) {
      url += `&language=${language}`;
    }

    if (!genres && !sorting && !language) {
      url = `getMovieList?pageNo=${pageNo}`;
    }
    const response = await axiosInstance.get(url);
    console.log(response.data);
    return response.data

    // const moviesWithVideos = await Promise.all(
    //   response.data.results.map(async currResult => {
    //     const videoResponse = await axiosInstance.get(
    //       `/movie/${currResult.id}/videos`
    //     );

    //     const videoKey = videoResponse.data.results[0]?.key;
    //     return { ...currResult, videoKey };
    //   })
    // );

    // return moviesWithVideos;
  },
};

export default movieServices;
