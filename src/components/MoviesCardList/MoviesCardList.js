import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import { data } from "../../utils/filmsDB";

function MoviesCardList() {
  return (
    <section className="movies section">
      <ul className="movies__list">
        {data.map((film) => {
          return <MoviesCard key={film.id} film={film} />;
        })}
      </ul>
      <button type="button" className="movies__btn">
        Ещё
      </button>
    </section>
  );
}

export default MoviesCardList;
