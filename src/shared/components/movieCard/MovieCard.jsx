import { Play, Clock, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../../modules/favoriteMovies/favoriteMoviesSlice.js";
import {
  addWatchLaterMovie,
  removeWatchLaterMovie,
} from "../../../modules/watchLaterMovies/watchLaterMoviesSlice.js";
import "./MovieCard.scss";

const MovieCard = ({ movie, onPosterClick }) => {
  const dispatch = useDispatch();
  const { favoriteMovies } = useSelector((state) => state.favoriteMovies);
  const { watchLaterMovies } = useSelector((state) => state.watchLaterMovies);
  const { poster_path, title } = movie;

  const isFavoriteMovie = favoriteMovies.some(
    (favoriteMovie) => favoriteMovie.id === movie.id,
  );

  const isWatchLaterMovie = watchLaterMovies.some(
    (watchLaterMovie) => watchLaterMovie.id === movie.id,
  );

  const hasPoster = !!poster_path;

  const getImageURL = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };

  const handleStarClick = () => {
    if (isFavoriteMovie) {
      dispatch(removeFavoriteMovie(movie));
      return;
    }
    dispatch(addFavoriteMovie(movie));
  };

  const handleClockClick = () => {
    if (isWatchLaterMovie) {
      dispatch(removeWatchLaterMovie(movie));
      return;
    }
    dispatch(addWatchLaterMovie(movie));
  };

  return (
    <div className="movie-card">
      <button
        onClick={() => onPosterClick(movie)}
        className="movie-card__poster-button"
      >
        {hasPoster ? (
          <img
            className="movie-card__image"
            src={getImageURL(poster_path)}
            alt={`${title} poster`}
          />
        ) : (
          <div className="movie-card__poster-placeholder">No poster found</div>
        )}
        <div className="movie-card__overlay">
          <Play />
          <span>View Trailer</span>
        </div>
      </button>
      <div className="movie-card__details-container">
        <div className="movie-card__title-container">
          <p className="movie-card__title">{title}</p>
        </div>
        <div className="movie-card__actions">
          <button onClick={handleStarClick}>
            <Star
              fill={isFavoriteMovie ? "orange" : "none"}
              style={{ color: `${isFavoriteMovie ? "orange" : "white"}` }}
            />
            <span>{isFavoriteMovie ? "Remove" : "Add"}</span>
          </button>
          <button onClick={handleClockClick}>
            <Clock
              style={{ color: `${isWatchLaterMovie ? "blueviolet" : "white"}` }}
            />
            <span>{isWatchLaterMovie ? "Remove" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
