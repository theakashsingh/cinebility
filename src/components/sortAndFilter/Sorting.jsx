import { useDispatch } from "react-redux";
import { getMovies } from "../../redux/features/movieSlice";

const Sorting = () => {
  const dispatch = useDispatch();
  const handleSortingSelect = e => {
    const option = e.target.value;
    dispatch(
      getMovies({
        pageNo: 1,
        sorting: option,
      })
    );
  };

  return (
    <select
      className="p-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
      onChange={handleSortingSelect}
    >
      <>
        <option>Sort by</option>
        <option value="vote_count.asc">Rating Asc</option>
        <option value="vote_count.desc">Rating Desc</option>
        <option value="primary_release_date.asc">Release Date Asc</option>
        <option value="primary_release_date.desc">Release Date Desc</option>
      </>
    </select>
  );
};

export default Sorting;
