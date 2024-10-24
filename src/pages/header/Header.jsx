import { Link } from "react-router-dom";
import "./Header.css";
import { useEffect, useRef, useState } from "react";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useDispatch } from "react-redux";
import { setSortAndFilter } from "../../redux/features/movieSlice";
import { Heart, Home, List } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const sortAndFilterRef = useRef(null);

  const handleClickOutside = () => {
    dispatch(setSortAndFilter(false));
  };

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100 && !isScrolled) {
      setIsScrolled(true);
    } else if (currentScrollY <= 100 && isScrolled) {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  useDetectOutsideClick(sortAndFilterRef, handleClickOutside);
  return (
    <nav
      className={`mx-auto w-full z-10 bg-gradient-to-r from-gray-900 to-gray-800 p-4 shadow-lg transition-transform duration-500 ease-in-out ${
        isScrolled
          ? "fixed top-0 left-0 shadow-lg animate-slideDown"
          : "relative"
      }`}
    >
      <div
        className={`container mx-auto flex justify-between items-center transition-transform duration-500 ease-in-out ${
          isScrolled ? "animate-slideDownFade" : ""
        }`}
      >
        <Link to={"/"} className="text-white text-2xl sm:text-3xl font-bold">
          Cinebility
        </Link>
        <div className="flex space-x-4 sm:space-x-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-yellow-500 transition duration-300"
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <Link
            to="/favorites"
            className="text-gray-300 hover:text-yellow-500 transition duration-300"
          >
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
          <Link
            to="/wishlist"
            className="text-gray-300 hover:text-yellow-500 transition duration-300"
          >
            <List className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
