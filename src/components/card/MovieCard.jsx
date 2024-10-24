import { useEffect, useState, useRef } from "react";
import "./MovieCard.css";
import YouTube from "react-youtube";
import Loading from "../LoadingAnimation/Loading";
import { useDispatch } from "react-redux";
import {
  selectFavorites,
  selectWishlist,
} from "../../redux/features/movieSlice";
import { BookmarkPlus, Heart, Star } from "lucide-react";

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
  
  const convertRatingInFive = (rating) =>{
    if (rating < 1 || rating > 10) {
      throw new Error("Rating should be between 1 and 10");
    }
    return (rating / 2).toFixed(1);
  }
  
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
      className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 border border-gray-700"
      onClick={() => setCurrentIndex(index)}
    >
      <div className="relative">
        <div className="movie_video">
        <div className="absolute top-0 right-0 bg-yellow-500 text-gray-900 px-2 py-1 m-2 rounded-full flex items-center">
        <Star className="w-4 h-4 mr-1" />
        <span className="font-bold">{convertRatingInFive(movieInfo.vote_average)}</span>
      </div>
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
                className="w-full h-48 sm:h-64 object-cover"
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
      </div>
      {isAction && (
         <div className="p-4">
         <h3 className="font-bold text-lg mb-2 text-gray-100 truncate">{movieInfo.title}</h3>
         <div className="flex space-x-2">
           <button className="bg-blue-600 text-white px-3 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center flex-1"  onClick={() => handleFavorites(movieInfo.id)}>
             <Heart className="w-4 h-4 mr-2" /> Favorite
           </button>
           <button className="bg-purple-600 text-white px-3 py-2 rounded-full hover:bg-purple-700 transition duration-300 flex items-center justify-center flex-1" onClick={() => handleWishList(movieInfo.id)}>
             <BookmarkPlus className="w-4 h-4 mr-2" /> Wishlist
           </button>
         </div>
       </div>
      )}
    </div>
  );
};

export default MovieCard;
