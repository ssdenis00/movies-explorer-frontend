import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../Validate/Validate";
import "./Profile.css";

function Profile({ onExit, onSubmit, errorMessage }) {
  const userData = useContext(CurrentUserContext);
  const validateForm = useFormWithValidation(
    {
      name: userData.name,
      email: userData.email,
    },
    false
  );

  function handleSubmitForm(evt) {
    evt.preventDefault();

    if (validateForm.isValid) {
      onSubmit({
        name: validateForm.values.name,
        email: validateForm.values.email,
      });
      validateForm.resetValidForm();
    }
  }

  return (
    <main className="main">
      <section className="profile section">
        <h1 className="profile__title">Привет, {userData.name}!</h1>
        <form action="/" className="profile__form" onSubmit={handleSubmitForm}>
          <ul className="profile__list">
            <li className="profile__item">
              <label htmlFor="name" className="profile__label">
                Имя
              </label>
              <input
                type="text"
                className="profile__input"
                value={validateForm.values.name || ""}
                name="name"
                id="name"
                required
                onChange={validateForm.handleChange}
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
                required
                value={validateForm.values.email}
                id="email"
                onChange={validateForm.handleChange}
              />
            </li>
          </ul>
          <button type="submit" className="profile__submit"></button>
        </form>
        <div className="profile__links">
          <span className="profile__err">{errorMessage}</span>
          <button
            type="submit"
            className={`profile__link link-hover ${
              validateForm.isValid ? "" : "profile__link_disabled"
            }`}
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
