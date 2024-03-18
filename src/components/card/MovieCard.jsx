import { useEffect, useState } from "react";
import "./MovieCard.css";
import { useRef } from "react";
import YouTube from "react-youtube";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  selectFavorites,
  selectWishlist,
} from "../../redux/features/movieSlice";

const MovieCard = ({ movieInfo, isAction }) => {
  const [player, setPlayer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // When at least 50% of the player is visible
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (playerRef.current) {
      observer.observe(playerRef.current);
    }

    return () => {
      if (playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && player) {
      player.playVideo(); // Autoplay when visible
    }
  }, [isVisible, player]);

  const onReady = event => {
    setPlayer(event.target);
  };

  const option = {
    height: "100%",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleFavorites = id => {
    setIsFavorites(!isFavorites);
    // console.log({ id });
    dispatch(selectFavorites(id));
  };
  const handleWishList = id => {
    setIsWishlist(!isWishlist);
    dispatch(selectWishlist(id));
  };
  return (
    <div ref={playerRef} className="movie_card">
      <div className="movie_image">
        <div>
          <YouTube
            videoId={movieInfo.videoKey}
            opts={option}
            onReady={onReady}
          />
        </div>
        <div></div>
      </div>
      {isAction && (
        <div className="movie_action">
          <div className="movie_rating">
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </div>
          <div
            className="movie_favorites"
            onClick={() => handleFavorites(movieInfo.id)}
          >
            {isFavorites ? <FcLike /> : <FcLikePlaceholder />}{" "}
            <span>Favorites</span>
          </div>
          <div
            className="movie_wishlist"
            onClick={() => handleWishList(movieInfo.id)}
          >
            {isWishlist ? <FaBookmark /> : <FaRegBookmark />}{" "}
            <span>Wishlist</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
