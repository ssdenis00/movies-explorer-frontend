function Header() {
  return (
    <header className="header">
      <a href="./" className="header__link">
        <img
          src="../../images/header-logo.svg"
          alt="логотип"
          className="header__logo"
        />
      </a>
      <nav className="header__navigation">
        <a href="" className="header__link">
          Регистрация
        </a>
        <a href="#" className="header__link header__link_type_btn">
          Войти
        </a>
      </nav>
    </header>
  );
}

export default Header;
