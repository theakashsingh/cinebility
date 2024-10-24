import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setGenresValue } from "../../redux/features/movieSlice";

const Genres = () => {
  const [allGenres, setAllGenres] = useState([]);
  const [result, setResult] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const dispatch = useDispatch();

  const handleGetGenres = async () => {
    try {
      const response = await axiosInstance(`getGenres`);
      setAllGenres(response.data.genres);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetGenres();
  }, []);

  useEffect(() => {
    dispatch(setGenresValue(result));
  }, [result]);

  const handleSelectGenres = genres_id => {
    console.log({ genres_id });
    if (!selectedGenres.includes(genres_id)) {
      const newResult = result === "" ? genres_id : `${result}, ${genres_id}`;
      setResult(newResult);
      setSelectedGenres([...selectedGenres, genres_id]);
    } else {
      const updatedResult = selectedGenres
        .filter(val => val !== genres_id)
        .join(", ");
      setResult(updatedResult);
      setSelectedGenres(selectedGenres.filter(val => val !== genres_id));
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2 text-gray-200">Genre</h3>
      <div className="space-y-2">
        {allGenres.map(genre => (
          <label
            key={genre.id}
            onClick={() => {
              handleSelectGenres(genre.id);
            }}
            className="flex items-center space-x-2 text-gray-300"
          >
            <input
              type="checkbox"
              className="form-checkbox text-blue-500 bg-gray-600 border-gray-500"
            />
            <span>{genre.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Genres;
