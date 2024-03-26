import { useEffect, useState, useRef } from "react";
import "./MovieCard.css";
import YouTube from "react-youtube";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import Loading from "../LoadingAnimation/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFavorites,
  selectWishlist,
} from "../../redux/features/movieSlice";
import RatingCard from "./RatingCard";

const MovieCard = ({
  movieInfo,
  isAction,
  index,
  currentIndex,
  setCurrentIndex,
}) => {
  const [player, setPlayer] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { favorites, wishlist } = useSelector(state => state.movie);

  const onReady = event => {
    setPlayer(event.target);
    setIsReady(true);
  };

  const handleFavorites = id => {
    dispatch(selectFavorites(id));
  };

  const handleWishList = id => {
    dispatch(selectWishlist(id));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          setCurrentIndex(index);
        }
      },
      { threshold: 0.5 }
    );
  
    if (playerRef.current) {
      observer.observe(playerRef.current);
    }
  
    return () => {
      if (observer && playerRef.current) {
        observer.unobserve(playerRef.current);
      }
    };
  }, [index, setCurrentIndex]);
  
  

  useEffect(() => {
    if (index === currentIndex && player) {
      player.playVideo();
    } else if (player) {
      player.pauseVideo();
    }
  }, [index, currentIndex, player]);

  return (
    <div
      ref={playerRef}
      className="movie_card"
      onClick={() => setCurrentIndex(index)}
    >
      <div className="movie_image" style={{ height: isAction ? "" : "100%" }}>
        <div className="movie_video">
          <YouTube
            videoId={movieInfo.videoKey}
            onReady={onReady}
            className="player"
            opts={{
              height: "100%",
              width: "100%",
              playerVars: {
                autoplay: 0,
              },
            }}
            iframeClassName={"iframe_plyer"}
          />
          {!isReady && (
            <div className="movie_img">
              <img
                src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
                alt=""
              />
            </div>
          )}
          {!isReady && (
            <div className="loading_animation">
              <Loading />
            </div>
          )}
        </div>
        {!isReady && (
          <div className="movie_title">
            <span>{movieInfo.title}</span>
            <span>{movieInfo.release_date}</span>
          </div>
        )}
      </div>
      {isAction && (
        <div className="movie_action">
          <RatingCard movieId={movieInfo.id} />
          <div
            className="movie_favorites"
            onClick={() => handleFavorites(movieInfo.id)}
          >
            {favorites?.some(item => item.id === movieInfo.id) ? (
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
            {wishlist?.some(item => item.id === movieInfo.id) ? (
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
