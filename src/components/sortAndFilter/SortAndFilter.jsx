import { useDispatch, useSelector } from "react-redux";
import Genres from "./Genres";
import SelectLanguage from "./SelectLanguage";
import "./SortAndFilter.css";
import Sorting from "./Sorting";
import { getMovies, setSortAndFilter } from "../../redux/features/movieSlice";
import { useNavigate } from "react-router-dom";

const SortAndFilter = () => {
  const { sorting, language, genres } = useSelector(state => state.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const sortAndFilter = () => {
    dispatch(
      getMovies({
        pageNo: 1,
        sorting: sorting,
        genres: genres,
        language: language,
      })
    );
    dispatch(setSortAndFilter(false));
    navigate("/")
  };
  return (
    <div className="sort_and_filter">
      <h3>Sort & Filter</h3>

      {/* sorting with release date */}
      <div className="action">
        <div>
          <p>Sort by release date and rating</p>
          <Sorting />
        </div>
        <div>
          <p>Genres</p>
          <Genres />
        </div>
        <div>
          <p>Language</p>
          <SelectLanguage />
        </div>
        <div className="search_button">
          <button onClick={sortAndFilter}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SortAndFilter;
