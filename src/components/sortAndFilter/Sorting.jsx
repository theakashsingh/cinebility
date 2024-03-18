import { useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { setSortingValue } from "../../redux/features/movieSlice";

const Sorting = () => {
  const [isSorting, setIsSorting] = useState(false);
const sortingValue = useSelector(state=>state.movie.sorting)
const dispatch = useDispatch()
  const dropdownRef = useRef(null);

  const handleSortingSelect = option => {
    dispatch(setSortingValue(option))
    setIsSorting(false);
  };

  useDetectOutsideClick(dropdownRef, () => {
    setIsSorting(false);
  });
  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown-toggle"
        onClick={() => setIsSorting(!isSorting)}
      >
        Sort by <span>{isSorting ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {isSorting && (
        <div className="dropdown-menu">
          <div
            className={`dropdown-option ${
              sortingValue === "vote_count.asc" ? "selected" : ""
            }`}
            onClick={() => handleSortingSelect("vote_count.asc")}
          >
            Rating Asc
          </div>
          <div
            className={`dropdown-option ${
              sortingValue === "vote_count.desc" ? "selected" : ""
            }`}
            onClick={() => handleSortingSelect("vote_count.desc")}
          >
            Rating Desc
          </div>
          <div
            className={`dropdown-option ${
              sortingValue === "primary_release_date.asc" ? "selected" : ""
            }`}
            onClick={() => handleSortingSelect("primary_release_date.asc")}
          >
            Release Date Asc
          </div>
          <div
            className={`dropdown-option ${
              sortingValue === "primary_release_date.desc" ? "selected" : ""
            }`}
            onClick={() => handleSortingSelect("primary_release_date.desc")}
          >
            Release Date Desc
          </div>
        </div>
      )}
    </div>
  );
};

export default Sorting;
