import { useState, forwardRef } from "react";

import { Clock, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../../modules/favoriteMovies/favoriteMoviesSlice.js";
import {
  addWatchLaterMovie,
  removeWatchLaterMovie,
} from "../../../modules/watchLaterMovies/watchLaterMoviesSlice.js";
import TrailerModal from "../trailerModal/trailerModal.jsx";
import "./MovieCard.scss";

const MovieCard = forwardRef(({ movie }, ref) => {
  const { id, poster_path, title } = movie;

  const dispatch = useDispatch();
  const { favoriteMovies } = useSelector((state) => state.favoriteMovies);
  const isFavoriteMovie = favoriteMovies.some((favorite) => favorite.id === id);
  const { watchLaterMovies } = useSelector((state) => state.watchLaterMovies);
  const isWatchLaterMovie = watchLaterMovies.some(
    (watchLater) => watchLater.id === id,
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");

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

  const handlePosterClick = () => {
    if (ref.current) {
      ref.current.showModal();
      setIsDialogOpen(true);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen && (
        <TrailerModal
          movieTitle={title}
          youtubeVideoId={youtubeVideoId}
          closeModal={setIsDialogOpen}
          ref={ref}
          onClose={closeDialog}
        />
      )}
      <div className="movie-card">
        <button onClick={handlePosterClick}>
          <img
            className="movie-card__image"
            src={getImageURL(poster_path)}
            alt={`${title} poster`}
          />
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
    </>
  );
});

export default MovieCard;