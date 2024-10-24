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
  },
};

export default movieServices;
