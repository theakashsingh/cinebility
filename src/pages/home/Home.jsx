import { useEffect, useRef, useState } from "react";
import "./Home.css";
import MovieCard from "../../components/card/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/features/movieSlice";
import Loading from "../../components/LoadingAnimation/Loading";

const Home = () => {
  const [page, setPage] = useState(1);
  const homeRef = useRef(null);
  const movieList = useSelector(state => state.movie.movies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovies({ pageNo: page }));
  }, [page]);

  const handleInfiniteScroll = () => {
    const container = homeRef.current;
    if (
      container.scrollHeight - container.scrollTop <=
      container.clientHeight
    ) {
      setPage(prevPage => prevPage + 1);
      console.log({ page });
    }
  };
  useEffect(() => {
    homeRef.current.addEventListener("scroll", handleInfiniteScroll);

    return () => {
      homeRef.current.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  console.log(movieList);
  return (
    <div className="home" ref={homeRef}>
      {movieList.list &&
        movieList.list.map(movieInfo => (
          <MovieCard key={movieInfo.id} movieInfo={movieInfo} />
        ))}

      {movieList.loading && <Loading />}
    </div>
  );
};

export default Home;
