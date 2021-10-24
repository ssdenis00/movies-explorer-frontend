import { Link } from "react-router-dom";
import "./Promo.css";
import promoImg from "../../images/promo-image.svg";

function Promo() {
  return (
    <section className="promo app__padding">
      <div className="promo__info">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <Link to="/" className="promo__link">
          Узнать больше
        </Link>
      </div>
      <img
        src={promoImg}
        alt="картинка шара из слов web"
        className="promo__image"
      />
    </section>
  );
}

export default Promo;
