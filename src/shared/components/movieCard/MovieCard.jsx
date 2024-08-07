import { Clock, Play, Star } from "lucide-react";
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
  const { id, poster_path, title } = movie;

  const dispatch = useDispatch();
  const { favoriteMovies } = useSelector((state) => state.favoriteMovies);
  const isFavoriteMovie = favoriteMovies.some((favorite) => favorite.id === id);
  const { watchLaterMovies } = useSelector((state) => state.watchLaterMovies);
  const isWatchLaterMovie = watchLaterMovies.some(
    (watchLater) => watchLater.id === id,
  );

  const getImageURL = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };

  const handleStarClick = () => {
    if (isFavoriteMovie) {
      dispatch(removeFavoriteMovie(id));
      return;
    }

    dispatch(addFavoriteMovie(id));
  };

  const handleClockClick = () => {
    if (isWatchLaterMovie) {
      dispatch(removeWatchLaterMovie(id));
      return;
    }

    dispatch(addWatchLaterMovie(id));
  };

  return (
    <div className="movie-card">
      <button
        onClick={() => onPosterClick(movie)}
        className="movie-card__poster-button"
      >
        <img
          className="movie-card__image"
          src={getImageURL(poster_path)}
          alt={`${title} poster`}
        />
        <div className="movie-card__overlay">
          <Play />
          View Trailer
        </div>
      </button>
      <div className="movie-card__title-container">
        <p className="movie-card__title">{title}</p>
      </div>
      <div className="movie-card__actions">
        <button onClick={handleStarClick}>
          <Star />
          <span>{isFavoriteMovie ? "Remove" : "Add"}</span>
        </button>
        <button onClick={handleClockClick}>
          <Clock />
          <span>{isWatchLaterMovie ? "Remove" : "Add"}</span>
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
