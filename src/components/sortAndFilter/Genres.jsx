import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setGenresValue } from "../../redux/features/movieSlice";

const Genres = () => {
  const [allGenres, setAllGenres] = useState([]);
  const [result, setResult] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const dispatch = useDispatch()

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

  useEffect(()=>{
    dispatch(setGenresValue(result))
  },[result])

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
    <div className="genres">
      {allGenres.map(genres => (
        <span
          key={genres.id}
          style={{
            backgroundColor: selectedGenres.includes(genres.id)
              ? "#D9D9D9"
              : "",
          }}
          onClick={() => {
            handleSelectGenres(genres.id);
          }}
        >
          {genres.name}
        </span>
      ))}
    </div>
  );
};

export default Genres;
