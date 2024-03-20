import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RatingCard({ movieId }) {
  const [rating, setRating] = useState(0);
  const [isSuccess,setIsSuccess] = useState(false)

  const handleStarClick = async value => {
    setRating(value);
    try {
      const response = await axiosInstance.post(`movie/${movieId}/rating`, {
        value: value,
      });

      if (response?.data?.success) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

 useEffect(() => {
   if (isSuccess) {
    toast.success("Your rating has been saved");
   }
 }, [isSuccess])
 

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
      {isSuccess && <ToastContainer />}
      
    </div>
  );
}

export default RatingCard;
