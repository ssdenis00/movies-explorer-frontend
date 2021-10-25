import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";

function Movies() {
  return (
    <main className="main">
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
