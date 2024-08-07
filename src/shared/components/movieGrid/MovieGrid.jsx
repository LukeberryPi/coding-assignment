import { useRef } from "react";

import { EmptyState } from "../../../shared/components/emptyState/EmptyState.jsx";
import MovieCard from "../movieCard/MovieCard.jsx";
import "./MovieGrid.scss";

const MovieGrid = ({ movies, title, emptyStateMessage }) => {
  const movieCardRef = useRef(null);
  const noMovies = movies.length === 0;
  const isHomePage = window.location.pathname === "/";

  if (noMovies) {
    return <EmptyState message={emptyStateMessage} goToHome={!isHomePage} />;
  }

  return (
    <div className="movie-grid__container">
      <div className="movie-grid__header">
        <h2 className="movie-grid__title">{title}</h2>
      </div>
      <div className="movie-grid">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard ref={movieCardRef} key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default MovieGrid;
