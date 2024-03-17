import { Link } from "react-router-dom";
import "./Header.css";

const handleSortAndFilter = () =>{
  console.log("handleSortAndFilter");
}
const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header_title">Movie App</Link>
      <div className="header_sorting" onClick={handleSortAndFilter}>Sort & Filter</div>
    </div>
  );
};

export default Header;
