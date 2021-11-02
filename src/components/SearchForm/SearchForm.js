import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search section">
      <form action="/" className="search-form">
        <div className="search-form__block">
          <label
            htmlFor="search-form__input"
            className="search-form__label"
          ></label>
          <input
            type="text"
            className="search-form__input"
            id="search-form__input"
            placeholder="Фильмы"
            required
          />
          <button type="submit" className="search-form__btn link-hover">
            Найти
          </button>
        </div>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
