import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header header_type_landing app__padding">
      <Logo />
      <Navigation />
    </header>
  );
}

export default Header;
