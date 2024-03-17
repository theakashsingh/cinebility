import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <Link to="/favorites" className="footer_link">Favorites</Link>

      <Link to="/wishlist" className="footer_link">Wishlist</Link>
    </div>
  );
};

export default Footer;
