import { useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import { InitialFilmsContext } from "../../contexts/initialFilms";
import moviesApi from "../../utils/MoviesApi";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const [initialFilms, setInitialFilms] = useState([]);
  const [loaderState, setLoaderState] = useState(false);
  const [moviesState, setMoviesState] = useState(false);

  function handleSubmitSearchForm(evt) {
    evt.preventDefault();
    setInitialFilms([]);
    setLoaderState(true);

    moviesApi
      .getInitialFilms()
      .then((res) => {
        setInitialFilms(res);
        setLoaderState(false);
        setMoviesState(true);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoaderState(false);
      });

    /* if (inputValue !== "") {
      console.log(inputValue);
    } else {
      console.log("err");
    } */
  }

  return (
    <InitialFilmsContext.Provider value={initialFilms}>
      <main className="main">
        <SearchForm handleSubmitForm={handleSubmitSearchForm} />
        <Preloader state={loaderState} />
        <MoviesCardList type="all" state={moviesState} />
        <button
          type="button"
          className={`more-btn link-hover ${
            moviesState ? "more-btn_active" : ""
          }`}
        >
          Ещё
        </button>
      </main>
    </InitialFilmsContext.Provider>
  );
}

export default Movies;
