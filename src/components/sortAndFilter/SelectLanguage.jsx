import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setLanguageValue } from "../../redux/features/movieSlice";
import { axiosInstance } from "../../utils/axiosInstance";

const SelectLanguage = () => {
  const [allLanguages, setAllLanguages] = useState([]);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleLanguageSelect = e => {
    const lang = e.target.value
    dispatch(setLanguageValue(lang));
  };

  const handleGetLanguages = async () => {
    try {
      const response = await axiosInstance("getLanguages");
      setAllLanguages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetLanguages();
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <h3 className="font-semibold mb-2 text-gray-200">Language</h3>
      <select
        className="w-full p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
        onChange={handleLanguageSelect}
      >
        <option>All Languages</option>
        {allLanguages.map(lang => (
          <option value={lang.iso_639_1} key={lang.iso_639_1}>
            {lang.english_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLanguage;
