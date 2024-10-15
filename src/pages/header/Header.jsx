// import { Link } from "react-router-dom";
// import "./Header.css";
// import { useRef } from "react";
// import SortAndFilter from "../../components/sortAndFilter/SortAndFilter";
// import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
// import { useDispatch, useSelector } from "react-redux";
// import { setSortAndFilter } from "../../redux/features/movieSlice";

// const Header = () => {
//   // const [isSortAndFilter, setIsSortAndFilter] = useState(false);
//   const isSortAndFilter = useSelector( state =>state.movie.isSortAndFilter)
// const dispatch = useDispatch()
//   const sortAndFilterRef = useRef(null);

//   const handleSortAndFilter = () => {
//     // setIsSortAndFilter(!isSortAndFilter);
//     dispatch(setSortAndFilter(!isSortAndFilter))
//   };

//   const handleClickOutside = () => {
//     // setIsSortAndFilter(false);
//     dispatch(setSortAndFilter(false))
//   };

//   useDetectOutsideClick(sortAndFilterRef, handleClickOutside);
//   return (
//     <div className="header">
//       <Link to="/" className="header_title">
//         Movie App
//       </Link>
//       <div className="header_sorting" onClick={handleSortAndFilter}>
//         Sort & Filter{" "}
//       </div>
//       <div
//         className={`sorting_and_filter_section ${
//           isSortAndFilter ? "open" : ""
//         }`}
//       ref={sortAndFilterRef}>
//         <SortAndFilter />
//       </div>
//     </div>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import "./Header.css";
import { useRef } from "react";
import SortAndFilter from "../../components/sortAndFilter/SortAndFilter";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { setSortAndFilter } from "../../redux/features/movieSlice";
import { Heart, Home, List } from "lucide-react";

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
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <Link to={"/"} className="text-white text-2xl sm:text-3xl font-bold">Cinebility</Link>
      <div className="flex space-x-4 sm:space-x-6">
        <Link to="/" className="text-gray-300 hover:text-yellow-500 transition duration-300"><Home className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
        <Link to="/favorites" className="text-gray-300 hover:text-yellow-500 transition duration-300"><Heart className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
        <Link to="/wishlist" className="text-gray-300 hover:text-yellow-500 transition duration-300"><List className="w-5 h-5 sm:w-6 sm:h-6" /></Link>
      </div>
    </div>
  </nav>
  );
};

export default Header;
