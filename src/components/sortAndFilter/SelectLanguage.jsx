import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import { setLanguageValue } from "../../redux/features/movieSlice";
import { axiosInstance } from "../../utils/axiosInstance";

const SelectLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [isLanguage, setIsLanguage] = useState(false);
  const [allLanguages, setAllLanguages] = useState([]);
  const languageValue = useSelector(state => state.movie.language);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const handleLanguageSelect = option => {
    dispatch(setLanguageValue(option));
    setSelectedLanguage(option);
    setIsLanguage(false);
  };

  useDetectOutsideClick(dropdownRef, () => {
    setIsLanguage(false);
  });

  const handleGetLanguages = async () => {
    try {
      const response = await axiosInstance("configuration/languages");
      setAllLanguages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleGetLanguages();
  }, []);

  console.log({ languageValue });

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className="dropdown_toggle"
        onClick={() => setIsLanguage(!isLanguage)}
      >
        Select Language{" "}
        <span>{isLanguage ? <FaAngleUp /> : <FaAngleDown />}</span>
      </button>
      {isLanguage && (
        <div className="dropdown_menu">
          {allLanguages.map(lang => (
            <div
              key={lang.iso_639_1}
              style={{
                background:
                  selectedLanguage === lang.iso_639_1 ? "#D9D9D9" : "",
              }}
              onClick={() => handleLanguageSelect(lang.iso_639_1)}
            >
              {lang.english_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectLanguage;
