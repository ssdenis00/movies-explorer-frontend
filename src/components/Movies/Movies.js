import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";

function Movies({
  onLike,
  onSubmit,
  initialFilms,
  loaderState,
  onClickCheckbox,
  checkboxState,
  errorMessage,
  showMore,
  count,
  moreBtnState,
}) {
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
        films={initialFilms}
        onLike={onLike}
        errorMessage={errorMessage}
        count={count}
        place="all"
      />

      <button
        onClick={showMore}
        type="button"
        className={`more-btn link-hover ${
          initialFilms !== undefined &&
          initialFilms.length !== 0 &&
          moreBtnState
            ? "more-btn_active"
            : ""
        }`}
      >
        Ещё
      </button>
    </main>
  );
}

export default Movies;
