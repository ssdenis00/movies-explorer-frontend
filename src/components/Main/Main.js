import "./Main.css";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

function Main({ AboutProjectRef, onLearnMore }) {
  return (
    <main className="main">
      <Promo onLearnMore={onLearnMore} />
      <AboutProject AboutProjectRef={AboutProjectRef} />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}

export default Main;
