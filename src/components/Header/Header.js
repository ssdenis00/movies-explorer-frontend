import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavTab from "../NavTab/NavTab";

function Header({ isLogin, place }) {
  return (
    <header
      className={`header app__padding ${
        place === "landing" ? "header_type_landing" : ""
      }`}
    >
      <Logo />
      {isLogin ? <Navigation /> : <NavTab />}
    </header>
  );
}

export default Header;
