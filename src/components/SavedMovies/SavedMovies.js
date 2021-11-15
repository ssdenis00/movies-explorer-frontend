import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useContext } from "react";
import { SavedFilmsContext } from "../../contexts/SavedFilmsContext";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({ onLike }) {
  const films = useContext(SavedFilmsContext);

  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList type="saved" state={true} onLike={onLike} films={films} />
    </main>
  );
}
export default SavedMovies;
