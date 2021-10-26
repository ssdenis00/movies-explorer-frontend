import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="navigation">
      <Link to="/signup" className="navigation__link">
        Регистрация
      </Link>
      <Link to="/signin" className="navigation__link navigation__link_type_btn">
        Войти
      </Link>
    </nav>
  );
}

export default NavTab;
