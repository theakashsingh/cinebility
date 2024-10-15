// import { useRef, useState } from "react";
// import { FaAngleDown } from "react-icons/fa";
// import { FaAngleUp } from "react-icons/fa";
// import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
// import { useDispatch, useSelector } from "react-redux";
// import { setSortingValue } from "../../redux/features/movieSlice";

// const Sorting = () => {
//   const [isSorting, setIsSorting] = useState(false);
//   const sortingValue = useSelector(state => state.movie.sorting);
//   const dispatch = useDispatch();
//   const dropdownRef = useRef(null);

//   const handleSortingSelect = option => {
//     dispatch(setSortingValue(option));
//   };

//   useDetectOutsideClick(dropdownRef, () => {
//     setIsSorting(false);
//   });
//   return (
//     <div className="dropdown" ref={dropdownRef}>
//       <button
//         className="dropdown_toggle"
//         onClick={() => setIsSorting(!isSorting)}
//       >
//         Sort by <span>{isSorting ? <FaAngleUp /> : <FaAngleDown />}</span>
//       </button>
//       {isSorting && (
//         <div className="dropdown_menu">
//           <div
//             style={{
//               backgroundColor:
//                 sortingValue === "vote_count.asc" ? "#D9D9D9" : "",
//             }}
//             onClick={() => handleSortingSelect("vote_count.asc")}
//           >
//             Rating Asc
//           </div>
//           <div
//             style={{
//               backgroundColor:
//                 sortingValue === "vote_count.desc" ? "#D9D9D9" : "",
//             }}
//             onClick={() => handleSortingSelect("vote_count.desc")}
//           >
//             Rating Desc
//           </div>
//           <div
//             style={{
//               backgroundColor:
//                 sortingValue === "primary_release_date.asc" ? "#D9D9D9" : "",
//             }}
//             onClick={() => handleSortingSelect("primary_release_date.asc")}
//           >
//             Release Date Asc
//           </div>
//           <div
//             style={{
//               backgroundColor:
//                 sortingValue === "primary_release_date.desc" ? "#D9D9D9" : "",
//             }}
//             onClick={() => handleSortingSelect("primary_release_date.desc")}
//           >
//             Release Date Desc
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sorting;

import { useRef, useState } from "react";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { setSortingValue } from "../../redux/features/movieSlice";

const Sorting = () => {
  // const sortingValue = useSelector(state => state.movie.sorting);
  const dispatch = useDispatch();
  const handleSortingSelect = option => {
    dispatch(setSortingValue(option));
  };

  return (
    <select className="p-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white">
      <>
        <option>Sort by</option>
        <option onClick={() => handleSortingSelect("vote_count.asc")}>
          Rating Asc
        </option>
        <option onClick={() => handleSortingSelect("vote_count.desc")}>
          Rating Desc
        </option>
        <option onClick={() => handleSortingSelect("primary_release_date.asc")}>
          Release Date Asc
        </option>
        <option
          onClick={() => handleSortingSelect("primary_release_date.desc")}
        >
          Release Date Desc
        </option>
      </>
    </select>
  );
};

export default Sorting;
