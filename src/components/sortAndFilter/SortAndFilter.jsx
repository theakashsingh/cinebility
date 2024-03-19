import Genres from "./Genres";
import SelectLanguage from "./SelectLanguage";
import "./SortAndFilter.css";
import Sorting from "./Sorting";


const SortAndFilter = () => {
  return (
    <div className="sort_and_filter">
      <h3>Sort & Filter</h3>
      <p>Sort with release data and rating</p>

      {/* sorting with release date */}
      <div className="sort_with_date">
        <Sorting/>
        <Genres/>
        <SelectLanguage/>
      </div>
    </div>
  );
};

export default SortAndFilter;
