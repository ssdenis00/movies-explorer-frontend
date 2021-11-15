import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useContext } from "react";
import { SavedFilmsContext } from "../../contexts/SavedFilmsContext";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  onLike,
  onSubmit,
  onClickCheckbox,
  checkboxState,
  savedFilmsSearchResult,
}) {
  const films = useContext(SavedFilmsContext);

  return (
    <main className="main">
      <SearchForm
        onSubmit={onSubmit}
        onClickCheckbox={onClickCheckbox}
        checkboxState={checkboxState}
      />
      <MoviesCardList
        type="saved"
        state={true}
        onLike={onLike}
        films={films}
        savedFilmsSearchResult={savedFilmsSearchResult}
      />
    </main>
  );
}
export default SavedMovies;
