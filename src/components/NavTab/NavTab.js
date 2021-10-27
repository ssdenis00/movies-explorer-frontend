import { Link } from "react-router-dom";
import "./NavTab.css";

function NavTab() {
  return (
    <nav className="nav-tab">
      <Link to="/signup" className="nav-tab__link link-hover">
        Регистрация
      </Link>
      <Link
        to="/signin"
        className="nav-tab__link nav-tab__link_type_btn link-hover"
      >
        Войти
      </Link>
    </nav>
  );
}

export default NavTab;
