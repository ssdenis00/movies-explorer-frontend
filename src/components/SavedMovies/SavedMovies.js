import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  onLike,
  onSubmit,
  onClickCheckbox,
  checkboxState,
  savedFilmsSearchResult,
  errorMessage,
}) {
  return (
    <main className="main">
      <SearchForm
        onSubmit={onSubmit}
        onClickCheckbox={onClickCheckbox}
        checkboxState={checkboxState}
      />
      <MoviesCardList
        type="saved"
        onLike={onLike}
        place={"saved"}
        films={savedFilmsSearchResult}
        savedFilmsSearchResult={savedFilmsSearchResult}
        errorMessage={errorMessage}
      />
    </main>
  );
}
export default SavedMovies;
