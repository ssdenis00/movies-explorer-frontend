import { Link, Switch, Route } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import userAvatar from "../../images/user-avatar.svg";

function Header() {
  return (
    <header className="header header_type_landing app__padding">
      <Logo />
      <Switch>
        <Route exact path="/">
          <nav className="header__navigation">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link header__link_type_btn">
              Войти
            </Link>
          </nav>
        </Route>
        <Route path="*">
          <nav className="header__navigation header__movies">
            <Link to="/movies" className="header__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__link">
              Сохраненные фильмы
            </Link>
          </nav>
          <nav className="header__navigation header__user">
            <Link to="/profile" className="header__link">
              Аккаунт
            </Link>
            <img
              src={userAvatar}
              alt="аватар пользователя"
              className="header__avatar"
            />
          </nav>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
