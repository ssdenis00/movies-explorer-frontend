import { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ onSubmit, onClickCheckbox, checkboxState }) {
  const [inputValue, setInputValue] = useState("");

  function handleInputOnChangeValue(evt) {
    setInputValue(evt.target.value);
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();

    onSubmit(inputValue);
  }

  return (
    <section className="search section">
      <form action="/" onSubmit={handleSubmitForm} className="search-form">
        <div className="search-form__block">
          <label
            htmlFor="search-form__input"
            className="search-form__label"
          ></label>
          <input
            type="text"
            onChange={handleInputOnChangeValue}
            value={inputValue}
            className="search-form__input"
            id="search-form__input"
            placeholder="Фильмы"
            required
          />
          <button type="submit" className="search-form__btn link-hover">
            Найти
          </button>
        </div>
        <FilterCheckbox
          checkboxState={checkboxState}
          onClickCheckbox={onClickCheckbox}
        />
      </form>
    </section>
  );
}

export default SearchForm;
