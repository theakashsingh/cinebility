import { useEffect, useRef, useState } from "react";
import "./Home.css";
import MovieCard from "../../components/card/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/features/movieSlice";
import Loading from "../../components/LoadingAnimation/Loading";

const Home = () => {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const homeRef = useRef(null);
  const updatedMovieList = useSelector(state => state.movie.movies);
  const isOnline = useSelector(state => state.movie.isOnline);
  const sortingValue = useSelector(state => state.movie.sorting);
  const genresValue = useSelector(state => state.movie.genres);
  const languageValue = useSelector(state => state.movie.language);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isOnline) return;
    dispatch(
      getMovies({
        pageNo: page,
        sorting: sortingValue,
        genres: genresValue,
        language: languageValue,
      })
    );
  }, [page, sortingValue, genresValue, languageValue]);

  const handleInfiniteScroll = () => {
    const container = homeRef.current;
    if (
      container.scrollHeight - container.scrollTop <=
      container.clientHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };
  useEffect(() => {
    if (homeRef.current) {
      homeRef?.current.addEventListener("scroll", handleInfiniteScroll);
    }

    return () => {
      if (homeRef.current) {
        homeRef?.current.removeEventListener("scroll", handleInfiniteScroll);
      }
    };
  }, []);

  useEffect(() => {
    const movies = JSON.parse(localStorage.getItem("movies"));
    setMovieList(movies);
  }, [updatedMovieList.list]);

  return (
    <div className="home" ref={homeRef}>
      {movieList &&
        movieList?.map((movieInfo, id) => (
          <MovieCard
            key={`${movieInfo.videoKey}_${id}`}
            movieInfo={movieInfo}
            isAction={true}
          />
        ))}

      {updatedMovieList.loading &&  <div className="infinite_loading"><Loading /></div>}
    </div>
  );
};

export default Home;
