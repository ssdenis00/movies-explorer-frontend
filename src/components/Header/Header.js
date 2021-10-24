import "./Header.css";
import Logo from "../Logo/Logo";
import NavTab from "../NavTab/NavTab";

function Header() {
  return (
    <header className="header header_type_landing app__padding">
      <Logo />
      <NavTab />
    </header>
  );
}

export default Header;
