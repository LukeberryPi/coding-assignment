import MovieCard from "../movieCard/MovieCard";
import "./movie-grid.scss";
import { EmptyState } from "../emptyState/EmptyState";

const MovieGrid = ({ movies, title, emptyStateMessage }) => {
  const noMovies = movies.length === 0;

  if (noMovies) {
    return <EmptyState message={emptyStateMessage} />;
  }

  return (
    <div className="movie-grid-container">
      <h2 className="movie-grid-title">{title}</h2>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
