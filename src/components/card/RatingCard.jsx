import { useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function RatingCard({ movieId }) {
  const [rating, setRating] = useState(0);

  const handleStarClick = async value => {
    setRating(value);
    try {
      const response = await axiosInstance.post(`movie/${movieId}/rating`, {
        body: JSON.stringify({
          value: value,
        }),
      });
      console.log({ response });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="rating_container">
      {[1, 2, 3, 4, 5].map(value => (
        <span
          key={value}
          className="star_rating"
          onClick={() => handleStarClick(value)}
        >
          {value <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
}

export default RatingCard;
