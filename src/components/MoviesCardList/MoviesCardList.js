import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ type, state, films, onLike }) {
  return (
    <section className={`movies section ${state ? "movies_active" : ""}`}>
      <ul className="movies__list">
        {films.map((film, i) => {
          return <MoviesCard key={i} film={film} type={type} onLike={onLike} />;
        })}
      </ul>
    </section>
  );
}

export default MoviesCardList;
