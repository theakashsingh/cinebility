// import { useEffect, useState } from "react";
// import "./MovieCard.css";
// import { useRef } from "react";

// const MovieCard = ({ movieInfo }) => {
//   const videoRef = useRef(null);
//   const [userInteracted, setUserInteracted] = useState(false);

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.5, // Trigger when at least 50% of the movie item is visible
//     };

//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && userInteracted) {
//         // Autoplay the video when it becomes visible and user interacted with the page
//         const video = videoRef.current;
//         if (video && video.paused) {
//           const promise = video.play();
//           if (promise !== undefined) {
//             promise.catch(error => {
//               console.error("Autoplay failed:", error);
//               // Autoplay failed, user interaction required to play
//               video.addEventListener("click", playOnClick);
//             });
//           }
//         }
//       } else {
//         // Pause the video when it goes out of view or user didn't interact
//         const video = videoRef.current;
//         if (video && !video.paused) {
//           video.pause();
//         }
//       }
//     }, options);

//     const video = videoRef.current;
//     if (video) {
//       observer.observe(video);
//     }

//     return () => {
//       if (video) {
//         observer.unobserve(video);
//       }
//     };
//   }, [videoRef, userInteracted]);

//   const handleUserInteraction = () => {
//     setUserInteracted(true);
//   };

//   const playOnClick = () => {
//     const video = videoRef.current;
//     if (video) {
//       video.play().catch(error => {
//         console.error("Autoplay failed:", error);
//       });
//       video.removeEventListener("click", playOnClick);
//     }
//   };

//   return (
//     <div className="movie_card" onClick={handleUserInteraction}>
//       <div className="movie_image">
//         <div>
//           <video ref={videoRef} controls muted>
//             <source
//               src={`https://www.youtube.com/watch?v=${movieInfo.videoKey}`}
//               type="video/mp4"
//             />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//         <div></div>
//       </div>
//       <div className="movie_action">
//         <div className="movie_rating"></div>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

import { useEffect, useState } from "react";
import "./MovieCard.css";
import { useRef } from "react";
import YouTube from "react-youtube";

const MovieCard = ({ movieInfo }) => {
  const [player, setPlayer] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const playerRef = useRef(null);

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
    height: '390',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
  };
  return (
    <div ref={playerRef} className="movie_card">
      <div className="movie_image">
        <div>
          <YouTube videoId={movieInfo.videoKey} opts={option} onReady={onReady} />
        </div>
        <div></div>
      </div>
      <div className="movie_action">
        <div className="movie_rating"></div>
      </div>
    </div>
  );
};

export default MovieCard;
