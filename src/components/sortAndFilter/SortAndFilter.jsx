import Genres from "./Genres";
import SelectLanguage from "./SelectLanguage";
import "./SortAndFilter.css";
import Sorting from "./Sorting";

const SortAndFilter = () => {
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
      </div>
    </div>
  );
};

export default SortAndFilter;
