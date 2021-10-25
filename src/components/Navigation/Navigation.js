import { Link, Switch, Route } from "react-router-dom";
import userAvatar from "../../images/user-avatar.svg";
import "./Navigation.css";

function Navigation() {
  return (
    <Switch>
      <Route exact path="/">
        <nav className="navigation">
          <Link to="/signup" className="navigation__link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__link navigation__link_type_btn"
          >
            Войти
          </Link>
        </nav>
      </Route>
      <Route path="*">
        <nav className="navigation navigation_type_movies">
          <Link to="/movies" className="navigation__link">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="navigation__link">
            Сохраненные фильмы
          </Link>
        </nav>
        <nav className="navigation navigation_type_user">
          <Link to="/profile" className="navigation__link">
            Аккаунт
          </Link>
          <img
            src={userAvatar}
            alt="аватар пользователя"
            className="navigation__avatar"
          />
        </nav>
      </Route>
    </Switch>
  );
}

export default Navigation;
