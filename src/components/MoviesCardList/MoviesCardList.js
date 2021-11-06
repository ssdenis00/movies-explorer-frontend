import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ films, type }) {
  return (
    <section className="movies section">
      <ul className="movies__list">
        {films.map((film) => {
          return <MoviesCard key={film.id} film={film} type={type} />;
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
