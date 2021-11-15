import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";

function Movies({ onLike, onSubmit, moviesState, initialFilms, loaderState }) {
  return (
    <main className="main">
      <SearchForm handleSubmitForm={onSubmit} />
      <Preloader state={loaderState} />
      <MoviesCardList
        type="all"
        state={moviesState}
        films={initialFilms}
        onLike={onLike}
      />
      <button
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
