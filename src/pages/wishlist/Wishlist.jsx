import { useSelector } from "react-redux";
import "./Wishlist.css";
import MovieCard from "../../components/card/MovieCard";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const wishlistMovie = useSelector(state => state.movie.wishlist);
  useEffect(() => {
    setWishlist(JSON.parse(localStorage.getItem("wishlist")));
  }, [wishlistMovie]);

  return (
    <div className="wishlist">
      <h3>Wishlist</h3>
      {wishlist.length > 0 &&
        wishlist.map((movieInfo, id) => (
          <MovieCard
            key={`${movieInfo.videoKey}_${id}`}
            movieInfo={movieInfo}
            isAction={false}
            index={id}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        ))}
    </div>
  );
};

export default Wishlist;
