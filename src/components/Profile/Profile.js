import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Profile.css";

function Profile({ onExit, onSubmit }) {
  const userData = useContext(CurrentUserContext);
  const [inputValueName, setInputValueName] = useState(userData.name);
  const [inputValueEmail, setInputValueEmail] = useState(userData.email);

  function handleOnChangeInputName(evt) {
    setInputValueName(evt.target.value);
  }

  function handleOnChangeInputEmail(evt) {
    setInputValueEmail(evt.target.value);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();

    onSubmit({
      name: inputValueName,
      email: inputValueEmail,
    });
  }

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
                value={inputValueName}
                name="name"
                id="name"
                onChange={handleOnChangeInputName}
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
                value={inputValueEmail}
                id="email"
                onChange={handleOnChangeInputEmail}
              />
            </li>
          </ul>
        </form>
        <div className="profile__links">
          <button
            type="submit"
            className="profile__link link-hover"
            onClick={handleSubmitForm}
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
