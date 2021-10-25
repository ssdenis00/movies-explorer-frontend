import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { savedFilms } from "../../utils/filmsDB";

function SavedMovies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList films={savedFilms} type="saved" />
    </main>
  );
}
export default SavedMovies;
