import Genres from "./Genres";
import "./SortAndFilter.css";
import Sorting from "./Sorting";
import { getMovies } from "../../redux/features/movieSlice";
import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";
import SelectLanguage from "./SelectLanguage";
import { useDispatch, useSelector } from "react-redux";

const SortAndFilter = () => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const { sorting, language, genres } = useSelector(state => state.movie);
  const dispatch = useDispatch();
  const sortAndFilter = () => {
    dispatch(
      getMovies({
        pageNo: 1,
        sorting: sorting,
        genres: genres,
        language: language,
      })
    );
    // dispatch(setSortAndFilter(false));
    setIsFilterExpanded(false)
  };
  return (
    <div className="bg-gray-800 rounded-lg shadow-md mb-8 overflow-hidden border border-gray-700">
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* <div className="w-full sm:w-1/2 lg:w-1/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full p-3 pl-10 pr-4 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div> */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Sorting/>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 flex items-center"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <Filter className="w-4 h-4 mr-2" /> 
            Filters
            <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </div>
    {isFilterExpanded && (
      <div className="bg-gray-750 p-4 sm:p-6 border-t border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Genres/>
          {/* <div>
            <h3 className="font-semibold mb-2 text-gray-200">Rating</h3>
            <input 
              type="range" 
              min="0" 
              max="5" 
              step="0.5"
              className="w-full accent-blue-500"
            />
            <div className="flex justify-between text-sm text-gray-400">
              <span>0</span>
              <span>5</span>
            </div>
          </div> */}
          {/* <div>
            <h3 className="font-semibold mb-2 text-gray-200">Release Year</h3>
            <select className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white">
              <option>All Years</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
          </div> */}
          <div>
            <SelectLanguage/>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={sortAndFilter} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
            Apply Filters
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default SortAndFilter;
