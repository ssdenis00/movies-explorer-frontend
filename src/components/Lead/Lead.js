import { Link } from "react-router-dom";
import "./Lead.css";
import leadImg from "../../images/lead-image.svg";

function Lead() {
  return (
    <section className="lead app__padding">
      <div className="lead__info">
        <h1 className="lead__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="lead__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Link to="/" className="lead__link">
          Узнать больше
        </Link>
      </div>
      <img
        src={leadImg}
        alt="картинка шара из слов web"
        className="lead__image"
      />
    </section>
  );
}

export default Lead;
