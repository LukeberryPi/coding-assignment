import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./MovieCard.scss";
import { addFavoriteMovie } from "../../../modules/favoriteMovies/favoriteMoviesSlice.js";
import TrailerModal from "../trailerModal/TrailerModal.jsx";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { favoriteMovies, status, error } = useSelector(
    (state) => state.favoriteMovies,
  );
  // const {
  //   watchLaterMovies,
  //   // status: watchLaterStatus,
  //   // error: watchLaterError,
  // // } = useSelector((state) => state.watchLaterMovies);

  // @Todo: find interface and fix
  const isFavoriteMovie = favoriteMovies.some(movie => movie === movie.id);
  // const isWatchLaterMovie = watchLaterMovies.includes(movie.id);

  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  const { id, poster_path, title } = movie;

  const getImageURL = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };

  const handleStarClick = () => {
    dispatch(addFavoriteMovie(id));
  };

  const handleClockClick = () => {
    console.log("add to watch later");
  };

  // @Todo: open modal with trailer dialog
  const handlePosterClick = () => {
    dialogRef.current.showModal();
    setIsDialogOpen(true);
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
          ref={dialogRef}
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
            <i data-is-favorite={true} className="h4 bi bi-star" />
          </button>
          <button onClick={handleClockClick}>
            <i
              // data-is-watch-later={isWatchLaterMovie}
              className="h4 bi bi-clock"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
