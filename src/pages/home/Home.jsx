// import { useEffect, useRef, useState } from "react";
// import "./Home.css";
// import MovieCard from "../../components/card/MovieCard";
// import { useDispatch, useSelector } from "react-redux";
// import { getMovies } from "../../redux/features/movieSlice";
// import Loading from "../../components/LoadingAnimation/Loading";

// const Home = () => {
//   const [page, setPage] = useState(1);
//   const [movieList, setMovieList] = useState([]);
//   const homeRef = useRef(null);
//   const {movies:updatedMovieList,isOnline,sorting:sortingValue,genres:genresValue,language:languageValue} = useSelector(state => state.movie);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (!isOnline) return;
//     dispatch(
//       getMovies({
//         pageNo: page,
//         sorting: sortingValue,
//         genres: genresValue,
//         language: languageValue,
//       })
//     );
//   }, [page]);

//   const handleInfiniteScroll = () => {
//     const container = homeRef.current;
//     if (
//       container.scrollHeight - container.scrollTop <=
//       container.clientHeight
//     ) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };
//   useEffect(() => {
//     if (homeRef.current) {
//       homeRef?.current.addEventListener("scroll", handleInfiniteScroll);
//     }

//     return () => {
//       if (homeRef.current) {
//         homeRef?.current.removeEventListener("scroll", handleInfiniteScroll);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     const movies = JSON.parse(localStorage.getItem("movies"));
//     setMovieList(movies);
//   }, [updatedMovieList.list]);

//   return (
//     <div className="home" ref={homeRef}>
//       {movieList &&
//         movieList?.map((movieInfo, id) => (
//           <MovieCard
//             key={`${movieInfo.videoKey}_${id}`}
//             movieInfo={movieInfo}
//             isAction={true}
//           />
//         ))}

//       {updatedMovieList.loading &&  <div className="infinite_loading"><Loading /></div>}
//     </div>
//   );
// };

// export default Home;

// Home.js

import { useEffect, useState, useRef } from "react";
import "./Home.css";
import MovieCard from "../../components/card/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../redux/features/movieSlice";
import Loading from "../../components/LoadingAnimation/Loading";

const Home = () => {
  const [page, setPage] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1); // Initialize currentIndex state
  const homeRef = useRef(null);
  const {
    movies: updatedMovieList,
    isOnline,
    sorting: sortingValue,
    genres: genresValue,
    language: languageValue,
  } = useSelector(state => state.movie);
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
  }, [page]);

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
        movieList?.map((movieInfo, index) => (
          <MovieCard
            key={`${movieInfo.videoKey}_${index}`}
            movieInfo={movieInfo}
            isAction={true}
            index={index}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ))}

      {updatedMovieList.loading && (
        <div className="infinite_loading">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Home;
