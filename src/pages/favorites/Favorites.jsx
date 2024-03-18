import { useSelector } from "react-redux"
import "./Favorites.css"
import MovieCard from "../../components/card/MovieCard"

const Favorites = () => {
  const favoritesMovie = useSelector(state=>state.movie.favorites)
  return (
    <div className="favorites">
       {
        favoritesMovie && favoritesMovie.map((movieInfo, id) => (
          <MovieCard
            key={`${movieInfo.videoKey}_${id}`}
            movieInfo={movieInfo}
            isAction={false}
          />
        ))
      }
    </div>
  )
}

export default Favorites