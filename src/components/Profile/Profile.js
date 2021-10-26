import { Link } from "react-router-dom";
import "./Profile.css";

function Profile({ openModal }) {
  return (
    <main className="main">
      <section className="profile section">
        <h1 className="profile__title">Привет, Денис!</h1>
        <ul className="profile__list">
          <li className="profile__item">
            <h2 className="profile__item-title">Имя</h2>
            <p className="profile__value">Денис</p>
          </li>
          <li className="profile__item">
            <h2 className="profile__item-title">E-mail</h2>
            <p className="profile__value">pochta@yandex.ru</p>
          </li>
        </ul>
        <div className="profile__links">
          <button onClick={openModal} type="button" className="profile__link">
            Редактировать
          </button>
          <Link to="/" className="profile__link profile__link_type_exit">
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Profile;
