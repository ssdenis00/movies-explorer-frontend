import "./Promo.css";
import promoImg from "../../images/promo-image.svg";

function Promo({ onLearnMore }) {
  return (
    <section className="promo section">
      <div className="promo__info">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="promo__subtitle">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button
          type="button"
          onClick={onLearnMore}
          className="promo__link link-hover"
        >
          Узнать больше
        </button>
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
