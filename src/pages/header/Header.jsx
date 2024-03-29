import { Link } from "react-router-dom";
import "./Header.css";
import { useRef } from "react";
import SortAndFilter from "../../components/sortAndFilter/SortAndFilter";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { setSortAndFilter } from "../../redux/features/movieSlice";

const Header = () => {
  // const [isSortAndFilter, setIsSortAndFilter] = useState(false);
  const isSortAndFilter = useSelector( state =>state.movie.isSortAndFilter)
const dispatch = useDispatch()
  const sortAndFilterRef = useRef(null);

  const handleSortAndFilter = () => {
    // setIsSortAndFilter(!isSortAndFilter);
    dispatch(setSortAndFilter(!isSortAndFilter))
  };

  const handleClickOutside = () => {
    // setIsSortAndFilter(false);
    dispatch(setSortAndFilter(false))
  };

  useDetectOutsideClick(sortAndFilterRef, handleClickOutside);
  return (
    <div className="header">
      <Link to="/" className="header_title">
        Movie App
      </Link>
      <div className="header_sorting" onClick={handleSortAndFilter}>
        Sort & Filter{" "}
      </div>
      <div
        className={`sorting_and_filter_section ${
          isSortAndFilter ? "open" : ""
        }`}
      ref={sortAndFilterRef}>
        <SortAndFilter />
      </div>
    </div>
  );
};

export default Header;
