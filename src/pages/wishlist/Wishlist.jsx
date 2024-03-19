import { useSelector } from "react-redux"
import "./Wishlist.css"
import MovieCard from "../../components/card/MovieCard"
import { useEffect, useState } from "react"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])

  const wishlistMovie = useSelector(state=>state.movie.wishlist)
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")))
  }, [wishlistMovie])

  return (
    <div className="wishlist">
      <h3>Favorites</h3>
      {
        wishlist && wishlist.map((movieInfo, id) => (
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