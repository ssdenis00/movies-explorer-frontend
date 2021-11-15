import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ openModal, onExit }) {
  const userData = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile section">
        <h1 className="profile__title">Привет, {userData.name}!</h1>
        <form action="/" className="profile__form">
          <ul className="profile__list">
            <li className="profile__item">
              <label htmlFor="name" className="profile__label">
                Имя
              </label>
              <input
                type="text"
                className="profile__input"
                defaultValue={userData.name}
                name="name"
                id="name"
              />
            </li>
            <li className="profile__item">
              <label htmlFor="email" className="profile__label">
                E-mail
              </label>
              <input
                type="email"
                className="profile__input"
                name="email"
                defaultValue={userData.email}
                id="email"
              />
            </li>
          </ul>
        </form>
        <div className="profile__links">
          <button
            onClick={openModal}
            type="button"
            className="profile__link link-hover"
          >
            Редактировать
          </button>
          <Link
            to="/"
            onClick={onExit}
            className="profile__link profile__link_type_exit link-hover"
          >
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Profile;
