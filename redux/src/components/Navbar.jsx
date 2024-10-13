import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="nav-header">
      <div className="nav-title">
        <h4 onClick={() => navigate("/")}>REDUX</h4>
      </div>
      <div className="nav-container">
        <ul className={`nav-box ${isOpen ? "open" : ""}`}>
          <li onClick={() => navigate("/all-products")} className="navbar">
            {t("navbar.products")}
          </li>
          <li onClick={() => navigate("/contact")} className="navbar">
            Contact
          </li>
          <li onClick={() => navigate("/cart")} className="navbar">
            {t("navbar.cart")}
            
            
          </li>
        </ul>
      </div>

      <div onClick={toggleMenu} className="hamburger">
        &#9776;
      </div>
      {/* Language Dropdown */}
      <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </nav>
  );
};

export default Navbar;
