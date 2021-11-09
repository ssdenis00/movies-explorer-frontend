import { useContext } from "react";
import { InitialFilmsContext } from "../../contexts/initialFilms";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ type, state }) {
  const initialFilms = useContext(InitialFilmsContext);

  return (
    <section className={`movies section ${state ? "movies_active" : ""}`}>
      <ul className="movies__list">
        {initialFilms.map((film) => {
          return <MoviesCard key={film.id} film={film} type={type} />;
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
