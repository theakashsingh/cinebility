import { useSelector } from "react-redux";
import "./Favorites.css";
import MovieCard from "../../components/card/MovieCard";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [favoritesList, setFavoritesList] = useState([])
  const favoritesMovie = useSelector(state => state.movie.favorites);
  useEffect(() => {
    setFavoritesList(JSON.parse(localStorage.getItem("favorites")))
  }, [favoritesMovie])
  
  return (
    <div className="favorites">
      <h3>Favorites</h3>
      {favoritesList &&
        favoritesList.map((movieInfo, id) => (
          <MovieCard
            key={`${movieInfo.videoKey}_${id}`}
            movieInfo={movieInfo}
            isAction={false}
          />
        ))}
    </div>
  );
};

export default Favorites;
