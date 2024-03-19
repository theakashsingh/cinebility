import { useEffect, useState } from "react";
import "./MovieCard.css";
import { useRef } from "react";
import YouTube from "react-youtube";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import Loading from "../LoadingAnimation/Loading";

import { useDispatch, useSelector } from "react-redux";
import {
  selectFavorites,
  selectWishlist,
} from "../../redux/features/movieSlice";
import RatingCard from "./RatingCard";

const MovieCard = ({ movieInfo, isAction }) => {
  const [player, setPlayer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const dispatch = useDispatch();

  const { wishlist, favorites } = useSelector(state => state.movie);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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
      player.playVideo();
    }
  }, [isVisible, player]);

  const onReady = event => {
    setPlayer(event.target);
    setIsReady(true);
  };

  const option = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handleFavorites = id => {
    setIsFavorites(!isFavorites);
    dispatch(selectFavorites(id));
  };
  const handleWishList = id => {
    setIsWishlist(!isWishlist);
    dispatch(selectWishlist(id));
  };

  return (
    <div ref={playerRef} className="movie_card">
      <div className="movie_image" style={{ height: isAction ? "" : "100%" }}>
        <div className="movie_video">
          <YouTube
            videoId={movieInfo.videoKey}
            opts={option}
            onReady={onReady}
            className="plyer"
            origin={window.location.origin}
          />
          {!isReady && <Loading>loading</Loading>}
        </div>
        {!isReady && <div className="movie_title"><span>{movieInfo.title}</span><span>{movieInfo.release_date}</span></div>}
        
      </div>
      {isAction && (
        <div className="movie_action">
          <RatingCard movieId={movieInfo.id} />
          <div
            className="movie_favorites"
            onClick={() => handleFavorites(movieInfo.id)}
          >
            {favorites.some(item => item.id === movieInfo.id) ? (
              <FcLike />
            ) : (
              <FcLikePlaceholder />
            )}{" "}
            <span>Favorites</span>
          </div>
          <div
            className="movie_wishlist"
            onClick={() => handleWishList(movieInfo.id)}
          >
            {wishlist.some(item => item.id === movieInfo.id) ? (
              <FaBookmark />
            ) : (
              <FaRegBookmark />
            )}{" "}
            <span>Wishlist</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
