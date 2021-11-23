import "./SavedMovies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import SearchForm from "../SearchForm/SearchForm";
import { useEffect } from "react";

function SavedMovies({
  onLike,
  onSubmit,
  onClickCheckbox,
  checkboxState,
  savedFilmsSearchResult,
  errorMessage,
  setErrorMessage,
}) {
  useEffect(() => {
    setErrorMessage("");
  }, [setErrorMessage]);

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
        savedFilmsSearchResult={savedFilmsSearchResult}
        errorMessage={errorMessage}
      />
    </main>
  );
}
export default SavedMovies;
