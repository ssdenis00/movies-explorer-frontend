import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";

function Movies({
  onLike,
  onSubmit,
  moviesState,
  initialFilms,
  loaderState,
  onClickCheckbox,
  checkboxState,
  errorMessage,
}) {
  function showMore() {}

  return (
    <main className="main">
      <SearchForm
        onSubmit={onSubmit}
        onClickCheckbox={onClickCheckbox}
        checkboxState={checkboxState}
      />
      <Preloader state={loaderState} />
      <MoviesCardList
        type="all"
        state={moviesState}
        films={initialFilms}
        onLike={onLike}
      />

      {initialFilms === undefined || initialFilms.length === 0 ? (
        <section className="section">
          <p className="section__error-message">{errorMessage}</p>
        </section>
      ) : (
        <></>
      )}

      <button
        onClick={showMore}
        type="button"
        className={`more-btn link-hover ${
          moviesState ? "more-btn_active" : ""
        }`}
      >
        Ещё
      </button>
    </main>
  );
}

export default Movies;
