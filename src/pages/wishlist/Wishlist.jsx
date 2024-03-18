import { useSelector } from "react-redux"
import "./Wishlist.css"
import MovieCard from "../../components/card/MovieCard"

const Wishlist = () => {
  const wishlistMovie = useSelector(state=>state.movie.wishlist)
  console.log({wishlistMovie});
  return (
    <div className="wishlist">
      {
        wishlistMovie && wishlistMovie.map((movieInfo, id) => (
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

export default Wishlist