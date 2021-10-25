import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { films } from "../../utils/filmsDB";

function Movies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList films={films} type="all" />
      <button type="button" className="more-btn">
        Ещё
      </button>
    </main>
  );
}

export default Movies;
