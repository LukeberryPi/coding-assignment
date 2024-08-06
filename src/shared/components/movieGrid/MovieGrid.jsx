import { useDispatch } from "react-redux";

import { removeFavoriteMovie } from "../../../modules/favoriteMovies/favoriteMoviesSlice.js";
import { removeWatchLaterMovie } from "../../../modules/watchLaterMovies/watchLaterMoviesSlice.js";
import { EmptyState } from "../../../shared/components/emptyState/EmptyState.jsx";
import MovieCard from "../movieCard/MovieCard.jsx";
import "./MovieGrid.scss";

const MovieGrid = ({
  movies,
  title,
  emptyStateMessage,
  resetStateButton = null,
}) => {
  const dispatch = useDispatch();
  const noMovies = movies.length === 0;
  const isHomePage = window.location.pathname === "/";

  const handleRemoveFlintsFromWatchLater = () => {
    dispatch(removeWatchLaterMovie(888));
  };

  const handleRemoveFlintsFromFavorites = () => {
    dispatch(removeFavoriteMovie(888));
  };

  if (noMovies) {
    return (
      <>
        <EmptyState message={emptyStateMessage} goToHome={!isHomePage} />
      </>
    );
  }

  return (
    <div className="movie-grid__container">
      <div className="movie-grid__header">
        <h2 className="movie-grid__title">{title}</h2>
        {resetStateButton}
        <button
          className="reset-state-button"
          onClick={handleRemoveFlintsFromWatchLater}
        >
          remove flintstones from watch later
        </button>
        <button
          className="reset-state-button"
          onClick={handleRemoveFlintsFromFavorites}
        >
          remove flintstones from favorites
        </button>
      </div>
      <div className="movie-grid">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default MovieGrid;
