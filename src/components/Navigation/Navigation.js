import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import userAvatar from "../../images/user-avatar.svg";
import "./Navigation.css";

function Navigation() {
  const [menuState, setMenuState] = useState(false);

  function handleSandwitchBtn() {
    setMenuState((state) => {
      return !state;
    });
  }

  return (
    <>
      <button
        onClick={handleSandwitchBtn}
        type="button"
        className={`menu-burger-btn ${
          menuState ? "menu-burger-btn_type_close" : "menu-burger-btn_type_open"
        }`}
        aria-label="Открыть или закрыть меню"
      ></button>
      <div
        className={`navigation-mobile ${
          menuState ? "navigation-mobile_active" : ""
        }`}
      >
        <nav className="navigation-mobile__movies">
          <NavLink
            exact
            to="/"
            className="navigation-mobile__link"
            activeClassName="navigation-mobile__link_active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation-mobile__link"
            activeClassName="navigation-mobile__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation-mobile__link"
            activeClassName="navigation-mobile__link_active"
          >
            Сохраненные фильмы
          </NavLink>
        </nav>
        <nav className="navigation-mobile__user">
          <Link
            to="/profile"
            className="navigation-mobile__link navigation-mobile__link_type_profile"
          >
            Аккаунт
          </Link>
          <img
            src={userAvatar}
            alt="аватар пользователя"
            className="navigation-mobile__avatar"
          />
        </nav>
      </div>
      <nav className="navigation navigation_type_movies">
        <NavLink
          to="/movies"
          className="navigation__link link-hover"
          activeClassName="navigation__link_active"
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className="navigation__link link-hover"
          activeClassName="navigation__link_active"
        >
          Сохраненные фильмы
        </NavLink>
      </nav>
      <nav className="navigation navigation_type_user">
        <NavLink
          to="/profile"
          className="navigation__link link-hover"
          activeClassName="navigation__link_active"
        >
          Аккаунт
        </NavLink>
        <img
          src={userAvatar}
          alt="аватар пользователя"
          className="navigation__avatar"
        />
      </nav>
    </>
  );
}

export default Navigation;
